#!/bin/bash

rm -rf frontend/build
rm -rf backend/react-frontend
cd frontend

if npm install; then
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
else
    cd ..
    echo ERROR
fi

