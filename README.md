# ESP AUTH ABSENT

A school attendance system that compatible with any ESPxx Microcontroller that supports WiFi and HTTP POST Request

Runs on **Express.js** with Node.js

Compatible with [MySql Server](https://dev.mysql.com/downloads/mysql/) and [Firebase Firestore](https://firebase.google.com/docs/firestore/)

Can be run with other app, including **PHP** as long as they are in different ports

## Contents

- [Requirements](#requirements)
- [Library Used](#library-used)
- [Initial Setup](#initial-setup)
  - [Process Environment](#process-environment)

## Requirements

Requires NPM, to get NPM please install Node.js

[Download Node.js](https://nodejs.org/en/download/)

Requires the pm2 package enabled globally

```bash
npm i pm2 -g
```

## Library Used

The Node.js server used several libraries:

1. [_body-parser_](https://www.npmjs.com/package/body-parser)
2. [_cors_](https://www.npmjs.com/package/cors)
3. [_dotenv_](https://www.npmjs.com/package/dotenv)
4. [_express_](https://www.npmjs.com/package/express)
5. [_express-rate-limit_](https://www.npmjs.com/package/express-rate-limit)
6. [_firebase-admin_](https://www.npmjs.com/package/firebase-admin)
7. [_helmet_](https://www.npmjs.com/package/helmet)
8. [_http_](https://www.npmjs.com/package/http)
9. [_mysql_](https://www.npmjs.com/package/mysql)
10. [_pm2_](https://www.npmjs.com/package/pm2)
11. [_util_](https://www.npmjs.com/package/util)

## Initial Setup

Before starting the server, configure the **.env** file located inside the **server** folder

For more information about what each lines means go to [Process Environment](#process-environment)

1. Navigate to **server** folder

2. Install all required package library with npm
3. Configure the **.env** file
4. Start the test first

To install all package

```bash
npm i
```

To start the test

```bash
npm startmysql //If you are using mysql
npm startfirebase //If you are using firebase
```

To run the app, use **pm2** library that you have installed globally
```bash
pm2 start appDefault.js --name espAuth //If you are using mysql
pm2 start appFirebase.js --name espAuth //If you are using Firebase Firestore
```

### Process Environment

For definition what process environment in Node.js means, please refer to this [explanation from knowledgehut](https://www.knowledgehut.com/blog/web-development/node-environment-variables)

The **.env** file in **server** folders contain severals variables which will be used by the application

For ease of use, just edit the **.env** file, you may edit the **mysqlQuery.js** and **firebaseQuery.js** to suits your query needs

1. **_SERVER_PORT_** = Defines the port where the application runs, on default is **5128**
2. **_MYSQL_HOST_** = Defines the host server of the MYSQL Database
3. **_MYSQL_USER_** = Defines the user who will be connected to the mysql host server
4. **_MYSQL_PASSWORD_** = Defines the password that will be used to connect to the mysql host server
5. **_MYSQL_DATABASE_** = Defines the Database that will be used from the Mysql Server
6. **_MYSQL_ABSENT_TABLE_** = Defines the table that will be used for attendance query (primarily for inserting new attendance)
7. **_FIREBASE_API_** = Defines the API key that will be used to connect to your Firebase Project
8. **_FIREBASE_AUTH_DOMAIN_** = Defines the authorized domains to connect to your firebase project
9. **_FIREBASE_PROJECT_ID_** = Defines the Id of your project that will be used by the app
10. **_FIREBASE_STORAGE_BUCKET_** = Defines the your firebase storage bucket
11. **_FIREBASE_MESSAGE_ID_** = Defines the Message Id of your Firebase project
12. **_FIREBASE_APP_ID_** = Defines the your app ID that will be used to connect to Firebase
13. **_FIREBASE_MEASUREMENT_ID_** = Defines the measurement ID of your firebase project
14. **_FIREBASE_KEYS_** = Defines your admin secret keys to use in Firebase

To know how to get the Firebase credentials, please refer to their [Documentation](https://firebase.google.com/docs/build)

## Recommended Schemas

You can customized the query inside the firebase / mysql Query.js files respectively to suits your schemas need

But if you want ease of use, please follow this recommended schemas

For MySQL
| userId| name          | absentNum | class |   type    | date  | status    |
|----   | ----          |---        | ---   | ---   |---    | ---   |
|int    | varchar(255)  | varchar   | char(5)| varchar  | Datetime  | char(8)   |

For FireStore

TBA
