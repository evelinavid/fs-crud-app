import ColorsTableComponent from "./components/colors-table-component.js";
import ApiService from "./services/api-service.js";
import AlertComponent from "./components/alert-component.js";
import ContainerComponent from "./components/container-component.js";

const rootHtmlElement = document.querySelector('#root')
let colorsTableComponent;
const alertComponent = new AlertComponent;
const containerComponent = new ContainerComponent;
containerComponent.addComponents(alertComponent)

rootHtmlElement.append(containerComponent.htmlElement);

const handleColorDelete = async (id) => {
    try{
        await ApiService.deleteColors(id);
        const colors = await ApiService.getColors();
        colorsTableComponent.renderColors(colors);
    }
    catch(error){
alertComponent.show(error.message)
    }
}


(async function initialize() {
    try {
        const colors = await ApiService.getColors();
        colorsTableComponent = new ColorsTableComponent(colors, handleColorDelete);
        containerComponent.addComponents(colorsTableComponent);
        colorsTableComponent.renderColors(colors);

        }
        catch (error) {
            alertComponent.show(error.message)
        }

    })()