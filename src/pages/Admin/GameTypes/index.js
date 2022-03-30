import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import LOGO_IMG from '../../../assets/images/logo.png';
import GameTypeApi from '../../../api/gameType';
import { toast } from 'react-toastify';
import AddGameType from './components/AddGameType';

function GameTypes() {
	const [gameTypes, setGameTypes] = useState([]);
	const [selectedGameType, setSelectedGameType] = useState(null);

	useEffect(() => {
		GameTypeApi.getGameTypes().then(res => {
			setGameTypes(res.data.data);
		}).catch(err => {
			toast.error("Problem while getting game types");
		});
	}, []);

	const deleteGameTypeHandler = (gameType) => {
		GameTypeApi.deleteGameType(gameType._id).then(res => {
			toast.success("Game Type deleted successfully");
			const tempGameTypes = JSON.parse(JSON.stringify(gameTypes));
			setGameTypes(tempGameTypes.filter(item => item._id !== gameType._id));
		}).catch(err => {
			toast.error("Problem while deleting the game type");
		});
	}
	return (
		<DashboardLayout>
			<div className="row align-items-center add-list">
				<div className="col-6">
					<h4>Game Types</h4>
				</div>
				<div className="col-6 text-right">
					<a href={""} data-toggle="modal" onClick={() => setSelectedGameType(null)} data-target="#addGameType" className="btn btn-primary px-3">+ ADD GAME TYPE</a>
				</div>
			</div>
			<div className="row list-block">
				{gameTypes?.map((gameType, key) => (
					<div key={key} className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
						<div className="card">
							<div className="card-body">
								<div className="media">
									<img className="pointer" src={LOGO_IMG} alt="Game Type" />
									<div className="media-body">
										<h5 className="mt-0">{gameType.name}</h5>
									</div>
								</div>
							</div>
							<div className="dropdown">
								<a href={""} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<span className="icon-dots"></span>
								</a>
								<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<a className="dropdown-item delete-item" href={""} onClick={(e) => { e.preventDefault(); deleteGameTypeHandler(gameType) }}>Delete</a>
									<a className="dropdown-item delete-item" style={{ backgroundColor: "#417EBF" }} href={""} onClick={(e) => { e.preventDefault(); setSelectedGameType(gameType) }} data-toggle="modal" data-target="#addGameType">Update</a>
								</div>
							</div>
						</div>
					</div>
				))}
				{gameTypes.length === 0 && (
					<p>No Game types added yet</p>
				)}
			</div>
			<AddGameType selectedGameType={selectedGameType} setGameTypes={setGameTypes} gameTypes={gameTypes} />
		</DashboardLayout>
	)
}

export default GameTypes