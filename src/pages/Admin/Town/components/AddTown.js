import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import TextInput from '../../../../components/forms/TextInput'
import TextArea from '../../../../components/forms/TextArea'
import { toast } from 'react-toastify'
import TownsApi from '../../../../api/towns'
import { useRef, useState } from 'react'

function AddTown({ selectedTown, setTowns, towns }) {
	const closeBtnRef = useRef();
	const [file, setFile] = useState(null)
	const [fileError, setFileError] = useState("")
	const [submited, setSubmited] = useState(false)

	const onFileUpload = (e) => {
		setFile(e.target?.files[0]);
		setFileError("");
	}

	return (
		<Formik
			initialValues={{
				name: selectedTown?.name || ""
			}}
			validationSchema={Yup.object({
				name: Yup.string().required('Required')
			})}
			onSubmit={(values, { resetForm }) => {
				if (selectedTown?.name !== values?.name && towns.filter(town => town?.name?.toLowerCase() === values?.name?.toLowerCase()).length > 0) {
					toast.error("Town Already Exists");
					return false;
				}

				setSubmited(true);

				if (!selectedTown?.name && (file === null)) {
					setFileError("File is required")
					return false;
				}

				let formData = new FormData();
				formData.append("name", values.name);
				file !== null && formData.append("image", file)

				if (selectedTown) {
					TownsApi.updateTown(selectedTown._id, formData).then(res => {
						const tempTowns = JSON.parse(JSON.stringify(towns));
						tempTowns.forEach(item => {
							if (item._id === selectedTown._id) {
								item.name = values.name;
								item.url = res.data.data.url
							}
						});
						setTowns(tempTowns);
						toast.success("Town has been updated");
						resetForm();
						closeBtnRef.current.click();
					}).catch(err => {
						toast.error(err.response.data.message);
					});
				} else {
					TownsApi.createTown(formData).then(res => {
						const tempTowns = JSON.parse(JSON.stringify(towns));
						tempTowns.push({ name: values.name, _id: res.data.data._id, url: res.data.data.url });
						setTowns(tempTowns);
						toast.success("Town has been added");
						resetForm();
						closeBtnRef.current.click();
					}).catch(err => {
						toast.error(err.response.data.message)
					});
				}
			}}
			enableReinitialize={true}
		>
			<div className="modal fade" id="addTown" tabindex="-1" aria-labelledby="addTownLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-lg">
					<div className="modal-content">
						<div className="modal-body">
							<button ref={closeBtnRef} type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span className="icon-close"></span>
							</button>
							<h4 className="text-center">{selectedTown?.name ? "Update" : "Add"} Town</h4>
							<Form>
								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											<TextInput type="text" name="name" placeholder="Name" />
										</div>
										<div className="col-md-12">
											<div class="form-group">
												<input type="file" class="form-control" accept="image/*" onChange={onFileUpload} />
												{submited && fileError ? (
													<span style={{ color: "red", fontSize: "0.9rem", paddingTop: "10px" }}>{fileError}</span>
												) : null}
												{selectedTown && Object.keys(selectedTown).length > 0 && selectedTown?.url && (<div style={{ marginTop: "1rem" }}><a href={selectedTown.url} target="_blank">See Attached File</a></div>)}
											</div>
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
