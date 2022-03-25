import axios from '../../axios';
import { trackPromise } from 'react-promise-tracker';

const CitiesApi = {
	createCity(data) {
		return trackPromise(axios.post(`/cities`, data))
	},
	getCities() {
		return trackPromise(axios.get(`/cities`))
	},
	updateCities(id, data) {
		return trackPromise(axios.put(`/cities/${id}`, data))
	},
	deleteCity(id) {
		return trackPromise(axios.delete(`/cities/${id}`))
	},
}

export default CitiesApi;