# EmployWise Assignment
This is a React-based application that integrates with the Reqres API for basic user management functions, including login, displaying a list of users, and allowing editing and deleting of users.

Features
Login Page: User authentication using the Reqres API with email and password.
Users List Page: Displays a list of users, with pagination and the ability to delete or edit users.
Edit User: Pre-fill user details and update them.
Delete User: Remove a user from the list.
Tech Stack
Frontend: React.js
State Management: React useState hooks
Routing: React Router
API Requests: Axios
Styling: Custom CSS
Prerequisites
Before running the project, ensure the following are installed:

Node.js (version 14 or higher) - Download Node.js
npm (Node Package Manager) - It comes with Node.js, so if you have Node.js installed, npm will be available.
Installation
Follow the steps below to get the app up and running on your local machine.

1. Clone the Repository
Clone this repository to your local machine
git clone <repository-url>
cd <repository-folder>
2. Install Dependencies
Install all the required dependencies:
npm install
3. Run the Application
To run the app locally, use the following command:
npm start
App Functionality
1. Login Page
The app starts with a login page.
Login credentials:
Email: eve.holt@reqres.in
Password: cityslicka
On successful login, a JWT token is saved in localStorage, and the user is redirected to the Users List page.
If the login fails, an error message is shown.
2. Users List Page
Displays a paginated list of users from the Reqres API.
Each user has a first name, last name, and avatar.
Pagination controls allow navigation between pages of users.
Edit: Update a user's first name and last name (mock edit functionality, as the API doesn't persist changes).
Delete: Remove a user from the list (mock delete functionality).
