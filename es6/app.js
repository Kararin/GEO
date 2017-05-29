import ReactDOM from 'react-dom';
import React from 'react';
import Main from './main.js';

document.addEventListener('DOMContentLoaded', () => {
    let element = document.querySelector('#main');
    console.log(element);

    ReactDOM.render(
        <Main name="Karina">Hello, world!</Main>,
        document.querySelector('#main')
    );
    console.log('ok');
});
