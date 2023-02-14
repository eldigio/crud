import { loading } from './loading.js';

export const fetchData = async (url, options) => {
  const loader = loading();
  const response = await fetch(url, options);
  const data = await response.json();
  loader.remove();

  return data;
};
