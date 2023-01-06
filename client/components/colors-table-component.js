class ColorsTableComponent {
    htmlElement;
    tbody;
    onDelete;
    onEdit;
    editedRowId;

    constructor({ colors, onDelete, onEdit }) {
        this.htmlElement = document.createElement('table');
        this.htmlElement.className = "table table-striped";
        this.htmlElement.innerHTML = ` 
                <thead class="bg-info">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Spalvos pavadinimas</th>
                <th scope="col">Spalvos kodas</th>
                <th scope="col">Pasiekiamumas:</th>
                <th>Veiksmai</th>
            </tr>
        </thead>
        <tbody></tbody>`
        this.tbody = this.htmlElement.querySelector('tbody');
        this.onDelete = onDelete;
        this.onEdit = onEdit;
        this.editedRowId = null;
        this.renderColors(colors, null);
    }

    createRowHtmlElement = (color) => {
        const { id, name, HEXcode, availability } = color
        const tr = document.createElement('tr')
        const thisRowIsEdited = id === this.editedRowId
        if (thisRowIsEdited) tr.classList.add('bg-edited');

        tr.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td class="fw-bold" style="background: ${HEXcode}">${HEXcode}</td>
        <td>${availability}</td>
        <td>
        <div class="d-flex justify-content-center gap-3">
        <button class="btn btn-warning">${thisRowIsEdited ? 'Atšaukti' : '⟳'}</button>
        <button class="btn btn-danger">✕</button>
        </div>
        </td>`;

        const deleteBtn = tr.querySelector('.btn-danger');
        deleteBtn.addEventListener('click', () => this.onDelete(id));

        const updateBtn = tr.querySelector('.btn-warning');
        updateBtn.addEventListener('click', () => this.onEdit(color));

        return tr;
    }

    renderColors(colors, editedRowId) {
        this.editedRowId = editedRowId;
        const rowsHtmlElements = colors.map(this.createRowHtmlElement);

        this.tbody.innerHTML = null;
        this.tbody.append(...rowsHtmlElements);


    }
}

export default ColorsTableComponent;