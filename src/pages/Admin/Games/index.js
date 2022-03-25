import { useState, useEffect } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import LOGO_IMG from '../../../assets/images/logo.png';
import QuestApi from '../../../api/quests';
import GameApi from '../../../api/game';
import AddGame from './components/AddGame';
import { toast } from 'react-toastify';

function Games() {
	const [games, setGames] = useState([]);
	const [selectedGame, setSelectedGame] = useState(null);
	const [quests, setQuests] = useState([]);

	useEffect(() => {
		QuestApi.getQuests().then(res => {
			setQuests(res.data.data);
		}).catch(err => {
			toast.error("Problem while getting quests");
		});
		GameApi.getGames().then(res => {
			setGames(res.data.data);
		}).catch(err => {
			toast.error("Problem while getting games");
		});
	}, []);

	const deleteGameHandler = (game) => {
		GameApi.deleteGame(game._id).then(res => {
			toast.success("Game deleted successfully");
			const tempGames = JSON.parse(JSON.stringify(games));
			setGames(tempGames.filter(item => item._id !== game._id));
		}).catch(err => {
			toast.error("Problem while deleting the game");
		});
	}

	return (
		<DashboardLayout>
			<div className="row align-items-center add-list">
				<div className="col-6">
					<h4>Games</h4>
				</div>
				<div className="col-6 text-right">
					<a href={""} data-toggle="modal" data-target="#addGame" onClick={() => setSelectedGame(null)} className="btn btn-primary px-3">+ ADD GAME</a>
				</div>
			</div>
			<div className="row list-block">
				{games?.map((game, key) => (
					<div key={key} className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
						<div className="card">
							<div className="card-body">
								<div className="media">
									<img className="pointer" src={LOGO_IMG} alt="Addons" />
									<div className="media-body">
										<h5 className="mt-0">{game.name}</h5>
										<p className="mt-0">{game.questId.name}</p>
									</div>
								</div>
							</div>
							<div className="dropdown">
								<a href={""} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<span className="icon-dots"></span>
								</a>
								<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<a className="dropdown-item delete-item" href={""} onClick={(e) => { e.preventDefault(); deleteGameHandler(game) }}>Delete</a>
									<a className="dropdown-item delete-item" style={{ backgroundColor: "#417EBF" }} href={""} onClick={(e) => { e.preventDefault(); setSelectedGame(game) }} data-toggle="modal" data-target="#addGame">Update</a>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<AddGame selectedGame={selectedGame} setGames={setGames} games={games} quests={quests} />
		</DashboardLayout>
	)
}

export default Games