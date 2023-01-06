const serverAddress = 'http://localhost:3000';

const getColors = async () => {
    const response = await fetch(`${serverAddress}/colors`);
    const colors = await response.json();

    return colors;
}

const deleteColors = async (id) => {
    const response = await fetch(`${serverAddress}/colors/${id}`, {
        method: 'DELETE'
    });
    const colors = await response.json();

    return colors;
}

const createColors = async (colorProps) => {
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

const ApiService = {
    getColors,
    deleteColors,
    createColors,
}
export default ApiService;
