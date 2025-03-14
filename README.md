# URL Shortener with PocketBase and Node.js

This project sets up a URL shortener using **PocketBase** as the database and **Express.js** as the server.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [PocketBase](https://pocketbase.io/docs/)

## Installation

### Step 1: Set Up an Express.js App

Initialize a new Node.js project:
```sh
npm init -y
```

Install necessary dependencies:
```sh
npm install express pocketbase
```

Run the application:
```sh
npm run dev
```

### Step 2: Set Up PocketBase

1. Download PocketBase from the [official website](https://pocketbase.io/docs/).
2. Install and run PocketBase on your device.
3. Log in using your credentials.

## Authentication

To authenticate as a user, use the following code:
```js
const pb = new PocketBase("http://localhost:8090");
const authData = await pb.collection("_superusers").authWithPassword(
    "admin@gmail.com",
    "adminadmin"
);
```

## Creating a Record

To add a new record to a collection:
```js
pb.collection('collection_name').create({
   longUrl,shortUrl
});
```

## Running the Project

Start your Express.js server and ensure PocketBase is running. You can now begin shortening URLs using your API.


