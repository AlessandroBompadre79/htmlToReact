const utility = require('../../../utility');
const fse = require('fs-extra');

let jsonContent = require('./templates/json.schema').jsonContent;
let uiContent = require('./templates/ui.schema').uiContent;
let content = require('./templates/widget.template').content;

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
