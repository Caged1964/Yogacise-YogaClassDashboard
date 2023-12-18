# Yogacise Application
#### Welcome to the Yogacise application! This web application is built using Node.js, Express, and MongoDB. It allows users to register for yoga classes, view registered users, update user information, and delete user records. Additionally, the application simulates a payment process during user registration.

## Getting Started

1. Clone the repository :
```

git clone https://github.com/Caged1964/Yogacise-YogaClassDashboard.git

```

2. Installing dependencies :
```

npm install

```

3. Create a .env file with the following environment variables :
- DB_URL: MongoDB connection URL (default: mongodb://localhost:27017/yogacise)
- PORT: Port to listen on (default: 3000)

4. Run the application :
```

node index.js

```
or 
```

npm start

```

## Technologies Used
- Backend: Express.js
- Database: MongoDB
- Mongoose: ODM for interacting with MongoDB
- EJS: Templating engine for views
- Bootstrap: CSS framework for styling

## Features 
- User registration with complete profile information:
  - Name
  - Age
  - Phone Number
  - Email
  - Address
  - Batch
- Integrated payment processing (simulated in this version)
- View all registered users
- View individual user details
- Edit user information
- Delete users
- User-friendly interface with navigation bar

## Database

The Yogacise application uses a single MongoDB table named users to store all user information including payment details. This simplifies the database structure and eliminates the need for separate tables.

## User Table:

- id: Unique identifier for each user (primary key)
- name: User's full name
- age: User's age
- phone_number: User's phone number
- email: User's email address
- address: User's address
- current_batch: User's current yoga class batch
- join_date: Date the user joined the program
- payment_status: Indicates whether payment for the current batch is complete

## ER Diagram

```
+--------------+
|   User       |
+--------------+
| _id          |  <--- Primary key
| name         |
| age          |
| address      |
| phoneNumber  |
| email        |
| paymentStatus|
| currentBatch | 
| joinDate     |
+--------------+
```
This single-table approach offers a streamlined and efficient solution for smaller datasets with simpler payment needs. However, it's important to consider potential limitations when dealing with large volumes of payment data or complex payment scenarios.

## Development Approach

- Express and MongoDB:
  - The application is built using the Express.js framework for handling server-side logic and routing. MongoDB is used as the database to store user information and simulate payment records.
- MVC Architecture:
  - The code follows the Model-View-Controller (MVC) architecture to organize the application's structure. Models (models/user.js) define the data structure, views (views/) handle rendering, and controllers (index.js) manage application logic.
- Simulated Payment Process:
  - The utils/completePayment.js module simulates a payment process with an 80% success rate. This was implemented to mimic real-world scenarios where payments may occasionally fail.
- Error Handling:
  - Custom error handling is implemented using the utils/ExpressError.js class to provide meaningful error messages and HTTP status codes.
 
## Assumptions 
- The payment simulation in completePayment.js assumes an 80% chance of success. This is a fictional scenario and does not integrate with any real payment gateway.
- The focus is on user registration and class management, with payment processing serving as a secondary feature.
