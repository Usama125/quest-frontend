import axios from '../../axios';
import { trackPromise } from 'react-promise-tracker';

const QuestApi = {
	createQuest(data) {
		return trackPromise(axios.post(`/quests`, data))
	},
	getQuests() {
		return trackPromise(axios.get(`/quests`))
	},
	updateQuests(id, data) {
		return trackPromise(axios.put(`/quests/${id}`, data))
	},
	deleteQuest(id) {
		return trackPromise(axios.delete(`/quests/${id}`))
	},
}

export default QuestApi;