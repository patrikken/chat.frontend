import axios from 'axios';

export default class HTTP {
    GET(url : string){
        return axios.get('url');
    }
    POST(url : string){
        return axios.post('url');
    }
}