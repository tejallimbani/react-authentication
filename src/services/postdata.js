import Axios from "axios";

export default function PostData(type, userData) {

    let BaseUrl = 'http://127.0.0.1:8000/api/';

    if(type === 'register'){
        return new Promise((resolve, reject) => {
            Axios.post(BaseUrl+type, {
                name: userData.name,
                email: userData.email,
                password: userData.password
            })
            .then(function(response) {
                resolve(response);
            })
            .catch(function(error) {
                reject(error);
            })
        });
    }

    if(type === 'login') {
        return new Promise((resolve, reject) => {
            Axios.post(BaseUrl+type, {
                email: userData.email,
                password: userData.password
            })
            .then(function(response) {
                localStorage.setItem('userToken', response.data.token);
                console.log(response);
                resolve(response);
            })
            .catch(function(error) {
                reject(error);
            })
        });
    }
    
}