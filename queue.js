function manageQueue(taskQueue) {
  setInterval(() => {
    Object.keys(taskQueue).forEach((userId) => {
      if (taskQueue[userId] && taskQueue[userId].length > 0) {
        const nextTask = taskQueue[userId].shift();
        nextTask();
      }
    });
  }, 1000); // Execute tasks at 1 task per second per user
}

module.exports = { manageQueue };
