# Node.js Task Queuing with Rate Limiting

## Requirements:

- Node.js
- PM2 

## Setup:

1. Clone the repository.
2. Run `npm install` to install the required dependencies.


## Running the Application:

1. Start the server by running `node index.js`.
2. Optionally, use `pm2 start index.js -i 2` to start two instances of the app (for clustering).

## API Endpoint:

- `POST /api/v1/task`
  - **Body**: `{ "user_id": "123" }`
  - The task is processed and the result is logged in `task_logs.txt`.

## Features:

- Rate limiting: 1 task per second and 20 tasks per minute per user.
- Task queuing: Tasks exceeding the rate limit are queued and executed based on the limits.

## Approach and Steps Followed
In this project, I developed a Node.js API that efficiently handles user tasks while implementing rate limiting and queuing mechanisms. The objective was to ensure that each user could only process one task per second and a maximum of 20 tasks per minute. Any requests exceeding this limit should be queued for later execution, ensuring no requests are lost.

## Step 1: Requirement Analysis
I began by thoroughly analyzing the assignment requirements, which specified the need for a task function, rate limiting per user ID, and a queuing system. I documented the specifications, which helped outline the core features and functionalities needed in the API.

## Step 2: Setting Up the Environment
To establish the development environment, I performed the following actions:

Installed Node.js and initiated a new project using npm.
Installed necessary dependencies, including Express for building the API, express-rate-limit for implementing rate limiting, and PM2 for managing the application in a clustered environment.
Created a structured project layout to keep the codebase organized and maintainable.
## Step 3: Designing the API
With the foundational setup complete, I moved on to designing the API:

Created an index.js file for the main server logic, where I set up the Express application and defined routes.
Implemented a POST route /api/v1/task to accept user requests for task processing.
## Step 4: Implementing Rate Limiting
To enforce the specified rate limits, I utilized the express-rate-limit package. This involved:

Setting up a rate limiter that restricted each user ID to a maximum of 20 requests per minute and 1 request per second.
Developing a custom handler for requests that exceeded the rate limit, where I pushed these requests into a queue for later processing.
## Step 5: Task Functionality and Queuing
I implemented the task function to log task completions to a file. The function:

Recorded the completion of each task along with the user ID and timestamp in a task_logs.txt file.
Managed queued tasks by executing them at the allowed rate of 1 task per second using setInterval. This ensured that queued tasks were processed correctly without overloading the server.
## Step 6: Testing and Validation
To validate the functionality of the API:

I performed extensive testing using Postman to simulate various scenarios, including hitting the rate limit and ensuring tasks were queued appropriately.
Each request was monitored for correct responses, and the log file was checked for accurate task entries.
## Challenges Faced and Solutions
Throughout the implementation process, I encountered several challenges:

Handling Asynchronous Operations:

Challenge: Managing asynchronous operations with proper order of execution was initially difficult, particularly with queuing tasks and processing them without losing data.
Solution: I implemented callbacks within the task function to ensure each task was logged correctly before moving to the next queued task. This meticulous approach helped maintain data integrity.
Rate Limit Exceeded Scenarios:

Challenge: Testing the rate-limiting functionality revealed that a few requests were being dropped instead of queued.
Solution: I refined the queue management logic to ensure that no requests were lost. I created a robust queuing system that accurately handled requests by pushing them into a user-specific queue, which was then processed at the specified rate.
Server Crashes and Handling Failures:

Challenge: While testing, I noticed that unexpected server crashes could lead to loss of queued tasks.
Solution: To mitigate this, I ensured that tasks were logged immediately upon processing, and I used PM2 for clustering, which improved the resilience of the application. PM2’s restart capabilities also ensured that the API could recover gracefully from any unexpected failures.
Conclusion
By following this systematic approach, I successfully developed a Node.js API that meets the assignment requirements for task queuing and rate limiting. The solution is not only efficient but also scalable, capable of handling multiple user requests seamlessly. Through rigorous testing and addressing challenges head-on, I gained valuable experience in building scalable applications using Node.js.
