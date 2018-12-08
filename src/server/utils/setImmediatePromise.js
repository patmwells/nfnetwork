import util from 'util';

const setImmediatePromise = util.promisify(setImmediate);

export default setImmediatePromise;