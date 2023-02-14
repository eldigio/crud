'use strict';

import { fetchData } from './modules/fetchData.js';
import { getUrlParam } from './modules/getUrlParam.js';
import { form } from './utils/dom.js';
import { URL } from './utils/env.js';

// Functions
const checkData = async () => {
  const id = getUrlParam('id');

  if (!id) return;

  const response = await fetchData(`${URL}/${id}`);

  if (!response) {
    form.classList.add('d-none');
    const markup = `
    <div class="w-100 d-flex flex-column justify-content-center align-items-center">
      <h2 class="text-center text-danger">ID non valido</h2>
      <a href="/">Torna alla Home</a>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', markup);
    return;
  }

  form.elements.name.value = response.name;
  form.elements.email.value = response.email;
};

checkData();

const submitForm = async event => {
  event.preventDefault();
  if (!form.checkValidity()) event.stopPropagation();
  else {
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const createdAt = new Date().getTime();
    console.log({ createdAt });

    const formData = {
      name,
      email,
      createdAt,
    };

    const id = getUrlParam('id');

    let response;
    if (id) {
      response = await fetchData(`${URL}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      response = await fetchData(URL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (response) window.location = '/';
  }
  form.classList.add('was-validated');
};

// Event Listeners
form.addEventListener('submit', submitForm);
