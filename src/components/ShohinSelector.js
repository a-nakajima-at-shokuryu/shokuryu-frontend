import React from 'react';
import {
  Autocomplete, 
} from '@material-ui/lab';
import { TextField, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import shohinListSource from '../json/shohin.json';

const columns = [
  ['hincd', '商品コード',  350110700,], 
  ['hinnm', '商品名'  ,  "ﾏｱｼﾞｵﾄｼﾐ",], 
  ['size' , 'サイズ'  ,  "",], 
  ['yoryo', '容量'   ,  1000,], 
  ['juryo', '重量区分' ,  "G",], 
  ['irisu', '入数'   ,  20], 
].map(([name, title, sample ]) => ({ name, title, sample }));

const shohinList = shohinListSource.map((row) => {
  const dic = {};
  Object.entries(row).forEach(([ title, value ]) => {
    const name = columns.find(({ title: check }) => check === title).name;
    dic[name] = value;
  });
  return dic;
});

const useStyles = makeStyles(theme => ({
  root: {
    width: 300, 
  }, 
}));

const optionLabel = option => {
  const { hincd, hinnm, size, yoryo, juryo, irisu } = option;

  if (hincd === undefined) {
    return '';
  }

  return `
    ${hincd} ${hinnm} ${size} ${yoryo} ${juryo} ${irisu}
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

        filterOptions={(options, { getOptionLabel, inputValue }) => {
          
          
          if (inputValue.length === 0) return options;
          const values = inputValue.replace('　', ' ').split(' ').filter(value => value !== '');

          return options.filter((option) => {
            const target = getOptionLabel(option);
            let hit = true;
            for (let value of values) {
              if (!target.includes(value)) {
                hit = false;
                
                break;
              }
            };
            return hit; 
          });
        }}
        {...other}
      />
    </div>
  )
}

export default ShohinSelector
