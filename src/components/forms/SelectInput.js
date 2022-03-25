import React from 'react';
import { useField } from 'formik';
import classNames from 'classnames';

const SelectInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div>
        <select className={classNames("form-control",{ "is-invalid": meta.touched && meta.error })} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="invalid-feedback text-right-aligned">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  export default SelectInput;