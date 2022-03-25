import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import TextInput from '../../../../components/forms/TextInput'
import TextArea from '../../../../components/forms/TextArea'
import { toast } from 'react-toastify'
import CitiesApi from '../../../../api/cities'

function AddCity({ selectedCity, setCities, cities }) {
	return (
		<Formik
			initialValues={{
				name: selectedCity?.name || ""
			}}
			validationSchema={Yup.object({
				name: Yup.string().required('Required')
			})}
			onSubmit={(values, { resetForm }) => {
				if (selectedCity) {
					CitiesApi.updateCities(selectedCity._id, values).then(res => {
						const tempCities = JSON.parse(JSON.stringify(cities));
						tempCities.forEach(item => {
							if (item._id === selectedCity._id) {
								item.name = values.name
							}
						});
						setCities(tempCities);
						toast.success("City has been updated");
					});
				} else {
					CitiesApi.createCity(values).then(res => {
						const tempCities = JSON.parse(JSON.stringify(cities));
						tempCities.push({ name: values.name, _id: res.data.data._id });
						setCities(tempCities);
						toast.success("City has been added");
					})
				}
			}}
			enableReinitialize={true}
		>
			<div className="modal fade" id="addCity" tabindex="-1" aria-labelledby="addCityLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-lg">
					<div className="modal-content">
						<div className="modal-body">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span className="icon-close"></span>
							</button>
							<h4 className="text-center">{selectedCity?.name ? "Update" : "Add"} City</h4>
							<Form>
								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											<TextInput type="text" name="name" placeholder="Name" />
										</div>
									</div>
								</div>
								<div className="form-group text-center mb-0 mt-3">
									<button type="submit" className="btn btn-primary">{selectedCity?.name ? "Update" : "Save"}</button>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</Formik>
	)
}

export default AddCity
