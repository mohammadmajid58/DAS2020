#!/bin/bash

# DEVELOPMENT SCRIPT ONLY!


printf "\033[1;33mTHIS SCRIPT IS FOR DEVELOPMENT ONLY\033[0m\n"
printf "\033[1;33mAre you sure you would like to continue? (Y/n)\033[0m\n"
read result
if [[ ${result} != "Y" ]]; then
  exit 0;
fi

echo "Deleting migrations directory"
$(rm -r api/migrations) 2>&1 > /dev/null

echo "Deleting db.sqlite3"
$(rm db.sqlite3) 2>&1 > /dev/null

echo "Making migrations"
python manage.py makemigrations api

echo "Migrating"
python manage.py migrate

echo "-----------------------"
echo "Populating database"
python populate_database.py
echo "-----------------------"

echo "Running server"
python manage.py runserver
