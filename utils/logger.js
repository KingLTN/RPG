const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

// Đọc config logger nếu có
let loggerConfig = { enableColor: true, logToFile: false, logFilePath: "logs.txt" };
try {
  loggerConfig = require("../config.json").logger || loggerConfig;
} catch {}

function formatLog(level, type, module, result = "") {
  const time = `[${new Date().toLocaleTimeString()}]`;
  let msg = `${time} [${level}] ${type} » ${module} » ${result}`;
  if (loggerConfig.enableColor) {
    switch (level) {
      case "INFO":
        msg = chalk.whiteBright.bold(time) + " " + chalk.cyanBright.bold(type) + " " + chalk.whiteBright.bold("»") + " " + chalk.magentaBright.bold(module) + " " + chalk.whiteBright.bold("»") + " " + chalk.greenBright.bold(result);
        break;
      case "WARN":
        msg = chalk.whiteBright.bold(time) + " " + chalk.yellowBright.bold(type) + " " + chalk.whiteBright.bold("»") + " " + chalk.magentaBright.bold(module) + " " + chalk.whiteBright.bold("»") + " " + chalk.yellowBright.bold(result);
        break;
      case "ERROR":
        msg = chalk.whiteBright.bold(time) + " " + chalk.redBright.bold(type) + " " + chalk.whiteBright.bold("»") + " " + chalk.magentaBright.bold(module) + " " + chalk.whiteBright.bold("»") + " " + chalk.redBright.bold(result);
        break;
      case "DEBUG":
        msg = chalk.whiteBright.bold(time) + " " + chalk.blueBright.bold(type) + " " + chalk.whiteBright.bold("»") + " " + chalk.magentaBright.bold(module) + " " + chalk.whiteBright.bold("»") + " " + chalk.blueBright.bold(result);
        break;
      default:
        break;
    }
  }
  return msg;
}

const logger = {
  info: (type, module, result = "") => {
    const msg = formatLog("INFO", type, module, result);
    console.log(msg);
    if (loggerConfig.logToFile) logToFile(msg);
  },
  warn: (type, module, result = "") => {
    const msg = formatLog("WARN", type, module, result);
    console.log(msg);
    if (loggerConfig.logToFile) logToFile(msg);
  },
  error: (type, module, result = "") => {
    const msg = formatLog("ERROR", type, module, result);
    console.log(msg);
    if (loggerConfig.logToFile) logToFile(msg);
  },
  debug: (type, module, result = "") => {
    const msg = formatLog("DEBUG", type, module, result);
    if (loggerConfig.debug) console.log(msg);
    if (loggerConfig.logToFile) logToFile(msg);
  }
};

function logToFile(msg) {
  fs.appendFileSync(path.resolve(loggerConfig.logFilePath), msg + "\n");
}

module.exports = { logger };
