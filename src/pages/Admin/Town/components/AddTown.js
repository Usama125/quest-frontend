import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import TextInput from '../../../../components/forms/TextInput'
import TextArea from '../../../../components/forms/TextArea'
import { toast } from 'react-toastify'
import TownsApi from '../../../../api/towns'

function AddTown({ selectedTown, setTowns, towns }) {
	return (
		<Formik
			initialValues={{
				name: selectedTown?.name || ""
			}}
			validationSchema={Yup.object({
				name: Yup.string().required('Required')
			})}
			onSubmit={(values, { resetForm }) => {
				if (selectedTown) {
					TownsApi.updateTown(selectedTown._id, values).then(res => {
						const tempTowns = JSON.parse(JSON.stringify(towns));
						tempTowns.forEach(item => {
							if (item._id === selectedTown._id) {
								item.name = values.name
							}
						});
						setTowns(tempTowns);
						toast.success("Town has been updated");
					});
				} else {
					TownsApi.createTown(values).then(res => {
						const tempTowns = JSON.parse(JSON.stringify(towns));
						tempTowns.push({ name: values.name, _id: res.data.data._id });
						setTowns(tempTowns);
						toast.success("Town has been added");
					})
				}
			}}
			enableReinitialize={true}
		>
			<div className="modal fade" id="addTown" tabindex="-1" aria-labelledby="addTownLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-lg">
					<div className="modal-content">
						<div className="modal-body">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span className="icon-close"></span>
							</button>
							<h4 className="text-center">{selectedTown?.name ? "Update" : "Add"} Town</h4>
							<Form>
								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											<TextInput type="text" name="name" placeholder="Name" />
										</div>
									</div>
								</div>
								<div className="form-group text-center mb-0 mt-3">
									<button type="submit" className="btn btn-primary">{selectedTown?.name ? "Update" : "Save"}</button>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</Formik>
	)
}

export default AddTown
