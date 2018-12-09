import axios from 'axios';
import { __await } from 'tslib';

export default class HTTP {
    public static GET(url: string, cb: () => void) {
        return new Promise<any>((resolve) => {
            axios
                .get(url)
                .then(response => {
                    console.log(response);
                    resolve(response.data)
                })
                .catch(error => {
                    console.log(error);
                    alert('An error occur code: ' + error)
                    resolve(null);
                })
                .finally(() => (cb()));
        });;
    }
    public static  async POST(url: string, data: any, cb: () => void, ) { 
        const config = {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json, utf-8',  
            }
          }
        return new Promise<any>((resolve) => {
            axios.post(url, JSON.stringify(data) , config)
                .then(response => {
                    // this.items = response.data.bpi;
                    console.log(response);
                    resolve(response.data)
                })
                .catch(error => {
                    console.log(error);
                    alert('An error occur code: ' + error)
                    resolve(null);
                    // this.errored = true;
                })
                .finally(() => (cb()));
        });
    }
}