import { axios } from '../utils';

export default class Resource {
  constructor(base, actions) {
    this.http = axios;
    this.base = base;
    Object.assign(this, actions);
  }

  get(id, options) {
    let url = `/${this.base}`;
    if (typeof id === 'object') {
      options = id;
    } else if (id !== undefined) {
      url += `/${id}`;
    }
    return this.http.get(url, options);
  }

  delete(id, options) {
    const url = `/${this.base}/${id}`;
    return this.http.delete(url, options);
  }

  post(options) {
    const url = `/${this.base}`;
    return this.http.post(url, options);
  }

  put(id, options) {
    const url = `/${this.base}/${id}`;
    return this.http.put(url, options);
  }

  patch(id, options) {
    const url = `/${this.base}/${id}`;
    return this.http.patch(url, options);
  }
}