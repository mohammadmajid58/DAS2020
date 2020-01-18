#!/bin/bash

# clean previous builds
rm -rf frontend/build
rm -rf backend/react-frontend

# ensure debug setting is on false
if grep -e "DEBUG = True" backend/backend/settings.py; then
    printf "\033[1;33mFound DEBUG = True in settings.py\033[0m\n"
    printf "\033[1;33mIf you'd like to create a ZIP for Staging, please turn this to False now!\033[0m\n"
    printf "\033[1;33mWould you like to continue? (y/n)\033[0m\n"
    read result
    if [[ ${result} == "n" ]]; then
	exit 0;
    fi
fi

cd frontend

if npm install; then

    # We are currently in se01-main/frontend/
    npm run build
    cd ..
    mkdir backend/react-frontend
    mv frontend/build backend/react-frontend/build
    cd backend
    printf "\033[1;33mWould you like to run the Django Server with the latest Frontend? (y/n)\033[0m\n"
    read result
    if [[ ${result} == "y" ]]; then
        sh run.sh
    fi    

    # We are currently in se01-main/backend/
    printf "\033[1;33mWould you like to create a ZIP file for PythonAnywhere Staging? (y/n)\033[0m\n"
    read result
    if [[ ${result} == "y" ]]; then
	if grep -e "DEBUG = True" backend/settings.py; then
	    printf "\033[1;33mYou cannot create a ZIP file for Staging with DEBUG = True, exiting...\033[0m\n"
	    exit 0; 
	fi
	printf "\033[1;33mYou must run tests on both the frontend and backend!\033[0m\n"
	printf "\033[1;33mHave you tested BOTH the frontend and backend? (y/n)\033[0m\n"
	read result2
	if [[ ${result2} == "n" ]]; then
	    printf "\033[1;33mYou cannot create a Staging ZIP file without running tests..\033[0m\n"
	    exit 0;
        fi
	
        zip -r StagingFile.zip .
	cd ..
	mv backend/StagingFile.zip .
    fi

    # We are currently in se01-main/
            
else
    cd ..
    echo ERROR
fi

