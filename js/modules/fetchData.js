import { container } from '../utils/dom.js';
import { loading } from './loading.js';

export const fetchData = async (url, options) => {
  const loader = loading();

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    loader.remove();

    return data;
  } catch (error) {
    loader.remove();

    container.innerHTML = '';

    const errorContainer = document.createElement('div');
    errorContainer.classList.add('error-container');

    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Oops qualcosa è andato storto';

    const errorBtn = document.createElement('button');
    errorBtn.classList.add('error-btn');
    errorBtn.textContent = 'Ricarica la pagina';
    errorBtn.onclick = () => window.location.reload();

    errorContainer.append(errorMessage, errorBtn);
    document.body.appendChild(errorContainer);
  }
};
