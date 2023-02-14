export const loading = () => {
  const loaderContainer = document.createElement('div');
  loaderContainer.classList.add('loader-container');

  const spinner = document.createElement('div');
  spinner.classList.add('spinner-border', 'text-primary');
  spinner.setAttribute('role', 'status');

  loaderContainer.appendChild(spinner);
  document.body.appendChild(loaderContainer);

  return loaderContainer;
};
