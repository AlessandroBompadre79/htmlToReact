const utility = require('../../../utility');
const fse = require('fs-extra');
const _import = require('../../utils/importFiles').import;

let jsonContent = _import('./filesGenerator/generators/widgets/templates/json.schema.js');
let uiContent = _import('./filesGenerator/generators/widgets/templates/ui.schema.js');
let content = _import('./filesGenerator/generators/widgets/templates/widget.template.js');

module.exports = {
  generate: (srcPath, config, ext, i) => {

    let exportContent = jsonContent.replace(/{{schemaPlaceHolder}}/ig, (JSON.stringify(config.site.jsonSchema[i])));
    fse.writeFileSync(`${srcPath}/widgets/generated/${config.site.jsonSchema[i].id}/${config.site.jsonSchema[i].id}.json.schema${ext}`, exportContent);

    exportContent = uiContent.replace(/{{uischemaPlaceHolder}}/ig, (JSON.stringify(config.site.uiSchema[i])));
    fse.writeFileSync(`${srcPath}/widgets/generated/${config.site.jsonSchema[i].id}/${config.site.jsonSchema[i].id}.ui.schema${ext}`, exportContent);

      const placeHolder = utility.KebabToCamel(config.site.jsonSchema[i].id);  
      // Write file
      exportContent = content.replace(/{{schemaPlaceHolder}}/ig, (JSON.stringify(config.site.jsonSchema[i])))
          .replace(/{{uischemaPlaceHolder}}/ig, (JSON.stringify(config.site.uiSchema[i])))
          .replace(/PlaceHolder/ig, placeHolder)
          .replace(/place-holder/ig, config.site.jsonSchema[i].id);
      fse.writeFileSync(`${srcPath}/widgets/generated/${config.site.jsonSchema[i].id}/${config.site.jsonSchema[i].id}.component${ext}`, exportContent);
  }
}
