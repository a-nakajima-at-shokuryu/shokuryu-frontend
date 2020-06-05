import React from 'react';
import {
  Autocomplete, 
} from '@material-ui/lab';
import { TextField, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { shohinList } from '../../list/shohinList';
import { filterOptions } from './ShohinSelectorFilterOptions';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300, 
  }, 
}));

const optionLabel = option => {
  const { hincd, hinnm, size, yoryo, jyuku, irisu } = option;

  if (hincd === undefined) {
    return '';
  }

  return `
    ${hincd} ${hinnm} ${size} ${yoryo} ${jyuku} ${irisu}
  `;
}


const ShohinSelector = ({
  options = [], 
  label = '商品CD', 
  className, 
  value, 
  onChange, 
  ...other 
}) => {
  const classes = useStyles();

  return (
    <div>
      
      <Autocomplete 
        className={clsx(classes.root, className)}
        
        options={shohinList.filter((_, i) => i % 100 === 0)}

        getOptionLabel={option => optionLabel(option)}
        
        value={value}
        onChange={(_e, value) => onChange(value)}

        renderInput={props => (
          <TextField
            {...props}
            label={label}
            fullwidth="true"
          />
        )}

        filterOptions={filterOptions}

        {...other}
      />
    </div>
  )
}

export default ShohinSelector; 