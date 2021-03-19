import checkPropTypes   from 'check-prop-types';

const check = (typeSpecs, values, location, componentName) => {
  const val = checkPropTypes(typeSpecs, values, location, componentName)
  return val === undefined;
}

export default check;