// Hàm kiểm tra trạng thái có thể chạy lệnh không
function canRun(client, ...extraFlags) {
  if (client.global.paused || client.global.captchadetected) return false;
  for (const flag of extraFlags) {
    if (client.global[flag]) return false;
  }
  return true;
}

// Hàm gửi lệnh và delay (nếu cần)
async function sendCommand(channel, command, delay = 0) {
  await channel.send(command);
  if (delay > 0) await sleep(delay);
}

// Hàm sleep
function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

module.exports = { canRun, sendCommand, sleep }; 