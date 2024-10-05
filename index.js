const express = require("express");
const rateLimit = require("express-rate-limit");
const { task } = require("./task");
const { manageQueue } = require("./queue");

const app = express();
app.use(express.json());

const taskQueue = {}; // Store queued tasks per user

const limiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 20, // 20 tasks per minute
  keyGenerator: (req) => req.body.user_id,
  handler: (req, res) => {
    const userId = req.body.user_id;
    if (!taskQueue[userId]) {
      taskQueue[userId] = [];
    }
    taskQueue[userId].push(() => task(userId));
    res.status(429).json({ message: "Rate limit exceeded, task queued" });
  },
});

app.post("/api/v1/task", limiter, (req, res) => {
  const userId = req.body.user_id;
  task(userId);
  res.status(200).json({ message: "Task processed" });
});

// Start processing the queue
manageQueue(taskQueue);

app.listen(8000, () => {
  console.log("Server running on port 3000");
});
