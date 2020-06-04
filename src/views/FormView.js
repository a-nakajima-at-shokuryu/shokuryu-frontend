import React, { useState } from 'react';
import DatePicker from '../components/DatePicker'; 
import * as Yup from 'yup'; 
import { Formik, Form } from 'formik'; 
import { addDays } from 'date-fns'; 
import { makeStyles } from '@material-ui/core';
import ShohinSelector from '../components/ShohinSelector';

const useStyles = makeStyles(theme => ({
  root: {
    
  }, 
}));

const days = 3; 

const validationSchema = Yup.object().shape({
  date: Yup.date()
    .nullable() 
    .required('日付は必須項目です')
    .min(addDays(new Date(),-days), `本日より${days}日以前の入力はできません`)
    .max(addDays(new Date(), days), `本日より${days}日以降の入力はできません`)
});

const initialValues = {
  date: new Date(), 
  shohin: {}, 
};

const FormView = () => {
  const classes = useStyles(); 
  const [values, setValues] = useState(initialValues);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        setValues(values);
      }}
    >
      {props => (
        <div className={classes.root}>
          <DatePicker 
            value={props.values.date}
            error={Boolean(props.errors.date)}
            helperText={props.errors.date}
            name={'date'}
            onChange={date => props.setFieldValue('date', date)}
            label="納品日"
          />

          <ShohinSelector
            label="商品CD"
            value={props.values.shohin}
            onChange={value => props.setFieldValue('shohin', value)}
          />
          <pre>{JSON.stringify(props.values, null, 2)}</pre>
          <pre>{JSON.stringify(props.errors, null, 2)}</pre>
        </div>
      )}
    </Formik>
  )
}

export default FormView
