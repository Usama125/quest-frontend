import axios from '../../axios';
import { trackPromise } from 'react-promise-tracker';

const GameTypeApi = {
	createGameType(data) {
		return trackPromise(axios.post(`/game-types`, data))
	},
	getGameTypes() {
		return trackPromise(axios.get(`/game-types`))
	},
	updateGameType(id, data) {
		return trackPromise(axios.put(`/game-types/${id}`, data))
	},
	deleteGameType(id) {
		return trackPromise(axios.delete(`/game-types/${id}`))
	},
}

export default GameTypeApi;