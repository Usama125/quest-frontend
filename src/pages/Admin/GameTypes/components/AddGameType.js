import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import TextInput from '../../../../components/forms/TextInput'
import TextArea from '../../../../components/forms/TextArea'
import { toast } from 'react-toastify'
import { useEffect, useRef, useState } from 'react'
import GameTypeApi from '../../../../api/gameType'

function AddGameType({ selectedGameType, setGameTypes, gameTypes }) {
	const closeBtnRef = useRef();
	return (
		<Formik
			initialValues={{
				name: selectedGameType?.name || "",
			}}
			validationSchema={Yup.object({
				name: Yup.string().required('Required')
			})}
			onSubmit={(values, { resetForm }) => {
				if (selectedGameType) {
					GameTypeApi.updateGameType(selectedGameType._id, values).then(res => {
						setGameTypes(res.data.data);
						resetForm();
						toast.success("Game Type has been updated");
						closeBtnRef.current.click();
					});
				} else {
					GameTypeApi.createGameType(values).then(res => {
						setGameTypes(res.data.data);
						resetForm();
						toast.success("Game Type has been added");
						closeBtnRef.current.click();
					})
				}
			}}
			enableReinitialize={true}
		>
			<div className="modal fade" id="addGameType" tabindex="-1" aria-labelledby="addGameTypeLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-lg">
					<div className="modal-content">
						<div className="modal-body">
							<button ref={closeBtnRef} type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span className="icon-close"></span>
							</button>
							<h4 className="text-center">{selectedGameType?.name ? "Update" : "Add"} Game Type</h4>
							<Form>
								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											<TextInput type="text" name="name" placeholder="Name" />
										</div>
									</div>
								</div>
								<div className="form-group text-center mb-0 mt-3">
									<button type="submit" className="btn btn-primary">{selectedGameType?.name ? "Update" : "Save"}</button>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</Formik>
	)
}

export default AddGameType
