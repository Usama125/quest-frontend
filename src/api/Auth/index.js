import axios from '../../axios';
import { trackPromise } from 'react-promise-tracker';

const AuthApi = {
    login(credentials) {
        return trackPromise(axios.post(`/users/login`, credentials))
    },
    register(formData) {
        return trackPromise(axios.post(`/users`, formData));
    },
}

export default AuthApi;