const utility = require('../../../utility');
const fse = require('fs-extra');
let content = require('./templates/compontent.translate.template').content;

module.exports = {
  generate: (srcPath, fileData, ext) => {
    let exportContent = content.replace(/PlaceHolder/ig, utility.KebabToCamel(fileData.name));
    fse.writeFileSync(`${srcPath}/pages/generated/${fileData.name}/${fileData.name}.component.translate${ext}`, exportContent);
  }
}
