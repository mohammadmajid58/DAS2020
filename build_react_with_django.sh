#!/bin/bash

export running_in_dev=0
if [[ "$1" = "DEV" ]]; then
    export running_in_dev=1
else
    printf "\033[1;33mTHIS SCRIPT IS FOR DEVELOPMENT ONLY\033[0m\n"
    printf "\033[1;33mAre you sure you would like to continue? (Y/n)\033[0m\n"
    read result
    if [[ ${result} != "Y" ]]; then
      exit 0;
    fi
fi

# clean previous builds
rm -rf frontend/build
rm -rf backend/react-frontend

if [[ "$running_in_dev" -ne 1 ]]; then
    # ensure debug setting is on false if not in DEV mode
    if grep -e "DEBUG=True" backend/.env; then
        printf "\033[1;33mFound DEBUG = True in backend/.env\033[0m\n"
        printf "\033[1;33mIf you'd like to create a ZIP for Staging, please turn this to False now!\033[0m\n"
        printf "\033[1;33mWould you like to continue? (y/n)\033[0m\n"
        read result
        if [[ ${result} == "n" ]]; then
        exit 0;
        fi
    fi
fi

cd frontend

if npm install; then

    
    if [[ "$running_in_dev" -eq 1 ]]; then
        npm run-script build
    else
        printf "\033[1;33mBuild for Development or Staging? (type dev or staging)\033[0m\n"
        read result
        if [[ ${result} == "dev" ]]; then
        npm run-script build
        fi
        if [[ ${result} == "staging" ]]; then
        npm run-script build-staging
        fi
        if [[ ${result} != "dev" && ${result} != "staging" ]]; then
        echo "Choose dev or staging, invalid input, try again..."
        exit 0;
        fi
    fi
    
    # We are currently in se01-main/frontend/
    cd ..
    mkdir backend/react-frontend
    mv frontend/build backend/react-frontend/build
    cd backend
    
    if [[ "$running_in_dev" -eq 1 ]]; then
        sh run.sh
    else
        printf "\033[1;33mWould you like to run the Django Server with the latest Frontend? (y/n)\033[0m\n"
        read result
        if [[ ${result} == "y" ]]; then
            sh run.sh
        fi
    fi

    if [[ "$running_in_dev" -ne 1 ]]; then
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
    fi

    # We are currently in se01-main/
            
else
    cd ..
    echo ERROR
fi

