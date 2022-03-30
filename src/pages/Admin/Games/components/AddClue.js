import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import TextInput from '../../../../components/forms/TextInput'
import SelectInput from '../../../../components/forms/SelectInput'
import { toast } from 'react-toastify'
import ClueApi from '../../../../api/clue'
import { useEffect, useState } from 'react'
import GameApi from '../../../../api/game'
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from "react-draft-wysiwyg";

function AddClue({ selectedClue, setClues }) {
	const [file, setFile] = useState(null)
	const [fileError, setFileError] = useState("")
	const [submited, setSubmited] = useState(false)
	const [games, setGames] = useState([]);

	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const [clueText, setClueText] = useState("");

	const onEditorStateChange = (editorState) => {
		setClueText(draftToHtml(convertToRaw(editorState.getCurrentContent())));
		setEditorState(editorState)
	};

	useEffect(() => {
		GameApi.getGames().then(res => {
			setGames(res.data.data);
		}).catch(err => {
			toast.error("Problem while getting games")
		})
	}, []);

	const onFileUpload = (e) => {
		console.log(e.target?.files[0]?.type);
		setFile(e.target?.files[0]);
		setFileError("");
	}

	return (
		<Formik
			initialValues={{
				name: selectedClue?.name || "",
				hint_1: selectedClue?.hint_1 || "",
				hint_2: selectedClue?.hint_2 || "",
				gameId: selectedClue?.gameId._id || "",
				type: selectedClue?.type || "",
				ans: selectedClue?.ans || "",
			}}
			validationSchema={Yup.object({
				name: Yup.string().required('Required'),
				hint_1: Yup.string().required('Required'),
				hint_2: Yup.string().required('Required'),
				gameId: Yup.string().required('Required'),
				type: Yup.string().required('Required'),
				ans: Yup.string().required('Required'),
			})}
			onSubmit={(values, { resetForm }) => {
				setSubmited(true);

				if (file === null) {
					setFileError("File is required")
					return false;
				}

				if (values.type === "IMAGE") {
					if (file?.type === "image/png" || file?.type === "image/jpeg") {
						setFileError("");
					} else {
						setFileError("Please select image file")
						return false;
					}
				} else if (values.type === "VIDEO") {
					if (file?.type === "video/mp4") {
						setFileError("");
					} else {
						setFileError("Please select video file")
						return false;
					}
				} else if (values.type === "AUDIO") {
					if (file?.type === "audio/mpeg" || file?.type === "audio/mp3") {
						setFileError("");
					} else {
						setFileError("Please select audio file")
						return false;
					}
				} else if (values.type === "TEXT") {
					setFileError("");
				}

				if (file) {
					let formData = new FormData();
					formData.append("name", values.name);
					formData.append("hint_1", values.hint_1);
					formData.append("hint_2", values.hint_2);
					formData.append("gameId", values.gameId);
					formData.append("type", values.type);
					formData.append("text", clueText);
					formData.append("ans", values.ans);
					values.type !== "TEXT" && formData.append("file", file);

					if (selectedClue) {
						ClueApi.updateClue(selectedClue._id, formData).then(res => {
							setClues(res.data.data);
							resetForm();
							toast.success("Clue has been updated");
						});
					} else {
						ClueApi.createClue(formData).then(res => {
							setClues(res.data.data);
							resetForm();
							toast.success("Clue has been added");
						})
					}
				} else {
					setFileError("Hint File Required");
				}
			}}
			enableReinitialize={true}
		>
			{({ values }) => {
				return (
					(
						<div className="modal fade" id="addClue" tabindex="-1" aria-labelledby="addClueLabel" aria-hidden="true">
							<div className="modal-dialog modal-dialog-centered modal-lg">
								<div className="modal-content">
									<div className="modal-body">
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span className="icon-close"></span>
										</button>
										<h4 className="text-center">{selectedClue?.hint ? "Update" : "Add"} Clue</h4>
										<Form>
											<div className="row">
												<div className="col-md-12">
													<div className="form-group">
														<TextInput type="text" name="name" placeholder="Name" />
													</div>
												</div>
												<div className="col-md-12">
													<div className="form-group">
														<TextInput type="text" name="hint_1" placeholder="Hint 1" />
													</div>
												</div>
												<div className="col-md-12">
													<div className="form-group">
														<TextInput type="text" name="hint_2" placeholder="Hint 2" />
													</div>
												</div>
												<div className="col-md-12">
													<div className="form-group">
														<SelectInput name="type">
															<option value="">Type</option>
															<option value={"TEXT"}>{"TEXT"}</option>
															<option value={"IMAGE"}>{"IMAGE"}</option>
															<option value={"AUDIO"}>{"AUDIO"}</option>
															<option value={"VIDEO"}>{"VIDEO"}</option>
														</SelectInput>
													</div>
												</div>
												{values.type !== "TEXT" && (
													<div className="col-md-12">
														<div class="form-group">
															<input type="file" class="form-control" onChange={onFileUpload} />
															{submited && fileError ? (
																<span style={{ color: "red", fontSize: "0.9rem", paddingTop: "10px" }}>{fileError}</span>
															) : null}
														</div>
													</div>
												)}
												<div className="col-md-12">
													<div className="form-group">
														<SelectInput name="gameId">
															<option value="">Game</option>
															{games?.map(game => (
																<option key={game._id} value={game._id}>{game.name}</option>
															))}
														</SelectInput>
													</div>
												</div>
												<div className="col-md-12">
													<div className="form-group">
														<Editor
															editorState={editorState}
															wrapperClassName="demo-wrapper"
															editorClassName="demo-editor"
															onEditorStateChange={onEditorStateChange}
														/>
													</div>
												</div>
												<div className="col-md-12">
													<div className="form-group">
														<TextInput type="text" name="ans" placeholder="Clue Answere" />
													</div>
												</div>
											</div>
											<div className="form-group text-center mb-0 mt-3">
												<button type="submit" className="btn btn-primary">{selectedClue?.name ? "Update" : "Save"}</button>
											</div>
										</Form>
									</div>
								</div>
							</div>
						</div>
					)
				)
			}
			}
		</Formik>
	)
}

export default AddClue
