import jaconv from 'jaconv';

const toHankana = s => [
  jaconv.toKatakana, 
  jaconv.toHan, 
].reduce((a, b) => {
  return b(a);
}, s);

export const filterOptions = (options, { getOptionLabel, inputValue }) => {
  
  if (inputValue.length === 0) return options;

  const values = toHankana(inputValue);

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