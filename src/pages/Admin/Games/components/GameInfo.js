import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import ClueApi from '../../../../api/clue';
import GameApi from '../../../../api/game';
import DashboardLayout from '../../../../layout/DashboardLayout'
import AddClue from './AddClue';
import ExtendedClues from './ExtendedClues';
import StandardClues from './StandardClues';

function GameInfo() {
	const { id } = useParams();
	const [game, setGame] = useState({});
	const [clues, setClues] = useState([]);
	const [selectedClue, setSelectedClue] = useState(null);
	const [tabSelected, setTabSelected] = useState("Standard")

	useEffect(() => {
		GameApi.getSingleGame(id).then(res => {
			setGame(res.data.data);
		}).catch(err => {
			toast.error("Problem while getting the game details");
		});
		ClueApi.getGameClues(id).then(res => {
			setClues(res.data.data);
		})
	}, []);

	const deleteClueHandler = (clue) => {
		ClueApi.deleteClue(clue._id).then(res => {
			const tempClues = JSON.parse(JSON.stringify(clues));
			setClues(tempClues.filter(cl => cl._id !== clue._id));
			toast.success("Clue deleted successfully");
		})
	}

	return (
		<DashboardLayout>
			<div class="row align-items-center add-list">
				<div class="col-6">
					<h4>Game Details</h4>
				</div>
			</div>
			<div class="row doctor-profile">
				<div class="col-md-12">
					<div class="card profile-detail py-3">
						<div class="card-body">
							<div class="media">
								<div class="media-body">
									<div className='row'>
										<div className='col-md-6'>
											<h5 class="mt-3 mb-3" style={{ padding: '5px', border: '1px solid lightgray' }}>Name</h5>
											<p>{game?.name}</p>
										</div>
										<div className='col-md-6'>
											<h5 class="mt-3 mb-2" style={{ padding: '5px', border: '1px solid lightgray' }}>Game Type</h5>
											<p>{game?.gameTypeId?.name}</p>
										</div>
										<div className='col-md-6'>
											<h5 class="mt-3 mb-2" style={{ padding: '5px', border: '1px solid lightgray' }}>Available In</h5>
											<p>{game.towns?.map((item, index) => game.towns.length - 1 === index ? item['name'] : item['name'] + ", ")}</p>
										</div>
										<div className='col-md-6'>
											<h5 class="mt-3 mb-2" style={{ padding: '5px', border: '1px solid lightgray' }}>Duration</h5>
											<p>{game.duration + " " + game.durationType}</p>
										</div>
										<div className='col-md-12'>
											<h5 class="mt-3 mb-2" style={{ padding: '5px', border: '1px solid lightgray' }}>Introduction</h5>
											<div dangerouslySetInnerHTML={{ __html: game?.introduction }}></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-12">
					<div class="card">
						<div class="card-body">
							<section class="table-section">
								<div class="container">
									<div class="row">
										<div class="col-md-12">
											<div class="card">
												<div class="card-body">
													<div class="row align-items-center mb-4">
														<div class="col-md-6">
															<h4>Clues</h4>
														</div>
														<div class="col-md-6 text-right">
															<button style={{ marginBottom: "1rem", float: 'right' }} onClick={() => setSelectedClue(null)} type="button" class="btn btn-primary px-3" data-toggle="modal" data-target="#addClue">
																+ ADD CLUE
															</button>
														</div>
													</div>
													<div className="row nav-tab-link">
														<div className="col-md-12">
															<ul className="nav justify-content-center">
																<li className="nav-item">
																	<a className={classNames('nav-link', { 'active': tabSelected === "Standard" })} href={""} onClick={(e) => { e.preventDefault(); setTabSelected("Standard") }}>Standard</a>
																</li>
																<li className="nav-item">
																	<a className={classNames('nav-link', { 'active': tabSelected === "Extended" })} href={""} onClick={(e) => { e.preventDefault(); setTabSelected("Extended") }}>Extended</a>
																</li>
															</ul>
														</div>
													</div>
													{tabSelected === "Standard" ? (
														<StandardClues clues={clues.filter(clue => clue?.clue_type === "STANDARD")} setSelectedClue={setSelectedClue} deleteClueHandler={deleteClueHandler} />
													) : (
														<ExtendedClues clues={clues.filter(clue => clue?.clue_type === "EXTENDED")} setSelectedClue={setSelectedClue} deleteClueHandler={deleteClueHandler} />
													)}
												</div>
											</div>
										</div>
									</div>

								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
			<AddClue gameName={game?.name} setClues={setClues} setSelectedClue={setSelectedClue} selectedClue={selectedClue} />
		</DashboardLayout>
	)
}

export default GameInfo