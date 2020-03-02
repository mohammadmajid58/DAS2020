# SE01 Team Project 3
## Technical Documentation

### The aim of this section is to explain various settings which are important for a proper set-up of the application

> /backend/.env

.env is the configuration file of Django's database used in the settings.py file. The important settings found in this file are:
* ENV = deployment scope (eg staging, production etc)
* PRODUCTION_HOST_URL = Target URL for production/deployment
* EMAIL_HOST = name of the email server (default 'smtp.gmail.com')
* EMAIL_USE_TLS = whether TLS should be used or not (default True)
* EMAIL_PORT = port number of email server (default 587)
* EMAIL_ADDRESS = email address from which communication is established
* DB_NAME = MySQL Database Name
* DB_USER = MySQL Database Username
* DB_PASSWORD = MySQL Database Password
* DB_PORT = MySQL Database Port Number
### To clarify the meaning of default: it means the value that each variable originally had at the time the .env file was created. It does not mean that the values were hard coded to be default. Therefore, they must all have legal values in order for the application to work. 
