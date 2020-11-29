
import { render, html } from 'lit-html';
import { app } from './components/app';

import './styles/main.scss';

const container = document.querySelector('.container');

render(app(), container);

document.addEventListener('update', 
    () => render(app(), container) );