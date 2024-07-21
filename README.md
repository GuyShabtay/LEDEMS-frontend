# LEDEMS - frontend
<p>LEDEMS is short for: Law Enforcement Digital Evidence Management System.</p>
LEDEMS is a web application for law enforcement officers to upload, view, and manage digital evidence related to suspects. The application allows officers to securely log in, upload various digital assets (e.g., images, videos, documents) associated with a suspect, and manage the evidence in a structured manner.

### NOTE: If your are using this application through the public URL (not localhost), then the first access to the database you make (register/login) can take up to a minute because I used a free server (Render)

## How to run this project

- if you want to run this application on localhost (both frontend and backend), please search for the lines that contain: `https://ledems-backend.onrender.com` (you will find 8 of them) and replace them with `http://localhost:8000`. This means that the data transfer will no longer be done via HTTPS but with HTTP.

- Install dependecies:
<pre><code>npm i</code></pre>

- Add to the root folder a file called ```.env``` and in that file add these variables: 
 ```bash
VITE_API_KEY= "your API key"
VITE_AUTH_DOMAIN= "your auth domain"
VITE_PROJECT_ID= "your project ID"
VITE_STORAGE_BUCKET= "your storage bucket"
VITE_MESSAGING_SENDER_ID= "your messaging sender ID"
VITE_APP_ID= "your app ID"
  ```

- Start the application:
<pre><code>npm run dev</code></pre>

## Technologies
- HTML
- CSS
- JavaScript
- React
- Axios
- Mui
- Firebase cloud storage

## Features
- Register
- Login
- Add a new suspect
- Search for a suspect by ID
- Add an evidence that will be related to a suspect (including file upload) 
- View, edit and delete evidences from a suspect
- Filter evidences by file type 
- Sort evidences by evidence date
- Logout