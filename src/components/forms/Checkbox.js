import React from 'react';
import { useField } from 'formik';

const Checkbox = ({ children, ...props }) => {
    
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <div>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  export default Checkbox;