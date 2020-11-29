
import { html } from 'lit-html';
import { form } from './form';

const lsget = (key) => localStorage.getItem(key)

let victim = lsget('victim') ? lsget('victim') : '';
let students = lsget('students') ? lsget('students').split(',') : [];
let backup = lsget('backup') ? lsget('backup').split(',') : [];


const sendUpdate = () => {
  const ce = new CustomEvent('update', {
    bubbles: true,
  });

  document.dispatchEvent(ce);
}

document.addEventListener('add-students', (event) => {
  console.log(event.detail);
  students = event.detail;
  backup = [...students];

  localStorage.setItem('students', students.join(','));
  localStorage.setItem('backup', backup.join(','));

  sendUpdate();
});

const selectionHandler = () => {
  const rand = Math.floor(Math.random() * students.length);
  victim = students[rand];
  students = students.filter((student) => student !== victim);
  
  localStorage.setItem('students', students.join(','));
  localStorage.setItem('victim', victim);

  sendUpdate();
}

const resetHandler = () => {
  victim = '';
  students = [...backup];
  sendUpdate();
}

const victimTmpl = () => html`<hr>
  <h2>${victim}</h2>`;

const actionsTmpl = () => html`
  <div id="actions">
    <button class="btn btn-danger" @click=${selectionHandler}>
      Select the vittimah
    </button>
    <button class="btn" @click=${resetHandler}>
      Reset
    </button>

    ${victim.length ? victimTmpl() : html``}
  </div>
`;

const app = () => html`<section id="app">
  <h1>Student picker for really bad torture</h1>
  ${form()}
  <div id="view">
    <ul>
      ${students.map((student) => html`<li>${student}</li>`)}
    </ul>
  </div>

  ${students.length ? actionsTmpl() : html``}

</section>`;

export {
  app
}