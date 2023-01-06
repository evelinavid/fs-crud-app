class ColorFormComponent {
  htmlElement;
  onSubmit;
  nameInput;
  HEXcodeInput;
  availabilityInput;
  formNameElement;
  submitButton;

  constructor({ onSubmit }) {
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
          <input type="checkbox" class="form-check-input" id="availability" name="availability">
          <label class="form-check-label" for="availability">Pasiekiamas?</label>
        </div>
        <button type="submit" class="btn btn-success w-100">Pateikti</button>`;

    this.htmlElement.addEventListener('submit', this.handleSubmit);
    this.onSubmit = onSubmit;
    this.nameInput = this.htmlElement.querySelector('[name = name]')
    this.HEXcodeInput = this.htmlElement.querySelector('[name = HEXcode]')
    this.availabilityInput = this.htmlElement.querySelector('[name = availability]')
    this.formNameElement = this.htmlElement.querySelector('h2')
    this.submitButton = this.htmlElement.querySelector('button')

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

  enableEditing = ({ name, HEXcode, availability }) => {
    this.nameInput.value = name;
    this.HEXcodeInput.value = HEXcode;
    this.availabilityInput.checked = availability;

    this.formNameElement.innerText = 'Redaguoti spalvos duomenis';
    this.submitButton.innerText = 'Redaguoti';
    this.submitButton.className = 'btn btn-warning w-100';
  }

  disableEditing = () => {
    this.htmlElement.reset();
    this.formNameElement.innerText = 'Įvesti spalvos duomenis';
    this.submitButton.innerText = 'Pateikti';
    this.submitButton.className = 'btn btn-success w-100';
  }

  updateSubmitHandler = (onSubmit) => {

  }
}
export default ColorFormComponent;