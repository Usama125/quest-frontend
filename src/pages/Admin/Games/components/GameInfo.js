import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import GameApi from '../../../../api/game';
import DashboardLayout from '../../../../layout/DashboardLayout'

function GameInfo() {
	const { id } = useParams();
	const [game, setGame] = useState({});

	useEffect(() => {
		GameApi.getSingleGame(id).then(res => {
			setGame(res.data.data);
		}).catch(err => {
			toast.error("Problem while getting the game details");
		})
	}, []);

	return (
		<DashboardLayout>
			<div class="row align-items-center add-list">
				<div class="col-6">
					<h4>Game Details</h4>
				</div>
			</div>
			<div class="row doctor-profile">
				<div class="col-md-4">
					<div class="card profile-detail py-3">
						<div class="card-body">
							<div class="media">
								<div class="media-body">
									<h5 class="mt-3 mb-2" style={{ padding: '5px', border: '1px solid lightgray' }}>Name</h5>
									<p>{game?.name}</p>
									<h5 class="mt-3 mb-2" style={{ padding: '5px', border: '1px solid lightgray' }}>Game Type</h5>
									<p>{game?.gameTypeId?.name}</p>
									<h5 class="mt-3 mb-2" style={{ padding: '5px', border: '1px solid lightgray' }}>Available In</h5>
									<p>{game.towns?.map(item => item['name'] + ", ")}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-8">
					<div class="card">
						<div class="card-body">
							<div class="row align-items-center mb-4">
								<div class="col-md-6">
									<h4>Clues</h4>
								</div>
								<div class="col-md-6 text-right">
									<a href={""} data-toggle="modal" data-target="#addGame" className="btn btn-primary px-3">+ ADD CLUE</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	)
}

export default GameInfo