/**
 * https://nodejs.org/api/process.html#process_process_memoryusage
 */
export default function memory() {
  const used = process.memoryUsage();
  const formatted = {};
  Object.getOwnPropertyNames(used).forEach(key => {
    formatted[key] = `${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`;
  });
  return formatted;
}