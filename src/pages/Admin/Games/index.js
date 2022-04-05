import { useState, useEffect } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import LOGO_IMG from '../../../assets/images/logo.png';
import GameTypeApi from '../../../api/gameType';
import GameApi from '../../../api/game';
import AddGame from './components/AddGame';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import SORT_ICON from '../../../assets/images/two-arrows.png';
import UP_ICON from '../../../assets/images/sort-up.png';
import DOWN_ICON from '../../../assets/images/caret-down.png';

function Games() {
	const [games, setGames] = useState([]);
	const [selectedGame, setSelectedGame] = useState(null);
	const [gameTypes, setGameTypes] = useState([]);
	const [nameSorting, setNameSorting] = useState({ enabled: false, sort_type: "" });
	const [typeSorting, setTypeSorting] = useState({ enabled: false, sort_type: "" });
	const [townSorting, setTownSorting] = useState({ enabled: false, sort_type: "" });
	const [publishSorting, setPublishSorting] = useState({ enabled: false, sort_type: "" });

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

	const onNameSortHandler = (sort_type) => {
		setNameSorting({
			sort_type: sort_type,
			enabled: true
		});
		setTypeSorting({ enabled: false, sort_type: "" })
		setTownSorting({ enabled: false, sort_type: "" })
		if (sort_type === "DESC") {
			setGames(games.sort((a, b) => (a.name > b.name) ? 1 : -1))
		} else if (sort_type === "ASC") {
			setGames(games.sort((a, b) => (a.name < b.name) ? 1 : -1))
		}
	}

	const onTypeSortHandler = (sort_type) => {
		setTypeSorting({
			sort_type: sort_type,
			enabled: true
		});
		setNameSorting({ enabled: false, sort_type: "" })
		setTownSorting({ enabled: false, sort_type: "" })
		setPublishSorting({ enabled: false, sort_type: "" })
		if (sort_type === "DESC") {
			setGames(games.sort((a, b) => (a.gameTypeId.name > b.gameTypeId.name) ? 1 : -1))
		} else if (sort_type === "ASC") {
			setGames(games.sort((a, b) => (a.gameTypeId.name < b.gameTypeId.name) ? 1 : -1))
		}
	}

	const onTownSortHandler = (sort_type) => {
		setTownSorting({
			sort_type: sort_type,
			enabled: true
		});
		setNameSorting({ enabled: false, sort_type: "" })
		setTypeSorting({ enabled: false, sort_type: "" })
		setPublishSorting({ enabled: false, sort_type: "" })
		if (sort_type === "DESC") {
			setGames(games.sort((a, b) => (a.towns[0].name > b.towns[0].name) ? 1 : -1))
		} else if (sort_type === "ASC") {
			setGames(games.sort((a, b) => (a.towns[0].name < b.towns[0].name) ? 1 : -1))
		}
	}

	const onPublishSortHandler = (sort_type) => {
		setPublishSorting({
			sort_type: sort_type,
			enabled: true
		});
		setNameSorting({ enabled: false, sort_type: "" })
		setTypeSorting({ enabled: false, sort_type: "" })
		setTownSorting({ enabled: false, sort_type: "" })
		if (sort_type === "DESC") {
			setGames(games.sort((a, b) => (a.published > b.published) ? 1 : -1))
		} else if (sort_type === "ASC") {
			setGames(games.sort((a, b) => (a.published < b.published) ? 1 : -1))
		}
	}

	const publishedChangeHandler = (game) => {
		GameApi.updateGame(game._id, { ...game, published: !game.published }).then(res => {
			setGames(res.data.data);
			toast.success("Game status updated successfully");
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
											<button onClick={(e) => setSelectedGame(null)} type="button" class="btn btn-primary px-3" data-toggle="modal" data-target="#addGame">
												+ ADD GAME
											</button>
										</div>
									</div>
									<table class="table table-bordered">
										<thead>
											<tr>
												<th style={{ fontSize: '1rem' }}>#</th>
												<th style={{ fontSize: '1rem' }}>
													Name
													{!nameSorting.enabled && nameSorting.sort_type === "" && (
														<img style={{ cursor: 'pointer', paddingLeft: '0.4rem' }} src={SORT_ICON} onClick={onNameSortHandler.bind(this, "DESC")} />
													)}
													{nameSorting.enabled && nameSorting.sort_type === "DESC" && (
														<img style={{ cursor: 'pointer', paddingLeft: '0.4rem', width: '1.2rem' }} src={DOWN_ICON} onClick={onNameSortHandler.bind(this, "ASC")} />
													)}
													{nameSorting.enabled && nameSorting.sort_type === "ASC" && (
														<img style={{ cursor: 'pointer', paddingLeft: '0.4rem', width: '1.2rem' }} src={UP_ICON} onClick={onNameSortHandler.bind(this, "DESC")} />
													)}
												</th>
												<th style={{ fontSize: '1rem' }}>
													Type
													{!typeSorting.enabled && typeSorting.sort_type === "" && (
														<img style={{ cursor: 'pointer', paddingLeft: '0.4rem' }} src={SORT_ICON} onClick={onTypeSortHandler.bind(this, "DESC")} />
													)}
													{typeSorting.enabled && typeSorting.sort_type === "DESC" && (
														<img style={{ cursor: 'pointer', paddingLeft: '0.4rem', width: '1.2rem' }} src={DOWN_ICON} onClick={onTypeSortHandler.bind(this, "ASC")} />
													)}
													{typeSorting.enabled && typeSorting.sort_type === "ASC" && (
														<img style={{ cursor: 'pointer', paddingLeft: '0.4rem', width: '1.2rem' }} src={UP_ICON} onClick={onTypeSortHandler.bind(this, "DESC")} />
													)}
												</th>
												<th style={{ fontSize: '1rem' }}>
													Towns
													{!townSorting.enabled && townSorting.sort_type === "" && (
														<img style={{ cursor: 'pointer', paddingLeft: '0.4rem' }} src={SORT_ICON} onClick={onTownSortHandler.bind(this, "DESC")} />
													)}
													{townSorting.enabled && townSorting.sort_type === "DESC" && (
														<img style={{ cursor: 'pointer', paddingLeft: '0.4rem', width: '1.2rem' }} src={DOWN_ICON} onClick={onTownSortHandler.bind(this, "ASC")} />
													)}
													{townSorting.enabled && townSorting.sort_type === "ASC" && (
														<img style={{ cursor: 'pointer', paddingLeft: '0.4rem', width: '1.2rem' }} src={UP_ICON} onClick={onTownSortHandler.bind(this, "DESC")} />
													)}
												</th>
												<th style={{ fontSize: '1rem' }}>
													Published
													{!publishSorting.enabled && publishSorting.sort_type === "" && (
														<img style={{ cursor: 'pointer', paddingLeft: '0.4rem' }} src={SORT_ICON} onClick={onPublishSortHandler.bind(this, "DESC")} />
													)}
													{publishSorting.enabled && publishSorting.sort_type === "DESC" && (
														<img style={{ cursor: 'pointer', paddingLeft: '0.4rem', width: '1.2rem' }} src={DOWN_ICON} onClick={onPublishSortHandler.bind(this, "ASC")} />
													)}
													{publishSorting.enabled && publishSorting.sort_type === "ASC" && (
														<img style={{ cursor: 'pointer', paddingLeft: '0.4rem', width: '1.2rem' }} src={UP_ICON} onClick={onPublishSortHandler.bind(this, "DESC")} />
													)}
												</th>
												<th style={{ fontSize: '1rem' }}>Actions</th>
											</tr>
										</thead>
										<tbody>
											{games?.map((game, index) => (
												<tr>
													<td style={{ fontSize: '0.9rem' }}>{index + 1}</td>
													<td style={{ fontSize: '0.9rem' }}>{game.name}</td>
													<td style={{ fontSize: '0.9rem' }}>{game?.gameTypeId?.name}</td>
													<td style={{ fontSize: '0.9rem' }}>{game.towns?.map((item, index) => game.towns.length - 1 === index ? item['name'] : item['name'] + ", ")}</td>
													<td style={{ fontSize: '0.9rem' }}>
														{game?.published ? "YES" : "NO"}
														<span>
															<input onChange={publishedChangeHandler.bind(this, game)} checked={game?.published} type="checkbox" style={{ transform: 'scale(1.7)', marginLeft: "1rem" }} />
														</span>
													</td>
													<td class="text-center">
														<Link to={`game/${game._id}`} class="text-info mx-2"><i style={{ fontSize: '1.4rem' }} class="fa fa-eye"></i></Link>
														<a href="javascript:void(0)" class="text-warning mx-2" onClick={(e) => { e.preventDefault(); setSelectedGame(game) }} data-toggle="modal" data-target="#addGame"><i style={{ fontSize: '1.4rem' }} class="fa fa-pencil"></i></a>
														<a href="javascript:void(0)" class="text-danger mx-2" onClick={(e) => { e.preventDefault(); deleteGameHandler(game) }}><i style={{ fontSize: '1.4rem' }} class="fa fa-trash"></i></a>
													</td>
												</tr>
											))}
											{games.length === 0 && (
												<tr>
													<td colSpan={3}>No Games Added Yet</td>
												</tr>
											)}
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