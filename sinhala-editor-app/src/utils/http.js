import axios from 'axios'

export const Http = (url_prefix) => {
  let requestConf = {
    url: url_prefix,
  };
  const addToken = (token) => {
    const tokenHeaders = { Authorization: 'Bearer ' + token };
    if (token) {
      requestConf = {
        ...requestConf,
        headers: tokenHeaders,
      };
    }
    return requestConf;
  };
  // constructUrl if url is passed in addition to url_prefix
  const getUrl = (url) => {
    if (url) {
      return url_prefix + url;
    }
    return url_prefix;
  };
  const addData = (data) => {
    if (data) {
      requestConf = {
        ...requestConf,
        data: data,
      };
    }
    return requestConf;
  };
  const constructRequest = (method, data = null, url = '', token = '', params = {}) => {
    let request = addData(data);
    request = addToken(token);
    let fullUrl = getUrl(url);
    let queryString = new URLSearchParams(params).toString()
    request['url'] = fullUrl + "?" + queryString;
    request['method'] = method;
    return request;
  };
  const get = async ({ data = null, url = '', token = '', params = {} } = {}) => {
    const conf = constructRequest('GET', data, url, token, params);
    const request = await axios(conf);
    return request;
  };
  const post = async ({ data = null, url = '', token = '', params = {} } = {}) => {
    const conf = constructRequest('POST', data, url, token, params);
    const request = await axios(conf);
    return request;
  };
  const put = async ({ data = null, url = '', token = '', prams = {} } = {}) => {
    const conf = constructrequest('PUT', data, url, token, params);
    const request = await axios(conf);
    return request;
  };
  const remove = async ({ data = null, url = '', token = '', params = {} } = {}) => {
    const conf = constructrequest('DELETE', data, url, token, params);
    const request = await axios(conf);
    return request;
  };

  return {
    get,
    post,
    put,
    remove,
  };
};