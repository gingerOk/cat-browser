// set location.search
export function setUrlSearchParams(obj) {
    const newParams = [];
    let params = obj;
    for (const key in params) {
      newParams.push(`${key}=${params[key]}`);
    }
    return `?${newParams.join("&")}`;
  }
  

// decode location.search
export function getByParamsSearch(url) {
    const question = url.indexOf("?");
    if (question < 0) {
      return {};
    }
    const search = url.substring(1);
    
    return JSON.parse(
      '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function (key, value) {
        return key === "" ? value : decodeURIComponent(value);
      }
    );
  }