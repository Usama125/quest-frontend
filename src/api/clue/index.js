import axios from '../../axios';
import { trackPromise } from 'react-promise-tracker';

const ClueApi = {
	createClue(data) {
		return trackPromise(axios.post(`/clues`, data))
	},
	getGameClues(gameId) {
		return trackPromise(axios.get(`/clues/${gameId}`))
	},
	updateClue(id, data) {
		return trackPromise(axios.put(`/clues/${id}`, data))
	},
	deleteClue(id) {
		return trackPromise(axios.delete(`/clues/${id}`))
	},
	getSingleClue(id) {
		return trackPromise(axios.get(`/clues/getSingle/${id}`));
	},
	deleteClueFile(clueId, fileId) {
		return trackPromise(axios.delete(`/clues/deleteClueFile/${clueId}/${fileId}`))
	}
}

export default ClueApi;