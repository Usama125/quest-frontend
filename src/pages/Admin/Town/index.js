import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import AddTown from './components/AddTown';
import TownsApi from '../../../api/towns';
import { toast } from 'react-toastify';

function Town() {
	const [towns, setTowns] = useState([]);
	const [selectedTown, setSelectedTown] = useState(null);

	useEffect(() => {
		TownsApi.getTowns().then(res => {
			setTowns(res.data.data);
		}).catch(err => {
			toast.error("Problem while getting towns");
		})
	}, []);

	const deleteTownHandler = (town) => {
		TownsApi.deleteTown(town._id).then(res => {
			toast.success("Town deleted successfully");
			const tempTowns = JSON.parse(JSON.stringify(towns));
			setTowns(tempTowns.filter(item => item._id !== town._id));
		}).catch(err => {
			toast.error("Problem while deleting the town");
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
											<h4>Towns</h4>
										</div>
										<div class="col-md-6 text-right">
											<a href={""} onClick={() => setSelectedTown(null)} data-toggle="modal" data-target="#addTown" className="btn btn-primary px-3">+ ADD TOWN</a>
										</div>
									</div>
									<table class="table table-bordered">
										<thead>
											<tr>
												<th style={{ fontSize: '1rem' }}>#</th>
												<th style={{ fontSize: '1rem' }}>Name</th>
												<th style={{ fontSize: '1rem' }} >Actions</th>
											</tr>
										</thead>
										<tbody>
											{towns?.map((town, index) => (
												<tr>
													<td style={{ fontSize: '0.9rem' }}>{index + 1}</td>
													<td style={{ fontSize: '0.9rem' }}>{town.name}</td>
													<td class="text-center">
														<a href="javascript:void(0)" class="text-warning mx-2" onClick={(e) => { e.preventDefault(); setSelectedTown(town) }} data-toggle="modal" data-target="#addTown"><i style={{ fontSize: '1.4rem' }} class="fa fa-pencil"></i></a>
														<a href="javascript:void(0)" class="text-danger mx-2" onClick={(e) => { e.preventDefault(); deleteTownHandler(town) }}><i style={{ fontSize: '1.4rem' }} class="fa fa-trash"></i></a>
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
			<AddTown selectedTown={selectedTown} setTowns={setTowns} towns={towns} />
		</DashboardLayout>
	)
}

export default Town