import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

fetch('https://api.ipify.org?format=json', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
}).then(res => res.json())
.then(response => {
    fetch('http://localhost/cushion_backend/index.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ip_address: response.ip,
      }),
    })
});

ReactDOM.render( < App / > , document.getElementById('root'));
