const utility = require('../../../utility');
const fse = require('fs-extra');
const _import = require('../../utils/importFiles').import;

let content = _import('./filesGenerator/generators/components/templates/compontent.translate.template.js');

module.exports = {
  generate: (srcPath, fileData, ext) => {
    let exportContent = content.replace(/PlaceHolder/ig, utility.KebabToCamel(fileData.name));
    fse.writeFileSync(`${srcPath}/pages/generated/${fileData.name}/${fileData.name}.component.translate${ext}`, exportContent);
  }
}
