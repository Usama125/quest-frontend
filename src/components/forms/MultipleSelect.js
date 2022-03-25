import React from 'react'
import { MultiSelect } from "react-multi-select-component"

function MultipleSelect({ options, value, changeHandler, label, hasError, errorMessage, defaultValue }) {

	return (
		<>
			<div>
				<MultiSelect
					options={options}
					hasSelectAll={true}
					isLoading={false}
					shouldToggleOnHover={false}
					disableSearch={false}
					defaultValue={defaultValue}
					value={value}
					disabled={false}
					onChange={changeHandler}
					labelledBy={label}
					className={hasError ? "multi-select error-border" : "multi-select"}
				/>
			</div>
			{hasError ? (
				<div className="multiselect-error-message">{errorMessage}</div>
			) : null}
		</>
	)
}

export default MultipleSelect
