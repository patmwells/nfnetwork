import { parse } from 'url';
import querystring from 'querystring';
import cookie from 'cookie';
import log from '../log';

export default class Location {
  constructor() {
    this.method = null;
    this.pathname = null;
    this.query = {};
    this.cookie = {};
    this.params = {};
  }

  request(request) {
    const { url, method, headers } = request;
    const { pathname, query } = parse(url);

    this.method = method.toLowerCase();
    this.pathname = pathname;
    this.query = querystring.parse(query);

    this.cookies(headers);
  }

  cookies(headers) {
    if (!headers.cookie) {
      return;
    }
    try {
      this.cookie = cookie.parse(headers.cookie);
    } catch (ex) {
      log.error('cookies', `could not parse cookies ${value}`, ex);
    }
  }
}