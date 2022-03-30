import { useState, useEffect } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import LOGO_IMG from '../../../assets/images/logo.png';
import GameTypeApi from '../../../api/gameType';
import GameApi from '../../../api/game';
import AddGame from './components/AddGame';
import { toast } from 'react-toastify';

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
			{/* <div className="row align-items-center add-list">
				<div className="col-6">
					<h4>Games</h4>
				</div>
				<div className="col-6 text-right">
					<a href={""} data-toggle="modal" data-target="#addGame" onClick={() => setSelectedGame(null)} className="btn btn-primary px-3">+ ADD GAME</a>
				</div>
			</div>
			<div className="row list-block"> */}
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
											{/* <form class="form-inline justify-content-end">
												<div class="form-group position-relative">
													<input type="text" class="form-control" placeholder="Search" />
													<i class="icon-search"></i>
												</div>
											</form> */}
											<a href={""} data-toggle="modal" data-target="#addGame" onClick={() => setSelectedGame(null)} className="btn btn-primary px-3">+ ADD GAME</a>
										</div>
									</div>
									<table class="table table-bordered">
										<thead>
											<tr>
												<th>#</th>
												<th>Name</th>
												<th>Address</th>
												<th>City</th>
												<th>Pin Code</th>
												<th>Country</th>
												<th width="140">Actions</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>1</td>
												<td>Thomas Hardy</td>
												<td>89 Chiaroscuuro Rd.</td>
												<td>Portland</td>
												<td>97219</td>
												<td>USA</td>
												<td class="text-center">
													<a href="javascript:void(0)" class="text-info mx-2"><i class="fa fa-eye"></i></a>
													<a href="javascript:void(0)" class="text-warning mx-2"><i class="fa fa-pencil"></i></a>
													<a href="javascript:void(0)" class="text-danger mx-2"><i class="fa fa-trash"></i></a>
												</td>
											</tr>
											<tr>
												<td>1</td>
												<td>Thomas Hardy</td>
												<td>89 Chiaroscuuro Rd.</td>
												<td>Portland</td>
												<td>97219</td>
												<td>USA</td>
												<td class="text-center">
													<a href="javascript:void(0)" class="text-info mx-2"><i class="fa fa-eye"></i></a>
													<a href="javascript:void(0)" class="text-warning mx-2"><i class="fa fa-pencil"></i></a>
													<a href="javascript:void(0)" class="text-danger mx-2"><i class="fa fa-trash"></i></a>
												</td>
											</tr>
											<tr>
												<td>1</td>
												<td>Thomas Hardy</td>
												<td>89 Chiaroscuuro Rd.</td>
												<td>Portland</td>
												<td>97219</td>
												<td>USA</td>
												<td class="text-center">
													<a href="javascript:void(0)" class="text-info mx-2"><i class="fa fa-eye"></i></a>
													<a href="javascript:void(0)" class="text-warning mx-2"><i class="fa fa-pencil"></i></a>
													<a href="javascript:void(0)" class="text-danger mx-2"><i class="fa fa-trash"></i></a>
												</td>
											</tr>
										</tbody>
									</table>

									<div class="row table-footer align-items-center">
										<div class="col-md-6">
											<p class="mb-0">Showing <strong> 5 </strong>  out of <strong>25</strong> entries</p>
										</div>
										<div class="col-md-6 text-right">
											<nav aria-label="...">
												<ul class="pagination justify-content-end">
													<li class="page-item disabled">
														<a class="page-link" href="#" tabindex="-1"><i class="fa fa-angle-left"></i></a>
													</li>
													<li class="page-item"><a class="page-link" href="#">1</a></li>
													<li class="page-item active">
														<a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
													</li>
													<li class="page-item"><a class="page-link" href="#">3</a></li>
													<li class="page-item"><a class="page-link" href="#">4</a></li>
													<li class="page-item">
														<a class="page-link" href="#"><i class="fa fa-angle-right"></i></a>
													</li>
												</ul>
											</nav>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</section>
			{/* {games?.map((game, key) => (
					<div key={key} className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
						<div className="card">
							<div className="card-body">
								<div className="media">
									<img className="pointer" src={LOGO_IMG} alt="Addons" />
									<div className="media-body">
										<h5 className="mt-0">Name: {game.name}</h5>
										<p className="mt-0">Game Type: {game?.gameTypeId?.name}</p>
										<p className="mt-0">Towns: {game.towns?.map(item => item['name'] + ", ")}</p>
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
				))} */}
			{/* </div>
			<AddGame selectedGame={selectedGame} setGames={setGames} games={games} gameTypes={gameTypes} /> */}
		</DashboardLayout>
	)
}

export default Games