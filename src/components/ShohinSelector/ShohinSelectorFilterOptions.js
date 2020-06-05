export const filterOptions = (options, { getOptionLabel, inputValue }) => {
          
          
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
};