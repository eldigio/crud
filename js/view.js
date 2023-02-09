'use strict';

// Selectors
const form = document.querySelector('form');

// Functions
const submitForm = async event => {
  event.preventDefault();
  if (!form.checkValidity()) event.stopPropagation();
  else {
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const createdAt = new Date().getTime();
    console.log(createdAt);

    const formData = {
      name,
      email,
      createdAt,
    };

    const response = await fetch('http://localhost:3000/people', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response);
    console.log({ name, email, createdAt });
  }
  form.classList.add('was-validated');
};

// Event Listeners
form.addEventListener('submit', submitForm);
