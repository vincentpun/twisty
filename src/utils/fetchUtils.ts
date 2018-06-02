import * as urlJoin from 'url-join';

const responseHelper = (response: Response) => {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject({
      status: response.status,
      message: response.statusText,
    });
  }
}

export const getUrl = (path: string) =>
  urlJoin(process.env.REACT_APP_BASE_URL, path)

export const postData = (url: string, data: { [key: string]: any } | any[]) =>
  fetch(getUrl(url), {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
  }).then(responseHelper).then(response => response.json());

export const get = (url: string) =>
  fetch(getUrl(url)).then(responseHelper).then(response => response.json());
