'use strict';

const getData = async () => {
  const response = await (await fetch('http://localhost:3000/people')).json();

  Array.from(response).forEach(value => {
    console.log(value);
  });
};

getData();
