import { useState, useEffect } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import LOGO_IMG from '../../../assets/images/logo.png';
import GameTypeApi from '../../../api/gameType';
import GameApi from '../../../api/game';
import AddGame from './components/AddGame';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Games() {
	const [games, setGames] = useState([]);
	const [selectedGame, setSelectedGame] = useState(null);
	const [gameTypes, setGameTypes] = useState([]);

	useEffect(() => {
		GameTypeApi.getGameTypes().then(res => {
			setGameTypes(res.data.data);
		}).catch(err => {
			toast.error("Problem while getting game types");
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
			<section class="table-section">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="card">
								<div class="card-body">
									<div class="row align-items-center mb-4">
										<div class="col-md-6">
											<h4>Games</h4>
										</div>
										<div class="col-md-6 text-right">
											<a href={""} data-toggle="modal" data-target="#addGame" onClick={() => setSelectedGame(null)} className="btn btn-primary px-3">+ ADD GAME</a>
										</div>
									</div>
									<table class="table table-bordered">
										<thead>
											<tr>
												<th>#</th>
												<th>Name</th>
												<th>Type</th>
												<th>Towns</th>
												<th width="140">Actions</th>
											</tr>
										</thead>
										<tbody>
											{games?.map((game, index) => (
												<tr>
													<td>{index + 1}</td>
													<td>{game.name}</td>
													<td>{game?.gameTypeId?.name}</td>
													<td>{game.towns?.map(item => item['name'] + ", ")}</td>
													<td class="text-center">
														<Link to={`game/${game._id}`} class="text-info mx-2"><i class="fa fa-eye"></i></Link>
														<a href="javascript:void(0)" class="text-warning mx-2" onClick={(e) => { e.preventDefault(); setSelectedGame(game) }} data-toggle="modal" data-target="#addGame"><i class="fa fa-pencil"></i></a>
														<a href="javascript:void(0)" class="text-danger mx-2" onClick={(e) => { e.preventDefault(); deleteGameHandler(game) }}><i class="fa fa-trash"></i></a>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

				</div>
			</section>
			<AddGame selectedGame={selectedGame} setGames={setGames} games={games} gameTypes={gameTypes} />
		</DashboardLayout>
	)
}

export default Games