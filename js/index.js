'use strict';

const tbody = document.querySelector('tbody');

// Functions
const getData = async () => {
  const response = await (await fetch('http://localhost:3000/people')).json();

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
      createdAt.textContent = person.createdAt;
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

      actions.append(deleteBtn, updateBtn);
      tr.appendChild(actions);
    });
  }
};

const fetchDeleteRow = async id => {
  const response = await fetch(`http://localhost:3000/people/${id}`, {
    method: 'DELETE',
  });

  return response;
};

// Event Listeners
tbody.addEventListener('click', async e => {
  const deleteBtn = e.target.closest('.btn-danger');

  if (!deleteBtn) return;

  const response = await fetchDeleteRow(deleteBtn.id);

  if (response.ok) getData();
});

getData();
