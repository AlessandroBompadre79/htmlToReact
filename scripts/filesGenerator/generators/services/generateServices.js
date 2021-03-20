const fse = require('fs-extra');
const _import = require('../../utils/importFiles').import;

let interfaceContent = _import('./filesGenerator/generators/services/templates/interface.template.js');
let methodContent = _import('./filesGenerator/generators/services/templates/method.template.js');
let content = _import('./filesGenerator/generators/services/templates/service.template.js');

module.exports = {
  generate: (srcPath, config, ext, i) => {
    const isRequired = (val) => val ? '.isRequired' : '';
    const required = (val) => val ? ', required' : '';
    const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);
    let exportMethodContent = '';
    const distPath = `${srcPath}/interfaces/`;
    fse.emptyDirSync(distPath);
    let importInterfaces = '';
    config.site.services[i].payloads.forEach(payload => {
      let comments = '';
      let interfaces = '';
      payload.params.forEach(param => {
          comments += `     * @param {${param.type}} params.${param.name} - ${param.name}${required(param.required)}\n`
          interfaces += `   ${param.name}: PropTypes.${param.type}${isRequired(param.required)},\n`          
      });
      importInterfaces += `import ${capitalize(payload.method)}Interface from './interfaces/authenticate.interface';\n`;
      let exportInterfaceContent = interfaceContent.replace(/interfacePlaceHolder/ig, capitalize(payload.method)).replace(/interfacesPlaceHolder/ig, interfaces); 
      fse.writeFileSync(`${distPath}${payload.method}.interface${ext}`, exportInterfaceContent);
      exportMethodContent += methodContent.replace(/commentsPlaceHolder /ig,  comments).replace(/methodPlaceHolder/ig, payload.method).replace(/interfacePlaceHolder/ig, capitalize(payload.method)); 
    });

    let exportContent = content.replace(/methodPlaceHolder/ig, exportMethodContent).replace(/{{importInterfacesPlaceholder}}/ig, importInterfaces);
    exportContent = exportContent.replace(/PlaceHolder/ig, capitalize(config.site.services[i].id));
    fse.writeFileSync(`${srcPath}/${config.site.services[i].id}.service${ext}`, exportContent);
  }
}
