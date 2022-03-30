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
			<div className="row align-items-center add-list">
				<div className="col-6">
					<h4>Towns</h4>
				</div>
				<div className="col-6 text-right">
					<a href={""} onClick={() => setSelectedTown(null)} data-toggle="modal" data-target="#addTown" className="btn btn-primary px-3">+ ADD TOWN</a>
				</div>
			</div>
			<div className="row list-block">
				{towns?.map((town, key) => (
					<div key={key} className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
						<div className="card">
							<div className="card-body">

								{/* <img className="pointer" src={LOGO_IMG} alt="Addons" /> */}
								<div className="media-body">
									<h5 className="mt-0">{town.name}</h5>
								</div>
							</div>
							<div className="dropdown">
								<a href={""} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<span className="icon-dots"></span>
								</a>
								<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<a className="dropdown-item delete-item" href={""} onClick={(e) => { e.preventDefault(); deleteTownHandler(town) }}>Delete</a>
									<a className="dropdown-item delete-item" style={{ backgroundColor: "#417EBF" }} href={""} onClick={(e) => { e.preventDefault(); setSelectedTown(town) }} data-toggle="modal" data-target="#addTown">Update</a>
								</div>
							</div>
						</div>
					</div>
				))}
				{towns.length === 0 && (
					<p>No towns added yet</p>
				)}
			</div>
			<AddTown selectedTown={selectedTown} setTowns={setTowns} towns={towns} />
		</DashboardLayout>
	)
}

export default Town