import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import ClueApi from '../../../../api/clue';
import GameApi from '../../../../api/game';
import DashboardLayout from '../../../../layout/DashboardLayout'
import AddClue from './AddClue';

function GameInfo() {
	const { id } = useParams();
	const [game, setGame] = useState({});
	const [clues, setClues] = useState([]);
	const [selectedClue, setSelectedClue] = useState(null);

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
											<p>{game?.introduction}</p>
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
							<div class="row align-items-center mb-4">
								<div className='container'>
									<div className='row'>
										<div className='col-md-6'>
											<h2>Clues</h2>
										</div>
										<div class="col-md-6">
											<button style={{ marginBottom: "1rem", float: 'right' }} onClick={() => setSelectedClue(null)} type="button" class="btn btn-primary px-3" data-toggle="modal" data-target="#addClue">
												+ ADD CLUE
											</button>
										</div>
									</div>
								</div>
								<div className='container'>
									{clues.length === 0 && (
										<p>No Clues Added Yet.</p>
									)}
									{clues?.map(clue => (
										<div className='row'>
											<div className='col-md-12'>
												<div class="card lab-result mb-2">
													<div class="card-body">
														<h5>{clue.name + " "}
															<span>
																<a href={null} class="text-warning mx-2" onClick={(e) => { e.preventDefault(); setSelectedClue(clue) }} data-toggle="modal" data-target="#addClue"><i class="fa fa-pencil"></i></a>
																<a href="javascript:void(0)" class="text-danger mx-2" onClick={(e) => { e.preventDefault(); deleteClueHandler(clue) }}><i class="fa fa-trash"></i></a>
															</span>
														</h5>
														<hr />
														<p style={{ fontWeight: 'bold', fontSize: "1.1rem" }}>Hint 1</p>
														<p style={{ marginTop: '-10px' }}>{clue?.hint_1}</p>
														<p style={{ fontWeight: 'bold', fontSize: "1.1rem" }}>Hint 2</p>
														<p style={{ marginTop: '-10px' }}>{clue?.hint_2}</p>
														<p style={{ fontWeight: 'bold', fontSize: "1.1rem" }}>Clue Text</p>
														<p style={{ marginTop: '-10px' }}>{clue?.text}</p>
														<p style={{ fontWeight: 'bold', fontSize: "1.1rem" }}>Clue Type</p>
														<p style={{ marginTop: '-10px' }}>{clue?.type}</p>
														{clue.type !== "TEXT" && (
															<>
																<p style={{ fontWeight: 'bold', fontSize: "1.1rem", marginBottom: '5px' }}>Clue File</p>
																<a href={clue?.url} target="_blank" style={{ marginTop: '-10px' }}>See Attached File</a>
															</>
														)}
														<p style={{ fontWeight: 'bold', fontSize: "1.1rem", marginTop: '10px' }}>Clue Answere</p>
														<p style={{ marginTop: '-10px' }}>{clue?.ans}</p>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
			<AddClue setClues={setClues} selectedClue={selectedClue} />
		</DashboardLayout>
	)
}

export default GameInfo