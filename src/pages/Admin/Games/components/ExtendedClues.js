import React from 'react'
import { Link } from 'react-router-dom';

function ExtendedClues({ clues, setSelectedClue, deleteClueHandler }) {
	return (
		<table class="table table-bordered">
			<thead>
				<tr>
					<th style={{ fontSize: '1rem' }}>#</th>
					<th style={{ fontSize: '1rem' }}>Name</th>
					<th style={{ fontSize: '1rem' }}>Hint 1</th>
					<th style={{ fontSize: '1rem' }}>Hint 2</th>
					<th style={{ fontSize: '1rem' }}>Clue Answere</th>
					<th style={{ fontSize: '1rem' }}>Actions</th>
				</tr>
			</thead>
			<tbody>
				{clues?.map((clue, index) => (
					<tr>
						<td style={{ fontSize: '0.9rem' }}>{index + 1}</td>
						<td style={{ fontSize: '0.9rem' }}>{clue?.name}</td>
						<td style={{ fontSize: '0.9rem' }}>{clue?.hint_1.length > 25 ? clue?.hint_1.substring(0, 25) + `...` : clue?.hint_1}</td>
						<td style={{ fontSize: '0.9rem' }}>{clue?.hint_2.length > 25 ? clue?.hint_2.substring(0, 25) + `...` : clue?.hint_2}</td>
						<td style={{ fontSize: '0.9rem' }}>{clue?.ans}</td>
						<td class="text-center">
							<Link to={`clue/${clue._id}`} class="text-info mx-2"><i style={{ fontSize: '1.4rem' }} class="fa fa-eye"></i></Link>
							<a href={null} class="text-warning mx-2" onClick={(e) => { e.preventDefault(); setSelectedClue(clue) }} data-toggle="modal" data-target="#addClue"><i style={{ fontSize: '1.4rem' }} class="fa fa-pencil"></i></a>
							<a href="javascript:void(0)" class="text-danger mx-2" onClick={(e) => { e.preventDefault(); deleteClueHandler(clue) }}><i style={{ fontSize: '1.4rem' }} class="fa fa-trash"></i></a>
						</td>
					</tr>
				))}
				{clues.length === 0 && (
					<tr>
						<td colSpan={3}>No Clues Added Yet</td>
					</tr>
				)}
			</tbody>
		</table>
	)
}

export default ExtendedClues