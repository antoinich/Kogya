# Kogya
Network and tools to find an ecologic association near you

The project is in early stage you now have just access to the map with fake datas, the is no design for now.

Clone the repo

run composer install and npm install to dl all dependencies

change your credentials in .env for your mysql server

run php bin/console doctrine:database:create to create database

run php bin/console doctrine:fixtures:load to load fake datas

run php bin/console server:run or symfony serve to start the server

go to https://127.0.0.1:8000/map to see the map done with leaflet

bonus go to https://127.0.0.1:8000/gogo to see the map realised with gogocarto tool


