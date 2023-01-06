import ColorsTableComponent from "./components/colors-table-component.js";
import ApiService from "./services/api-service.js";
import AlertComponent from "./components/alert-component.js";
import ContainerComponent from "./components/container-component.js";
import ColorFormComponent from "./components/color-form-component.js";
import FlexContainerComponent from "./components/flex-container-component.js";

const rootHtmlElement = document.querySelector('#root')

let colorsTableComponent;
let colorFormComponent;
let editedRowId = null;
let colors;
const alertComponent = new AlertComponent;
const containerComponent = new ContainerComponent;
containerComponent.addComponents(alertComponent)

rootHtmlElement.append(containerComponent.htmlElement);

const handleColorDelete = async (id) => {
    try {
        await ApiService.deleteColors(id);
        colors = await ApiService.getColors();
        colorsTableComponent.renderColors(colors);
    }
    catch (error) {
        alertComponent.show(error.message)
    }
}

const handleColorCreate = async (colorProps) => {
    try {
        await ApiService.createColors(colorProps);
        colors = await ApiService.getColors();
        colorsTableComponent.renderColors(colors, editedRowId);
    }
    catch (error) {
        alertComponent.show(error.message)
    }
}

const handleColorEdit = (color) => {
    if (editedRowId === color.id) editedRowId = null;
    else editedRowId = color.id;
    colorsTableComponent.renderColors(colors, editedRowId)
}


(async function initialize() {
    try {
        colors = await ApiService.getColors();
        // dependency injection 2x
        colorsTableComponent = new ColorsTableComponent(colors, handleColorDelete, handleColorEdit);
        colorFormComponent = new ColorFormComponent(handleColorCreate);
        const flexContainerComponent = new FlexContainerComponent;
        flexContainerComponent.addComponents(colorsTableComponent, colorFormComponent)
        containerComponent.addComponents(flexContainerComponent);
        colorsTableComponent.renderColors(colors, editedRowId);

    }
    catch (error) {
        alertComponent.show(error.message)
    }

})()