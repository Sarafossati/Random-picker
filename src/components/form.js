import { html } from 'lit-html';

const submitHandler = (event) => {
    event.preventDefault();
    let value = event.target.list.value;
    const addStudents = value
                            .split(',')
                            .map((e) => e.trim());

    const ce = new CustomEvent('add-students', {
        bubbles: true,
        detail: addStudents
    });

    document.dispatchEvent(ce);
    event.target.reset();
}

const form = () => html`<form @submit=${submitHandler}>
    <label for="list">Inserisci uno o più nomi separati da una virgola "," e premi invio</label>
    <input type="text" name="list" />
    <button type="submit">Aggiungi</button>
</form>`;

export {
    form
}