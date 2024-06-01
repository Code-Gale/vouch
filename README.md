## API REQUESTS

**Tasks:**

1. **User Management**:

   - Implement user registration and authentication (e.g., email/password, social login)
   - User profile management (update profile information, profile picture, etc.)

2. **Connection Management**:

   - Allow users to search for and connect with other users (family, friends, etc.)
   - Manage connections (accept, reject, remove connections)

3. **Loan Request Management**:

   - Allow users to create loan requests (amount, purpose, repayment terms, etc.)
   - Share loan requests with connected users
   - Allow connected users to view and respond to loan requests (accept, reject, specify loan amount)

4. **Payment Integration**:

   - Integrate with a payment gateway or service (e.g., Stripe, PayPal) for fund transfers
   - Handle fund transfers from lenders to borrowers
   - Manage transaction records and account balances

5. **Loan Tracking**:

   - Track loan details (amount, lender(s), borrower, repayment schedule, outstanding balance)
   - Implement loan repayment functionality
   - Handle late payments, reminders, and potential penalties

6. **Notifications**:

   - Implement a notification system to inform users about new loan requests, loan approvals/rejections, repayment reminders, etc.

7. **Security and Compliance**:
   - Implement appropriate security measures (e.g., encryption, access controls, etc.)
   - Comply with relevant financial regulations and data privacy laws

**Endpoints (API):**

1. **User Management**:

   - `/register` (POST): Register a new user
   - `/login` (POST): Authenticate a user
   - `/users/:userId` (GET, PUT): Retrieve and update user profile information

2. **Connection Management**:

   - `/connections` (GET, POST): Retrieve and create new connections
   - `/connections/:connectionId` (PUT, DELETE): Update or remove a connection

3. **Loan Request Management**:

   - `/loans` (POST): Create a new loan request
   - `/loans/:loanId` (GET, PUT): Retrieve and update loan details
   - `/loans/:loanId/responses` (GET, POST): Retrieve and submit responses to a loan request

4. **Payment and Transactions**:

   - `/payments` (POST): Initiate a fund transfer
   - `/transactions` (GET): Retrieve transaction history and account balances

5. **Loan Tracking and Repayment**:

   - `/loans/:loanId/repayments` (GET, POST): Retrieve and submit loan repayments
   - `/loans/:loanId/status` (GET): Get the current status of a loan (outstanding balance, next payment due, etc.)

6. **Notifications**:
   - `/notifications` (GET): Retrieve notifications for a user

## FILE STRUCTURE

```bash
vouch/
├── src/
│   ├── config/
│   │   └── db.js
│   │   └── env.js
│   ├── controllers/
│   │   └── auth.controller.js
│   │   └── user.controller.js
│   │   └── loan.controller.js
│   │   └── connection.controller.js
│   │   └── payment.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   │   └── validation.middleware.js
│   ├── models/
│   │   └── User.js
│   │   └── Loan.js
│   │   └── Connection.js
│   │   └── Transaction.js
│   ├── routes/
│   │   └── auth.routes.js
│   │   └── user.routes.js
│   │   └── loan.routes.js
│   │   └── connection.routes.js
│   │   └── payment.routes.js
│   ├── services/
│   │   └── notification.service.js
│   │   └── payment.service.js
│   ├── utils/
│       └── utils.js
├── .env
├── app.js
├── .gitignore
├── package.json
└── README.md
```

## FILE STRUCTURE EXPLANATION

**`src/config/`**

- `db.js`: This file is responsible for establishing the connection to the MongoDB database using Mongoose. It exports a function or object that can be imported and used in other parts of the application to interact with the database.
- `env.js`: This file loads the environment variables from the `.env` file and exports them as an object or individual variables. This allows you to access sensitive information like the MongoDB connection string or JWT secret without hard-coding them in the codebase.

**`src/controllers/`**

- `authController.js`: This file contains the controller functions for user authentication, such as registering a new user and logging in an existing user. These functions typically interact with the User model and handle tasks like password hashing, generating JWT tokens, and returning appropriate responses.
- `userController.js`: This file contains the controller functions for user-related operations, such as updating a user's profile information or retrieving user data.
- `loanController.js`: This file contains the controller functions for loan-related operations, such as creating a new loan request, retrieving loan details, and responding to loan requests (approving or rejecting).
- `connectionController.js`: This file contains the controller functions for managing user connections, such as adding a new connection (friend, family member), removing a connection, and retrieving a user's connections.
- `paymentController.js`: This file contains the controller functions for handling payment operations, such as initiating a fund transfer from a lender to a borrower.

**`src/middleware/`**

- `authMiddleware.js`: This file contains a middleware function that verifies the JSON Web Token (JWT) included in incoming requests. It checks the token's validity and attaches the user's ID to the request object (`req.user`) for further use in the controllers or other middleware functions.
- `validationMiddleware.js`: This file contains middleware functions for validating incoming request data, such as checking if required fields are present, validating data formats (e.g., email, date), and enforcing data constraints.

**`src/models/`**

- `User.js`: This file defines the Mongoose model schema for the User entity. It specifies the properties (fields) that a user document should have, such as username, email, password (hashed), and any other relevant user information.
- `Loan.js`: This file defines the Mongoose model schema for the Loan entity. It specifies the properties (fields) that a loan document should have, such as the loan amount, purpose, repayment terms, lender(s), borrower, and current status.
- `Connection.js`: This file defines the Mongoose model schema for user connections. It specifies the properties (fields) that a connection document should have, such as the user IDs of the two connected users and any additional metadata.
- `Transaction.js`: This file defines the Mongoose model schema for tracking financial transactions. It specifies the properties (fields) that a transaction document should have, such as the transaction amount, sender, recipient, and timestamp.

**`src/routes/`**

- `authRoutes.js`: This file defines the routes for user authentication, such as the `/register` and `/login` endpoints. It imports the corresponding controllers from `authController.js` and maps them to the appropriate routes.
- `userRoutes.js`: This file defines the routes for user-related operations, such as updating a user's profile information or retrieving user data. It imports the corresponding controllers from `userController.js` and maps them to the appropriate routes.
- `loanRoutes.js`: This file defines the routes for loan-related operations, such as creating a new loan request, retrieving loan details, and responding to loan requests. It imports the corresponding controllers from `loanController.js` and maps them to the appropriate routes.
- `connectionRoutes.js`: This file defines the routes for managing user connections, such as adding a new connection, removing a connection, and retrieving a user's connections. It imports the corresponding controllers from `connectionController.js` and maps them to the appropriate routes.
- `paymentRoutes.js`: This file defines the routes for payment-related operations, such as initiating a fund transfer from a lender to a borrower. It imports the corresponding controllers from `paymentController.js` and maps them to the appropriate routes.

**`src/services/`**

- `notificationService.js`: This file contains functions for sending notifications to users, such as informing them of new loan requests, loan approvals/rejections, or upcoming repayment due dates. We can integrate with a third-party notification service or handle sending notifications directly (e.g., via email, push notifications).
- `payment.service.js`: This file contains functions for interacting with a payment gateway or service (e.g., Stripe, PayPal). It contains the logic for initiating fund transfers, handling payment callbacks, and performing any necessary payment-related operations.

**`src/utils/`**

- `utils.js`: This file can contain utility functions that are used throughout the application, such as helper functions for data manipulation, formatting, or other common operations.
