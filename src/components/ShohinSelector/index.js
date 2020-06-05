import React from 'react';
import {
  Autocomplete, 
} from '@material-ui/lab';
import { TextField, makeStyles, useMediaQuery, useTheme, ListSubheader } from '@material-ui/core';
import clsx from 'clsx';
import {
  VariableSizeList, 
} from 'react-window'

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
        
        // options={shohinList.filter((_, i) => i % 100 === 0)}
        options={shohinList}

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

        ListboxComponent={ListboxComponent}

        filterOptions={filterOptions}

        {...other}
      />
    </div>
  )
}

export default ShohinSelector; 

const LISTBOX_PADDING = 8; 

const renderRow = props => {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style, 
      top: style.top + LISTBOX_PADDING, 
    }, 
  });
};

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

const ListboxComponent = React.forwardRef((props, ref) => {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSSr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36: 48; 

  const getChildSize = child => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48; 
    }

    return itemSize; 
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize; 
    }

    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          key={itemCount}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={index => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});