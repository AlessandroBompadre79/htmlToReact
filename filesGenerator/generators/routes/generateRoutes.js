const utility = require('../../../utility');
const fse = require('fs-extra');
const path = require('path');
let headConstant = ``;

const componentStringConstant = `
import PlaceHolder from './pages/generated/place-holder/place-holder.component';`;

let routesPartConstant = `
  
const routes = [
`;

const foot = `];

export default routes; 
`;

module.exports = {
  generate: (srcPath, files) => {
    let head = headConstant; 
    let routesPart = routesPartConstant; 
    let componentString = componentStringConstant; 

    const components = [];
    // Add components to be imported
    files.forEach((file, i) => {
      let fileData = path.parse(file);
      components[i] = utility.KebabToCamel(fileData.name) + 'Component';
      head += componentString.replace(/PlaceHolder/ig, components[i]).replace(/place-holder/ig, fileData.name);
    });

    // Add routes
    components.forEach((component, i) => {
      routesPart += `{ name: '` + utility.CamelToKebab(component.replace('Component', '')).replace('-page', '') + `', path: '` + utility.CamelToKebab(component.replace('Component', '')).replace('-page', '') + `', component:  ` + component + `},
      `;
    });
    
    // Write file
    fse.writeFileSync(`${srcPath}/routes.js`, head + routesPart + foot);
  }
}
