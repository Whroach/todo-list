# Todo-App

## Project Overview
#### An API App that allows users to GET, CREATE, UPDATE, and DELETE their todo tasks. 

#### Each task item contains the following information:
*  Title
*  Description
*  Status
*  Due Date
*  Category type

#### Features
1. Create and assign categories.
2. Dynamic Search/Filter and Sort functionality.

### Setup
1. To call API Endpoints in VSCode, please install the ``REST Client`` VSCode Extension. Else, open up Postman, set base URL to ``http://localhost:3005`` and copy/paste desired request body from one of the endpoints in the ``route.rest`` file to the Postman body.
2. Run `npm install` .
3. To start the development server, please run `npm run dev` .

### Test endpoints via VSCode
1. Open up the ``route.rest`` file.
2. Hit ``Send Request`` to invoke an endpoint.

### Unit Tests
1. Run ``npm run test`` to test Search and Sort utility functions.

### Tech Stack
* Backend Server: NodeJS + ExpressJS.
* Database: AWS - PostgreSQL.

### Packages
* Joi - Data Validation
* Jest - Unit Test
* Moment-Timezone - Format Timestamps
* PG - Database connector
* PG-Format - Create dyanmic SQL Queries and help prevent SQL injections.


### Improvements
1. Functional Version Control of database migration scripts 
2. Set up role-based security middleware functionality
3. Decouple resources from 1 table to multiple based on its resource. Ex: Active/Pending tasks, Users, and Category. 




