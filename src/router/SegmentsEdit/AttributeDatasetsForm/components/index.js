/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form, useField, useFormikContext } from 'formik';
import './styles.css';

const MyField = function MyFieldFn(props) {
  const {
    values: { textA, textB },
    touched,
    setFieldValue,
  } = useFormikContext();
  const [field, meta] = useField(props);

  console.log(useField(props));

  // React.useEffect(() => {
  //   if (
  //     textA.trim() !== ''
  //     && textB.trim() !== ''
  //     && touched.textA
  //     && touched.textB
  //   ) {
  //     setFieldValue(props.name, `textA: ${textA}, textB: ${textB}`);
  //   }
  // }, [textB, textA, touched.textA, touched.textB, setFieldValue, props.name]);

  return (
    <React.Fragment>
      <input
        {...props}
        {...field}
      />
      {Boolean(meta.touched) && Boolean(meta.error) && (
      <div>
        {meta.error}
      </div>
      )}
    </React.Fragment>
  );
};
