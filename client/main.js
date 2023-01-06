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
        await ApiService.deleteColor(id);
        colors = await ApiService.getColors();
        colorsTableComponent.renderColors(colors);
    }
    catch (error) {
        alertComponent.show(error.message)
    }
}

const handleColorCreate = async (colorProps) => {
    try {
        await ApiService.createColor(colorProps);
        colors = await ApiService.getColors();
        colorsTableComponent.renderColors(colors, editedRowId);

    }catch (error) {
        alertComponent.show(error.message)
    }
}
const handleColorUpdate = async (colorProps) => {
    try {
        await ApiService.updateColor(editedRowId, colorProps);
        colors = await ApiService.getColors();
        editedRowId = null;
        colorFormComponent.disableEditing();
        colorsTableComponent.renderColors(colors, editedRowId);
    }catch (error) {
        alertComponent.show(error.message)
    }
}

const handleColorEdit = (colorProps) => {
    if (editedRowId === colorProps.id) editedRowId = null;
    else editedRowId = colorProps.id;

    colorsTableComponent.renderColors(colors, editedRowId);
    if (editedRowId === null) {
        colorFormComponent.disableEditing();
        colorFormComponent.onSubmit = handleColorCreate;
    } else {
        colorFormComponent.enableEditing(colorProps);
        colorFormComponent.onSubmit = handleColorUpdate;
    }
}


(async function initialize() {
    try {
        colors = await ApiService.getColors();
        //                                                      dependency injection 2x
        colorsTableComponent = new ColorsTableComponent(colors, handleColorDelete, handleColorEdit);
        colorFormComponent = new ColorFormComponent(handleColorCreate);
        const flexContainerComponent = new FlexContainerComponent;
        flexContainerComponent.addComponents(colorsTableComponent, colorFormComponent)
        containerComponent.addComponents(flexContainerComponent);
        colorsTableComponent.renderColors(colors, editedRowId);

    }catch (error) {
        alertComponent.show(error.message)
    }

})()