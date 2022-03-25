import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import TextInput from '../../../../components/forms/TextInput'
import TextArea from '../../../../components/forms/TextArea'
import { toast } from 'react-toastify'
import CitiesApi from '../../../../api/cities'
import MultipleSelect from '../../../../components/forms/MultipleSelect'
import { useEffect, useState } from 'react'
import QuestApi from '../../../../api/quests'

function AddQuest({ selectedQuest, setQuests, quests }) {
	const [citiesError, setCitiesError] = useState(false)
	const [cities, setCities] = useState({
		cities: [],
		selectedCities: []
	});

	useEffect(() => {
		CitiesApi.getCities().then(res => {
			const citiesOption = []
			res.data.data.map(city => {
				citiesOption.push({
					label: city.name,
					value: city._id
				})
			})
			const prevCities = []
			citiesOption.map(outerItem => {
				selectedQuest?.cities?.map(innerItem => {
					if (outerItem.value === innerItem._id) {
						prevCities.push(outerItem)
					}
				})
			})
			setCities({
				cities: citiesOption,
				selectedCities: prevCities
			})
		})
	}, [selectedQuest])

	return (
		<Formik
			initialValues={{
				name: selectedQuest?.name || "",
			}}
			validationSchema={Yup.object({
				name: Yup.string().required('Required')
			})}
			onSubmit={(values, { resetForm }) => {

				if (cities.selectedCities.length === 0) {
					setCitiesError(true)
				} if (cities.selectedCities.length === 0) {
					setCitiesError(true)
				} else {
					setCitiesError(false)
				}

				const newValues = JSON.parse(JSON.stringify(values))

				const citiesId = []

				cities.selectedCities.map(item => {
					citiesId.push(item.value)
				})

				newValues.cities = citiesId

				if (selectedQuest) {
					QuestApi.updateQuests(selectedQuest._id, newValues).then(res => {
						setQuests(res.data.data);
						resetForm();
						setCities({ ...cities, selectedCities: [] })
						toast.success("Quest has been updated");
					});
				} else {
					QuestApi.createQuest(newValues).then(res => {
						setQuests(res.data.data);
						resetForm();
						setCities({ ...cities, selectedCities: [] })
						toast.success("Quest has been added");
					})
				}
			}}
			enableReinitialize={true}
		>
			<div className="modal fade" id="addQuest" tabindex="-1" aria-labelledby="addQuestLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-lg">
					<div className="modal-content">
						<div className="modal-body">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span className="icon-close"></span>
							</button>
							<h4 className="text-center">{selectedQuest?.name ? "Update" : "Add"} Quest</h4>
							<Form>
								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											<TextInput type="text" name="name" placeholder="Name" />
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group">
											<MultipleSelect
												options={cities.cities}
												value={cities.selectedCities || []}
												changeHandler={(e) => { setCities({ ...cities, selectedCities: e }); e.length > 0 ? setCitiesError(false) : setCitiesError(true) }}
												hasError={citiesError}
												label={"Select Cities"}
												errorMessage={"Cities are required"}
											/>
										</div>
									</div>
								</div>
								<div className="form-group text-center mb-0 mt-3">
									<button type="submit" className="btn btn-primary">{selectedQuest?.name ? "Update" : "Save"}</button>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</Formik>
	)
}

export default AddQuest
