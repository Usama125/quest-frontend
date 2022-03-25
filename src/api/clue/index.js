import axios from '../../axios';
import { trackPromise } from 'react-promise-tracker';

const ClueApi = {
	createClue(data) {
		return trackPromise(axios.post(`/clues`, data))
	},
	getClues() {
		return trackPromise(axios.get(`/clues`))
	},
	updateClue(id, data) {
		return trackPromise(axios.put(`/clues/${id}`, data))
	},
	deleteClue(id) {
		return trackPromise(axios.delete(`/clues/${id}`))
	},
}

export default ClueApi;