const serverAddress = 'http://localhost:3000';

const getColors = async () =>{
    const response = await fetch(`${serverAddress}/colors`);
    const colors = await response.json();

    return colors;
}

const deleteColors = async (id) =>{
    const response = await fetch(`${serverAddress}/colors/${id}`,{
    method: 'DELETE'});
    const colors = await response.json();

    return colors;
}
const ApiService = {
    getColors,
    deleteColors
}
export default ApiService;
