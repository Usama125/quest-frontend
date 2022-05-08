import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import AddTown from './components/AddTown';
import TownsApi from '../../../api/towns';
import { toast } from 'react-toastify';
import SORT_ICON from '../../../assets/images/two-arrows.png';
import UP_ICON from '../../../assets/images/sort-up.png';
import DOWN_ICON from '../../../assets/images/caret-down.png';

function Town() {
	const [towns, setTowns] = useState([]);
	const [selectedTown, setSelectedTown] = useState(null);
	const [nameSorting, setNameSorting] = useState({ enabled: false, sort_type: "" });

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

	const onNameSortHandler = (sort_type) => {
		setNameSorting({
			sort_type: sort_type,
			enabled: true
		});

		if (sort_type === "DESC") {
			setTowns(towns.sort((a, b) => (a.name > b.name) ? 1 : -1))
		} else if (sort_type === "ASC") {
			setTowns(towns.sort((a, b) => (a.name < b.name) ? 1 : -1))
		}
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
											<button onClick={() => setSelectedTown(null)} type="button" class="btn btn-primary px-3" data-toggle="modal" data-target="#addTown">
												+ ADD TOWN
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
													Image
												</th>
												<th style={{ fontSize: '1rem' }} >Actions</th>
											</tr>
										</thead>
										<tbody>
											{towns?.map((town, index) => (
												<tr>
													<td style={{ fontSize: '0.9rem' }}>{index + 1}</td>
													<td style={{ fontSize: '0.9rem' }}>{town.name}</td>
													<td style={{ fontSize: '0.9rem' }}>
														{town?.url ? (<a href={town?.url} target="_blank"><img src={town?.url} style={{ width: '4rem', height: '3.5rem' }} /></a>) : "No Image"}
													</td>
													<td class="text-center">
														<a href="javascript:void(0)" class="text-warning mx-2" onClick={(e) => { e.preventDefault(); setSelectedTown(town) }} data-toggle="modal" data-target="#addTown"><i style={{ fontSize: '1.4rem' }} class="fa fa-pencil"></i></a>
														<a href="javascript:void(0)" class="text-danger mx-2" onClick={(e) => { e.preventDefault(); deleteTownHandler(town) }}><i style={{ fontSize: '1.4rem' }} class="fa fa-trash"></i></a>
													</td>
												</tr>
											))}
											{towns.length === 0 && (
												<tr>
													<td colSpan={3}>No Towns Added Yet</td>
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
			<AddTown selectedTown={selectedTown} setTowns={setTowns} towns={towns} />
		</DashboardLayout>
	)
}

export default Town