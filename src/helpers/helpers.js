export const getColorsForTag = (tag) => {
  const colorsForTags = {
    fire: 'red',
    water: 'cyan',
    grass: 'green',
    bug: 'orange',
    flying: 'blue',
    poison: 'purple',
  };
  return colorsForTags[tag];
};
