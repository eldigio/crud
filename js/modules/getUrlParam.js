export const getUrlParam = param => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(param);
};
