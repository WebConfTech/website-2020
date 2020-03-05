import R from 'ramda';
import fetch from 'isomorphic-unfetch';
import { API_URL } from '../config';
import { ENDPOINTS } from './resources';
import { serialize, deserialize } from './serialization';

const DEFAULT_HEADERS = {
  Accept: 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
};

const appendParameters = (urlObject, params) => {
  if (params.filter != null) {
    Object.keys(params.filter).forEach((key) => {
      const filterKey = `filter[${key}]`;
      const filterValue = params.filter[key];

      urlObject.searchParams.append(filterKey, filterValue);
    });
  }

  if (params.include != null) {
    const include = params.include.join(',');
    urlObject.searchParams.append('include', include);
  }
};

const makeURL = (resource, params) => {
  const url = `${API_URL}/${ENDPOINTS[resource]}/`;
  const urlObject = new URL(url);

  if (params != null) {
    appendParameters(urlObject, params);
  }

  return urlObject;
};

const makeHeaders = (headers = {}) => R.mergeLeft(headers, DEFAULT_HEADERS);

const findAll = async (resource, options = {}) => {
  const url = makeURL(resource, options.params).toString();
  const response = await fetch(url, {
    heders: makeHeaders(options.headers),
  });

  const json = await response.json();
  return deserialize(json);
};

const create = async (resource, data, options = {}) => {
  const url = makeURL(resource, options.params).toString();
  const serializedData = serialize(resource, data);

  const response = await fetch(url, {
    headers: makeHeaders(options.headers),
    method: 'POST',
    body: JSON.stringify(serializedData),
  });

  const json = await response.json();
  return deserialize(json);
};

export const api = {
  findAll,
  create,
};
