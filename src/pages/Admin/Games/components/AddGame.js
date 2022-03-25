import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import TextInput from '../../../../components/forms/TextInput'
import SelectInput from '../../../../components/forms/SelectInput'
import { toast } from 'react-toastify'
import GameApi from '../../../../api/game'

function AddGame({ selectedGame, setGames, games, quests }) {
	return (
		<Formik
			initialValues={{
				name: selectedGame?.name || "",
				questId: selectedGame?.questId._id || ""
			}}
			validationSchema={Yup.object({
				name: Yup.string().required('Required'),
				questId: Yup.string().required('Required')
			})}
			onSubmit={(values, { resetForm }) => {
				if (selectedGame) {
					GameApi.updateGame(selectedGame._id, values).then(res => {
						setGames(res.data.data);
						resetForm();
						toast.success("Game has been updated");
					});
				} else {
					GameApi.createGame(values).then(res => {
						setGames(res.data.data);
						resetForm();
						toast.success("Game has been added");
					})
				}
			}}
			enableReinitialize={true}
		>
			<div className="modal fade" id="addGame" tabindex="-1" aria-labelledby="addGameLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-lg">
					<div className="modal-content">
						<div className="modal-body">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span className="icon-close"></span>
							</button>
							<h4 className="text-center">{selectedGame?.name ? "Update" : "Add"} Game</h4>
							<Form>
								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											<TextInput type="text" name="name" placeholder="Name" />
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group">
											<SelectInput name="questId">
												<option value="">Quest</option>
												{quests?.map(quest => (
													<option key={quest._id} value={quest._id}>{quest.name}</option>
												))}
											</SelectInput>
										</div>
									</div>
								</div>
								<div className="form-group text-center mb-0 mt-3">
									<button type="submit" className="btn btn-primary">{selectedGame?.name ? "Update" : "Save"}</button>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</Formik>
	)
}

export default AddGame
