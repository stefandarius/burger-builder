import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-41d09.firebaseio.com/'
});

export default instance;