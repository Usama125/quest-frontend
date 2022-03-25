import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import LOGO_IMG from '../../../assets/images/logo.png';
import QuestApi from '../../../api/quests';
import CitiesApi from '../../../api/cities';
import { toast } from 'react-toastify';
import AddQuest from './components/AddQuest';

function Quests() {
	const [quests, setQuests] = useState([]);
	const [selectedQuest, setSelectedQuest] = useState(null);
	const [cities, setCities] = useState([]);

	useEffect(() => {
		CitiesApi.getCities().then(res => {
			setCities(res.data.data);
		}).catch(err => {
			toast.error("Problem while getting cities");
		});
		QuestApi.getQuests().then(res => {
			setQuests(res.data.data);
		}).catch(err => {
			toast.error("Problem while getting quests");
		});
	}, []);

	const deleteQuestHandler = (quest) => {
		QuestApi.deleteQuest(quest._id).then(res => {
			toast.success("Quest deleted successfully");
			const tempQuests = JSON.parse(JSON.stringify(quests));
			setQuests(tempQuests.filter(item => item._id !== quest._id));
		}).catch(err => {
			toast.error("Problem while deleting the quest");
		});
	}
	return (
		<DashboardLayout>
			<div className="row align-items-center add-list">
				<div className="col-6">
					<h4>Quests</h4>
				</div>
				<div className="col-6 text-right">
					<a href={""} data-toggle="modal" onClick={() => setSelectedQuest(null)} data-target="#addQuest" className="btn btn-primary px-3">+ ADD QUEST</a>
				</div>
			</div>
			<div className="row list-block">
				{quests?.map((quest, key) => (
					<div key={key} className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
						<div className="card">
							<div className="card-body">
								<div className="media">
									<img className="pointer" src={LOGO_IMG} alt="Addons" />
									<div className="media-body">
										<h5 className="mt-0">{quest.name}</h5>
										<p className="mt-0">{quest.cities?.map(item => item['name'] + ", ")}</p>
									</div>
								</div>
							</div>
							<div className="dropdown">
								<a href={""} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<span className="icon-dots"></span>
								</a>
								<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<a className="dropdown-item delete-item" href={""} onClick={(e) => { e.preventDefault(); deleteQuestHandler(quest) }}>Delete</a>
									<a className="dropdown-item delete-item" style={{ backgroundColor: "#417EBF" }} href={""} onClick={(e) => { e.preventDefault(); setSelectedQuest(quest) }} data-toggle="modal" data-target="#addQuest">Update</a>
								</div>
							</div>
						</div>
					</div>
				))}
				{quests.length === 0 && (
					<p>No Quests added yet</p>
				)}
			</div>
			<AddQuest selectedQuest={selectedQuest} setQuests={setQuests} quests={quests} />
		</DashboardLayout>
	)
}

export default Quests