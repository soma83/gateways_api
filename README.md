This is the API for the Practical Excercise **Gateways**

**Requisites**

- nodejs v12.15.0 (or higher) and npm v6.15.5 (or higher)
- mongodb v3.6.8

In order to get loopback 4 up and running you must install it, like this:
> $ npm i -g @loopback/cli

**Installation**

Clone this repository. Get into the "gateways-api" folder
> $ cd gateways-api

Install dependencies
> $ npm i

Run the project
> $ npm start

This will deploy the API server running on ***http://localhost:3000***. This command will also create a database named **gateways** for you by running migrations in a way that you don't need to run any script to get the database ready.

By default it assumes that your MongoDB instance has no user and no password defined. Also it is assumed your MongoDB instance is ussing port 27017. If you need to configure any of this you can edit the file *gateways-api/src/datasources/gateways-mongo-db.datasource.ts*.

**Important**

This project runs on port 3000, if you need to use anyother port but 3000 you can edit the file *gateways-api/src/index.ts* the line *port* under *api* like
>port: +(process.env.PORT ?? XXXX)

where XXXX is your desired port and leaving everything else as it is.
