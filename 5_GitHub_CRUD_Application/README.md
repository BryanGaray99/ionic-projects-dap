# GitHub Client Ionic App

This Ionic app is a GitHub client with three tabs, offering functionality to fetch repositories, delete repositories, create new repositories, and retrieve user information.

## Features

### Tab 1 - Repositories

- **Fetch Repositories**: Displays a list of the user's GitHub repositories in order of creation.
- **Delete Repository**: Allows users to delete a repository by long-pressing on it. Presents a confirmation dialog before proceeding with deletion.

### Tab 2 - Create Repository

- **Form for Creating Repositories**: Provides a form to create a new GitHub repository with fields for name, description, and visibility.
- **Field Validations**: Implements field validations to ensure mandatory information is provided before submitting the form.
- **Toast Messages**: Displays toast messages for successful repository creation and validation errors.

### Tab 3 - User Information

- **User Details**: Retrieves and displays information about the GitHub user, including username, profile picture, and other relevant details.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/BryanGaray99/ionic-projects-dap.git
   ```
2. **Navigate to the Project Directory:**
   ```bash
   cd github-client-ionic
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Add your Github Token:**
   Go to /src/environments and create a "environment.ts" file and inside copy the content of "environment.example.ts" and insert your token


## Usage

- **Run the App:**
   ```bash
   ionic serve
   ```
   Access the app by navigating to `http://localhost:8100/` in your browser.

- **Interact with the App:**
   - **Tab 1 (Repositories):**
     - Displays the list of user repositories.
     - Long-press on a repository to delete it, confirming the action with a dialog.
   - **Tab 2 (Create Repository):**
     - Fill out the form with repository name, description, and visibility.
     - Field validations ensure mandatory information is provided.
     - Submit the form to create a new repository, with success and validation error messages displayed through toasts.
   - **Tab 3 (User Information):**
     - Shows details about the GitHub user, including username, profile picture, and additional information.

## Technical Overview

- **Angular HttpClient:** Utilizes Angular's HttpClient for making HTTP requests to interact with the GitHub API.
- **Observables:** Leverages Observables for handling asynchronous operations when making HTTP requests, ensuring efficient data stream management.
- **Ionic Framework:** Developed using the Ionic Framework to provide a cross-platform environment and consistent UI for both mobile and web.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to enhance or fix any aspects of this GitHub Client Ionic App.


## Author: Bryan Garay

## Email: bryangarayacademico@gmail.com

## License: MIT
