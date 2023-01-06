class ColorFormComponent {
    htmlElement;
    onSubmit;
    constructor(onSubmit) {
        this.htmlElement = document.createElement('form');
        this.htmlElement.className = "shadow p-3";
        this.htmlElement.innerHTML = `     
        <h2 class="h5  text-center">Įvesti spalvos duomenis</h2>
        <div class="mb-3">
          <label for="name" class="form-label">Spalvos pavadinimas</label>
          <input type="text" class="form-control" id="name" name="name">
        </div>
        <div class="mb-3">
          <label for="HEXcode" class="form-label">Spalvos HEX kodas</label>
          <input type="text" class="form-control" id="HEXcode" name="HEXcode">
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="availability" name="availability", value="true">
          <label class="form-check-label" for="availability">Pasiekiamas?</label>
        </div>
        <button type="submit" class="btn btn-primary">Pateikti</button>`;

        this.htmlElement.addEventListener('submit', this.handleSubmit);
        this.onSubmit = onSubmit;

    }
    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const values = {
            name: formData.get('name'),
            HEXcode: formData.get('HEXcode'),
            availability: Boolean(formData.get('availability')),
        }
        //inversion of control
        this.onSubmit(values);
        event.target.reset();
    }
}
export default ColorFormComponent;