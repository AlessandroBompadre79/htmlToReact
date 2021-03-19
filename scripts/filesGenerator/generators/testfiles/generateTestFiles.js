const utility = require('../../../utility');
const fse = require('fs-extra');
let content = require('./templates/test.template').content;

module.exports = {
  generate: (srcPath, name, ext, isWidget) => {
    let element = isWidget ? 'JsonForms' : 'div';
    let exportContent = content.replace(/PlaceHolderElement/ig, element).replace(/PlaceHolder/ig, utility.KebabToCamel(name)).replace(/place-holder/ig, name);
    if(isWidget){
      fse.writeFileSync(`${srcPath}/widgets/generated/${name}/${name}.component${ext}`, exportContent);
    } else {
      fse.writeFileSync(`${srcPath}/pages/generated/${name}/${name}.component${ext}`, exportContent);
    }
  }
}
