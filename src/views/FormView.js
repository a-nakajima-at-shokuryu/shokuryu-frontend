import React from 'react';
import DatePicker from '../components/DatePicker'; 
import * as Yup from 'yup'; 
import { Formik, Form } from 'formik'; 
import { addDays } from 'date-fns'; 
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {}, 
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
};

const FormView = () => {
  const classes = useStyles(); 

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {props => (
        <DatePicker 
          value={props.values.date}
          error={Boolean(props.errors.date)}
          helperText={props.errors.date}
          onChange={date => props.setFieldValue('date', date)}
          label="納品日"
        />
      )}
    </Formik>
  )
}

export default FormView
