function timestamp() {
  return new Date().toISOString();
}

function info(type, message) {
  const time = timestamp();
  console.log(`[${time}] [INFO] [${type}] ${message}`);
}

function error(type, message, error) {
  const time = timestamp();
  console.error(`[${time}] [ERROR] [${type}] ${message} \n`, error);
}

export default { info, error };