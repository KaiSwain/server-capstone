#!/bin/bash

rm db.sqlite3
rm -rf ./flipquestapi/migrations
python3 manage.py migrate
python3 manage.py makemigrations flipquestapi
python3 manage.py migrate flipquestapi
python3 manage.py loaddata users
python3 manage.py loaddata tokens
python3 manage.py loaddata themes
python3 manage.py loaddata flippers
python3 manage.py loaddata categories
python3 manage.py loaddata decks
python3 manage.py loaddata cards
python3 manage.py loaddata likeddecks



