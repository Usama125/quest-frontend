import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import LOGO_IMG from '../../../assets/images/logo.png';
import AddCity from './components/AddCity';
import CitiesApi from '../../../api/cities';
import { toast } from 'react-toastify';

function City() {
	const [cities, setCities] = useState([]);
	const [selectedCity, setSelectedCity] = useState(null);

	useEffect(() => {
		CitiesApi.getCities().then(res => {
			setCities(res.data.data);
		}).catch(err => {
			toast.error("Problem while getting cities");
		})
	}, []);

	const deleteCityHandler = (city) => {
		CitiesApi.deleteCity(city._id).then(res => {
			toast.success("City deleted successfully");
			const tempCities = JSON.parse(JSON.stringify(cities));
			setCities(tempCities.filter(item => item._id !== city._id));
		}).catch(err => {
			toast.error("Problem while deleting the city");
		});
	}

	return (
		<DashboardLayout>
			<div className="row align-items-center add-list">
				<div className="col-6">
					<h4>Cities</h4>
				</div>
				<div className="col-6 text-right">
					<a href={""} onClick={() => setSelectedCity(null)} data-toggle="modal" data-target="#addCity" className="btn btn-primary px-3">+ ADD CITY</a>
				</div>
			</div>
			<div className="row list-block">
				{cities?.map((city, key) => (
					<div key={key} className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
						<div className="card">
							<div className="card-body">

								{/* <img className="pointer" src={LOGO_IMG} alt="Addons" /> */}
								<div className="media-body">
									<h5 className="mt-0">{city.name}</h5>
								</div>
							</div>
							<div className="dropdown">
								<a href={""} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<span className="icon-dots"></span>
								</a>
								<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<a className="dropdown-item delete-item" href={""} onClick={(e) => { e.preventDefault(); deleteCityHandler(city) }}>Delete</a>
									<a className="dropdown-item delete-item" style={{ backgroundColor: "#417EBF" }} href={""} onClick={(e) => { e.preventDefault(); setSelectedCity(city) }} data-toggle="modal" data-target="#addCity">Update</a>
								</div>
							</div>
						</div>
					</div>
				))}
				{cities.length === 0 && (
					<p>No cities added yet</p>
				)}
			</div>
			<AddCity selectedCity={selectedCity} setCities={setCities} cities={cities} />
		</DashboardLayout>
	)
}

export default City