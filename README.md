# User Authentication System

A comprehensive user authentication system built with Node.js and React. This project showcases secure authentication practices, including JWT-based authentication, password hashing, and cookie management. The frontend is designed with React and styled using Tailwind CSS and Daisy UI for a responsive, modern UI.
![Screenshot](/frontend/src/resources/images/screenshot%20.png)

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express**: Web framework for Node.js to build RESTful APIs.
- **JWT**: JSON Web Tokens for secure authentication.
- **Bcrypt**: Library to hash and compare passwords securely.
- **Cookie-Parser**: Middleware for parsing cookies in HTTP requests.
- **Mailtrap**: Email testing tool for development.
- **MongoDB**: NoSQL database to store user information.
- **Nodemon**: Tool to automatically restart the server on code changes.
- **Crypto**: Built-in module for cryptographic operations.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for custom styling.
- **Daisy UI**: Component library that extends Tailwind CSS with pre-designed UI components.

### Development Tools
- **VSCode**: Code editor for writing and managing code.
- **Postman**: Tool for testing and debugging API endpoints.

### Hosting
- **Render.com**: Cloud platform for deploying and hosting web applications.

## Features

- **User Registration and Login**: Secure registration and login with JWT-based authentication.
- **Password Hashing**: User passwords are hashed with Bcrypt for enhanced security.
- **Email Verification**: Email-based verification using Mailtrap for development purposes.
- **Password Reset**: For resetting password incase forgotten.
-- **Profile Update**: User can update their details in the dashboard. 
- **Responsive Design**: Modern, responsive UI with Tailwind CSS and Daisy UI.
- **Dark and Light Mode**: Toggle between dark and light themes in the dashboard with Tailwind CSS utility classes.

## Installation

### Prerequisites
- Node.js (v14 or later)
- MongoDB
- Postman (for testing API)

### Backend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/CletsyMedia/Authentication.git
   cd Authentication
  ```

2. **Clone the Repository**
   ```bash
   git clone https://github.com/CletsyMedia/Authentication.git
   cd Authentication
  ```


3. **Configure Environment Variables**
    Create a .env file in the root directory and add the following:
    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    MAILTRAP_ENDPOINT=your_mailtrap_endpoint
    MAILTRAP_TOKEN=your_mailtrap_token
    ```
    Run the Server:
    ```bash
    npm run dev
    ```

    ### Frontend Setup

1. **Navigate to the Frontend Directory**
    ```bash
    cd frontend
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Run the React App**
    ```bash
    npm run dev
    ```

## API Testing
Use Postman to test the API endpoints. Follow the [API](https://documenter.getpostman.com/view/32168352/2sAXjJ4s2h) documentation from this link to access all endpoints.

## Deployment
The application is deployed on Render.com. Visit [Auth-App](https://mern-stack-2a15.onrender.com/) to access the live version.

## Known Issues
***Cross-Origin Requests:*** If you're encountering issues with CORS, ensure that the backend is properly configured to allow requests from the frontend domain.

***Environment Variables:*** Double-check that all environment variables are correctly set up in both development and production environments.

***Email Verification:*** For Mailtrap, ensure that the email configurations are properly set in the .env file to test email functionalities.

## Contributing
Feel free to open issues or submit pull requests if you have suggestions or improvements. Please ensure to follow the coding guidelines and write clear commit messages.

## Contact
For any questions or further information, please contact cletussam12@yahoo.com