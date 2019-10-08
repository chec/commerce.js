class Storage {
  //maybe move to data store later
  constructor(c) {
    this.c = c;
  }

  set(key, value, days) {
    let path;
    let expires = '';

    if (typeof this.c.options.config.cookie_path === 'undefined') {
      path = '/';
    } else {
      path = this.c.options.config.cookie_path;
    }

    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toGMTString();
    }
    return (document.cookie = key + '=' + value + expires + '; path=' + path);
  }

  get(key) {
    key = key + '=';

    for (let c of Array.from(document.cookie.split(';'))) {
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(key) === 0) {
        return c.substring(key.length, c.length);
      }
    }

    return null;
  }

  remove(key) {
    return this.set(key, '', -1);
  }
}

export default Storage;
