class ColorsTableComponent {
    htmlElement;
    tbody;
    onDelete;

    constructor(colors, onDelete) {
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
        this.renderColors(colors);
    }

    createRowHtmlElement = ({ id, name, HEXcode, availability }) => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td style="background: ${HEXcode}">${HEXcode}</td>
        <td>${availability}</td>
        <td>
        <button class="btn btn-danger">✕</button>
        </td>`;

        const deleteBtn = tr.querySelector('.btn-danger');
        deleteBtn.addEventListener('click', () => this.onDelete(id));

        return tr;
    }

    renderColors(colors) {
        const rowsHtmlElements = colors.map(this.createRowHtmlElement);

        this.tbody.innerHTML = null;
        this.tbody.append(...rowsHtmlElements);


    }
}

export default ColorsTableComponent;