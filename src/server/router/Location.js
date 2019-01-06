import Url from 'url';
import querystring from 'querystring';
import cookie from 'cookie';
import log from '../log';

export default class Location {
  constructor(request) {
    this.method = null;
    this.pathname = null;
    this.query = {};
    this.params = {};
    this.cookie = {};
    this.parse(request);
  }

  parse(request) {
    const { url, method, headers } = request;
    const { pathname, query } = Url.parse(url);

    this.method = method.toLowerCase();
    this.pathname = pathname;
    this.query = querystring.parse(query);

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