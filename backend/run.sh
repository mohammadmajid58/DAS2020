#!/bin/bash

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
