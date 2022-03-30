import axios from '../../axios';
import { trackPromise } from 'react-promise-tracker';

const GameApi = {
	createGame(data) {
		return trackPromise(axios.post(`/games`, data))
	},
	getGames() {
		return trackPromise(axios.get(`/games`))
	},
	getSingleGame(id) {
		return trackPromise(axios.get(`/games/${id}`))
	},
	updateGame(id, data) {
		return trackPromise(axios.put(`/games/${id}`, data))
	},
	deleteGame(id) {
		return trackPromise(axios.delete(`/games/${id}`))
	},
}

export default GameApi;