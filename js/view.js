'use strict';

// Selectors
const form = document.querySelector('form');

// Functions
const checkData = async () => {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  // console.log({ searchParams, id });
  if (!id) return;

  const response = await fetch(`http://localhost:3000/people/${id}`);

  if (!response.ok) {
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

  const responseData = await response.json();

  form.elements.name.value = responseData.name;
  form.elements.email.value = responseData.email;
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

    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');

    let response;
    if (id) {
      response = await fetch(`http://localhost:3000/people/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      response = await fetch('http://localhost:3000/people', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (response.ok) window.location = '/';
  }
  form.classList.add('was-validated');
};

// Event Listeners
form.addEventListener('submit', submitForm);
