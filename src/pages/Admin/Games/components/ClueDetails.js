import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import ClueApi from '../../../../api/clue';
import DashboardLayout from '../../../../layout/DashboardLayout'

function ClueDetails() {
	const { id } = useParams();
	let history = useHistory();

	const [clue, setClue] = useState({});

	useEffect(() => {
		ClueApi.getSingleClue(id).then(res => {
			setClue(res.data.data);
		});
	}, []);

	return (
		<DashboardLayout>
			<div class="row align-items-center mb-4">
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<div class="card lab-result mb-2">
								<div class="card-body">
									<h5>{clue?.gameId?.name + " Clues"}
									</h5>
									<hr />
									<p style={{ fontWeight: 'bold', fontSize: "1.1rem" }}>Name</p>
									<p style={{ marginTop: '-10px' }}>{clue?.name}</p>
									<p style={{ fontWeight: 'bold', fontSize: "1.1rem" }}>Hint 1</p>
									<p style={{ marginTop: '-10px' }}>{clue?.hint_1}</p>
									<p style={{ fontWeight: 'bold', fontSize: "1.1rem" }}>Hint 2</p>
									<p style={{ marginTop: '-10px' }}>{clue?.hint_2}</p>
									<p style={{ fontWeight: 'bold', fontSize: "1.1rem" }}>Clue Text</p>
									<div style={{ marginTop: '-10px' }} dangerouslySetInnerHTML={{ __html: clue?.text }}></div>
									<p style={{ fontWeight: 'bold', fontSize: "1.1rem" }}>Clue Type</p>
									<p style={{ marginTop: '-10px' }}>{clue?.type}</p>
									{clue.type !== "TEXT" && (
										<>
											<p style={{ fontWeight: 'bold', fontSize: "1.1rem", marginBottom: '5px' }}>Clue File</p>
											<a href={clue?.url} target="_blank" style={{ marginTop: '-10px' }}>See Attached File</a>
										</>
									)}
									<p style={{ fontWeight: 'bold', fontSize: "1.1rem", marginTop: '10px' }}>Clue Answere</p>
									<p style={{ marginTop: '-10px' }}>{clue?.ans}</p>
									<div>
										<button className='btn btn-secondary' style={{ float: 'right' }} onClick={() => history.goBack()}>Go Back</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</DashboardLayout>
	)
}

export default ClueDetails