import pathToRegex from 'path-to-regexp';

export default class Layer {
  constructor(method, path, handler) {
    this.method = method;
    this.path = path;
    this.handler = handler;
    this.keys = [];
    this.regex = path ? pathToRegex(path, this.keys) : null;
  }

  match(context) {
    if (!this.method && !this.path) {
      return true;
    }

    const { pathname, method } = context;

    const match = this.regex.exec(pathname);
    if (!match || method !== this.method) {
      return false;
    }

    const params = {};

    for (let i = 1; i < match.length; i++) {
      const key = this.keys[i - 1];
      const value = match[i];
      if (!key || !value) {
        return;
      }
      params[key.name] = value;
    }

    context.params = params;

    return true;
  }
}