# CrudUi

## Run the complete project

Use `npm run start` to start the database and run the front-end. It will open a browser tab with the application when it's ready.  
&nbsp;  

## Run the server independent from the front-end

Use `npm run start-db` or `node server.js` to start the database by itself. You'll need to do this before running the Cypress tests.  
&nbsp;  

## Run Cypress tests

After starting the server, use `ng e2e` or `ng run crud-ui:cypress-open` to open Cypress, and click spec.ts to run end-to-end tests for the following:
- Displays the user list component list-view
- Adds a new user
- Edits a user
- Deletes a user

&nbsp;  

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.1.