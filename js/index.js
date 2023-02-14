'use strict';

import { fetchData } from './modules/fetchData.js';
import { tbody } from './utils/dom.js';
import { URL } from './utils/env.js';

// Functions
const getData = async () => {
  const response = await fetchData(URL);

  if (response) {
    tbody.innerHTML = '';

    response.forEach(person => {
      const tr = document.createElement('tr');
      tbody.appendChild(tr);

      // insert person id
      const id = document.createElement('th');
      id.textContent = person.id;
      tr.appendChild(id);

      // insert person name
      const name = document.createElement('th');
      name.textContent = person.name;
      tr.appendChild(name);

      // insert person email
      const email = document.createElement('th');
      email.textContent = person.email;
      tr.appendChild(email);

      // insert person createdAt timestamp
      const createdAt = document.createElement('th');
      createdAt.textContent = person.createdAt
        ? new Date(person.createdAt).toLocaleString('it-IT')
        : '-';
      tr.appendChild(createdAt);

      // insert delete btn
      const actions = document.createElement('th');

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('btn', 'btn-danger');
      deleteBtn.id = person.id;

      // insert edit btn
      const updateBtn = document.createElement('button');
      updateBtn.textContent = 'Edit';
      updateBtn.classList.add('btn', 'btn-warning');
      updateBtn.id = person.id;

      actions.append(deleteBtn, updateBtn);
      tr.appendChild(actions);
    });
  }
};

// Event Listeners
tbody.addEventListener('click', async e => {
  const deleteBtn = e.target.closest('.btn-danger');

  if (!deleteBtn) return;

  const response = await fetchData(`${URL}/${deleteBtn.id}`, {
    method: 'DELETE',
  });

  if (response) getData();
});

tbody.addEventListener('click', async e => {
  const updateBtn = e.target.closest('.btn-warning');

  if (!updateBtn) return;

  window.location = `view.html?id=${updateBtn.id}`;
});

getData();
