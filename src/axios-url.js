import axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'https://icreate-3ce57-default-rtdb.firebaseio.com/',
        // headers: {
        //     get: {
        //         cacheControl: {
        //             maximumAge: 31536000
        //         }
        //     }
        // }
    }
)

export default instance;