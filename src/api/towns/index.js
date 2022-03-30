import axios from '../../axios';
import { trackPromise } from 'react-promise-tracker';

const TownsApi = {
	createTown(data) {
		return trackPromise(axios.post(`/towns`, data))
	},
	getTowns() {
		return trackPromise(axios.get(`/towns`))
	},
	updateTown(id, data) {
		return trackPromise(axios.put(`/towns/${id}`, data))
	},
	deleteTown(id) {
		return trackPromise(axios.delete(`/towns/${id}`))
	},
}

export default TownsApi;