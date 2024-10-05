const fs = require("fs");

async function task(user_id) {
  const log = `${user_id}-task completed at-${Date.now()}\n`;
  fs.appendFile("task_logs.txt", log, (err) => {
    if (err) throw err;
  });
}

module.exports = { task };
