const serverAddress = 'http://localhost:3000';

const getColors = async () => {
    const response = await fetch(`${serverAddress}/colors`);
    const colors = await response.json();

    return colors;
}

const deleteColor = async (id) => {
    const response = await fetch(`${serverAddress}/colors/${id}`, {
        method: 'DELETE'
    });
    const colors = await response.json();

    return colors;
}

const createColor = async (colorProps) => {
    const response = await fetch(`${serverAddress}/colors`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(colorProps)
    });
    const colors = await response.json();

    return colors;
}

const updateColor = async (id, colorProps) => {
    const response = await fetch(`${serverAddress}/colors/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(colorProps)
    });
    const colors = await response.json();

    return colors;
}

const ApiService = {
    getColors,
    deleteColor,
    createColor,
    updateColor
}
export default ApiService;
