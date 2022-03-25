import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import LOGO_IMG from '../../../assets/images/logo.png';
import GamesApi from '../../../api/game';
import { toast } from 'react-toastify';
import ClueApi from '../../../api/clue';
import AddClue from './components/AddClue';

function Clues() {
	const [clues, setClues] = useState([]);
	const [selectedClue, setSelectedClue] = useState(null);
	const [games, setGames] = useState([]);

	useEffect(() => {
		GamesApi.getGames().then(res => {
			setGames(res.data.data);
		}).catch(err => {
			toast.error("Problem while getting games");
		});
		ClueApi.getClues().then(res => {
			setClues(res.data.data);
		}).catch(err => {
			toast.error("Problem while getting clues");
		});
	}, []);

	const deleteClueHandler = (clue) => {
		ClueApi.deleteClue(clue._id).then(res => {
			toast.success("Clue deleted successfully");
			const tempClues = JSON.parse(JSON.stringify(clues));
			setClues(tempClues.filter(item => item._id !== clue._id));
		}).catch(err => {
			toast.error("Problem while deleting the clue");
		});
	}
	return (
		<DashboardLayout>
			<div className="row align-items-center add-list">
				<div className="col-6">
					<h4>Clues</h4>
				</div>
				<div className="col-6 text-right">
					<a href={""} data-toggle="modal" onClick={() => setSelectedClue(null)} data-target="#addClue" className="btn btn-primary px-3">+ ADD CLUE</a>
				</div>
			</div>
			<div className="row list-block">
				{clues?.map((clue, key) => (
					<div key={key} className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
						<div className="card">
							<div className="card-body">
								<div className="media">
									<img className="pointer" src={clue.type === "IMAGE" ? clue?.url : LOGO_IMG} alt="Addons" />
									<div className="media-body">
										<h5 className="mt-0">{clue?.hint + " | " + clue?.type}</h5>
										<p className="mt-0">{clue?.gameId?.name}</p>
										<a href={clue.url} target="_blank">See Attached File</a>
									</div>
								</div>
							</div>
							<div className="dropdown">
								<a href={""} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<span className="icon-dots"></span>
								</a>
								<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<a className="dropdown-item delete-item" href={""} onClick={(e) => { e.preventDefault(); deleteClueHandler(clue) }}>Delete</a>
									<a className="dropdown-item delete-item" style={{ backgroundColor: "#417EBF" }} href={""} onClick={(e) => { e.preventDefault(); setSelectedClue(clue) }} data-toggle="modal" data-target="#addClue">Update</a>
								</div>
							</div>
						</div>
					</div>
				))}
				{clues.length === 0 && (
					<p>No Clues added yet</p>
				)}
			</div>
			<AddClue selectedClue={selectedClue} setClues={setClues} games={games} />
		</DashboardLayout>
	)
}

export default Clues