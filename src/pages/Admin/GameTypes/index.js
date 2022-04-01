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
			<section class="table-section">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="card">
								<div class="card-body">
									<div class="row align-items-center mb-4">
										<div class="col-md-6">
											<h4>Game Types</h4>
										</div>
										<div class="col-md-6 text-right">
											<button onClick={() => setSelectedGameType(null)} type="button" class="btn btn-primary px-3" data-toggle="modal" data-target="#addGameType">
												+ ADD GAME TYPE
											</button>
										</div>
									</div>
									<table class="table table-bordered">
										<thead>
											<tr>
												<th style={{ fontSize: '1rem' }}>#</th>
												<th style={{ fontSize: '1rem' }}>Name</th>
												<th style={{ fontSize: '1rem' }}>Actions</th>
											</tr>
										</thead>
										<tbody>
											{gameTypes?.map((gameType, index) => (
												<tr>
													<td style={{ fontSize: '0.9rem' }}>{index + 1}</td>
													<td style={{ fontSize: '0.9rem' }}>{gameType.name}</td>
													<td style={{ fontSize: '0.9rem' }} class="text-center">
														<a href="javascript:void(0)" class="text-warning mx-2" onClick={(e) => { e.preventDefault(); setSelectedGameType(gameType) }} data-toggle="modal" data-target="#addGameType"><i style={{ fontSize: '1.4rem' }} class="fa fa-pencil"></i></a>
														<a href="javascript:void(0)" class="text-danger mx-2" onClick={(e) => { e.preventDefault(); deleteGameTypeHandler(gameType) }}><i style={{ fontSize: '1.4rem' }} class="fa fa-trash"></i></a>
													</td>
												</tr>
											))}
											{gameTypes.length === 0 && (
												<tr>
													<td colSpan={3}>No Game Types Added Yet</td>
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
			<AddGameType selectedGameType={selectedGameType} setGameTypes={setGameTypes} gameTypes={gameTypes} />
		</DashboardLayout>
	)
}

export default GameTypes