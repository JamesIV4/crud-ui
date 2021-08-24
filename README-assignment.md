# Genesys, Front End Software Engineer Exercise

## Instructions
- Create an account management UI that allows an admin user to:  

    1. View the current accounts
    2. Create a new account
    3. Update an existing account
    4. Delete an account

- The current state of this project only contains the mock database mentioned below. Because of this feel free to use any frameworks (Angular, React, Vue, Ember, etc.) to help create and run the application.
- Node LTS is required

### Running the mock database
A mock database and API have been provided via the npm package, json-server (https://www.npmjs.com/package/json-server). Install the node packages via  

```npm install```

To start the mock database run  

```npm run start-db```

The API can be accessed through http://localhost:3000

It is recommended to make a backup of the db.json file


### API Methods and endpoints
To POST, PUT, or PATCH be sure to set the Content-Type header to "application/json"  

  - GET    ```/users```
  - GET    ```/users/:id```
  - POST   ```/users```
  - PUT    ```/users/:id```
  - PATCH  ```/users/:id```
  - DELETE ```/users/:id```

### Additional Items
Once you have a UI to perform the CRUD operations find ways to enhance the UX with one or more of the following  

- Pagination server or client side (This can be done server side with the query params, ?_page=1&_limit=25)
- Test for accessibility and use a screenreader or only navigate with your keyboard.
- Add searching / filtering of the data.
- Add the ability to sort the data
- Write tests for your code.