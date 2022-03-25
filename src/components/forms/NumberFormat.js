import React from 'react'
import { useField } from 'formik'
import classNames from 'classnames'
import NumberFormat from "react-number-format"

function NumberFormatInput(props) {

	const [field, meta] = useField(props)
	return (
		<>
			<NumberFormat
				format={props.format}
				mask={props.mask}
				allowEmptyFormatting={true}
				className={classNames("form-control", { "is-invalid": meta.touched && meta.error })} {...field} {...props}
			/>
			{meta.touched && meta.error ? (
				<div className="invalid-feedback text-right-aligned">{meta.error}</div>
			) : null}
		</>
	)
}

export default NumberFormatInput
