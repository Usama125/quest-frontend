import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import TextInput from '../../../../components/forms/TextInput'
import SelectInput from '../../../../components/forms/SelectInput'
import { toast } from 'react-toastify'
import GameApi from '../../../../api/game'
import TownsApi from '../../../../api/towns'
import { useState, useEffect, useRef } from 'react'
import MultipleSelect from '../../../../components/forms/MultipleSelect'
import { DURATION_TYPE } from '../../../../constants'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

function AddGame({ selectedGame, setGames, games, gameTypes, clickGameLabel }) {

	const [townsError, setTownsError] = useState(false)
	const [towns, setTowns] = useState({
		towns: [],
		selectedTowns: []
	});
	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const [introduction, setIntroduction] = useState("");
	const [introductionError, setIntroductionError] = useState(false);
	const closeBtnRef = useRef();

	useEffect(() => {
		if (selectedGame && Object.keys(selectedGame).length > 0) {
			setEditorState(EditorState.createWithContent(
				ContentState.createFromBlockArray(
					convertFromHTML(selectedGame?.introduction)
				)
			))
			setIntroduction(selectedGame?.introduction);
		}
	}, [selectedGame]);

	const onEditorStateChange = (editorState) => {
		setIntroduction(draftToHtml(convertToRaw(editorState.getCurrentContent())));

		if (introduction === "" || introduction === "<p></p>\n") {
			setIntroductionError(true);
		} else {
			setIntroductionError(false);
		}
		setEditorState(editorState)
	};

	useEffect(() => {
		TownsApi.getTowns().then(res => {
			const townsOption = []
			res.data.data.map(town => {
				townsOption.push({
					label: town.name,
					value: town._id
				})
			})
			const prevTowns = []
			townsOption.map(outerItem => {
				selectedGame?.towns?.map(innerItem => {
					if (outerItem.value === innerItem._id) {
						prevTowns.push(outerItem)
					}
				})
			})
			setTowns({
				towns: townsOption,
				selectedTowns: prevTowns
			})
		})
	}, [selectedGame])
	return (
		<Formik
			initialValues={{
				name: selectedGame?.name || "",
				gameTypeId: selectedGame?.gameTypeId._id || "",
				published: selectedGame?.published || ""
			}}
			validationSchema={Yup.object({
				name: Yup.string().required('Required'),
				gameTypeId: Yup.string().required('Required'),
				published: Yup.string().required('Required')
			})}
			onSubmit={(values, { resetForm }) => {
				if (towns.selectedTowns.length === 0) {
					setTownsError(true)
					return false;
				} else {
					setTownsError(false)
				}

				if (introduction === "" || introduction === "<p></p>\n") {
					setIntroductionError(true);
					return false;
				} else {
					setIntroductionError(false);
				}

				const newValues = JSON.parse(JSON.stringify(values))

				const townsId = []

				towns.selectedTowns.map(item => {
					townsId.push(item.value)
				})

				newValues.towns = townsId
				introduction && (newValues.introduction = introduction)

				if (selectedGame) {
					GameApi.updateGame(selectedGame._id, newValues).then(res => {
						setGames(res.data.data);
						resetForm();
						toast.success("Game has been updated");
						setIntroduction("");
						setEditorState(EditorState.createEmpty());
						closeBtnRef.current.click();
					});
				} else {
					GameApi.createGame(newValues).then(res => {
						setGames(res.data.data);
						resetForm();
						toast.success("Game has been added");
						setIntroduction("");
						setEditorState(EditorState.createEmpty());
						closeBtnRef.current.click();
					})
				}
			}}
			enableReinitialize={true}
		>
			<div className="modal fade" id="addGame" tabindex="-1" aria-labelledby="addGameLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-lg">
					<div className="modal-content">
						<div className="modal-body">
							<button ref={closeBtnRef} onClick={clickGameLabel} type="button" className="close" data-dismiss="modal" aria-label="Close">
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
											<SelectInput name="gameTypeId">
												<option value="">Game Type</option>
												{gameTypes?.map(gameType => (
													<option key={gameType._id} value={gameType._id}>{gameType.name}</option>
												))}
											</SelectInput>
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group">
											<MultipleSelect
												options={towns.towns}
												value={towns.selectedTowns || []}
												changeHandler={(e) => { setTowns({ ...towns, selectedTowns: e }); e.length > 0 ? setTownsError(false) : setTownsError(true) }}
												hasError={townsError}
												label={"Select Towns"}
												errorMessage={"Towns are required"}
											/>
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group">
											<SelectInput name="durationType">
												<option value="">Duration Type</option>
												<option value={true}>{DURATION_TYPE.HOURS}</option>
												<option value={DURATION_TYPE.MINUTES}>{DURATION_TYPE.MINUTES}</option>
											</SelectInput>
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group">
											<TextInput type="text" name="duration" placeholder="Duration" />
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group">
											<SelectInput name="published">
												<option value="">Publish</option>
												<option value={true}>{"YES"}</option>
												<option value={false}>{"NO"}</option>
											</SelectInput>
										</div>
									</div>
									<div className="col-md-12">
										<label for="intro" >Introduction</label>
										<div id="intro" className="form-group">
											<Editor
												editorState={editorState}
												wrapperClassName={introductionError ? "error-demo-wrapper" : "demo-wrapper"}
												editorClassName="demo-editor"
												onEditorStateChange={onEditorStateChange}
											/>
											{introductionError && (<span style={{ color: 'red', float: "right", marginTop: "0.6rem" }}>Introduction is required</span>)}
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
