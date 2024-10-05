# Contact Vault App

A contact information app with a Node.js server backend.

## Features

- Add, update, and delete contact information
- Store contacts in a local file
- Retrieve contact details via API

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/yourcontactname/contact-information-app.git
  ```
2. Navigate to the project directory:
  ```bash
  cd contact-information-app
  ```
3. Install dependencies:
  ```bash
  npm install
  ```

## Usage

1. Start the server:
  ```bash
  npm start
  ```
2. Access the app at `http://localhost:3000`

## API Endpoints

- `GET /contacts` - Retrieve all contacts
- `POST /contacts` - Add a new contact
- `PUT /contacts/:id` - Update a contact
- `DELETE /contacts/:id` - Delete a contact

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

## License

This project is licensed under the MIT License.