# Node.js Task Queuing with Rate Limiting

## Requirements:

- Node.js
- Redis (optional for a more scalable queue)
- PM2 (optional for clustering)

## Setup:

1. Clone the repository.
2. Run `npm install` to install the required dependencies.

## Running the Application:

1. Start the server by running `node index.js`.
2. Optionally, use `pm2 start index.js -i 2` to start two instances of the app (for clustering).

## API Endpoint:

- `POST /task`
  - **Body**: `{ "user_id": "123" }`
  - The task is processed and the result is logged in `task_logs.txt`.

## Features:

- Rate limiting: 1 task per second and 20 tasks per minute per user.
- Task queuing: Tasks exceeding the rate limit are queued and executed based on the limits.
