// Libraries
const fse = require('fs-extra');
const path = require('path');
const glob = require('glob');
// Utilities
const fileGenerator = require('../filesGenerator/index');

// Config
const configPromise = require('../site.config');
const [,, ...args] = process.argv

let srcPath;
let widgetsOutputPath;
const init = configPromise.init();

const initialize = (distPath, config, isWidget) => {
  let destPath = '';
  // Generate files
  for(var j =0; j < config.site.jsonSchema.length; j++) {
    destPath = path.join(distPath, config.site.jsonSchema[j].id);
    fse.mkdirsSync(destPath);
    fileGenerator.generateWidgets(srcPath, config, '.js', j);
    fileGenerator.generateTestFiles(srcPath, config.site.jsonSchema[j].id, '.test.js', isWidget );
    // Generate Css files
    fse.writeFileSync(`${destPath}/${config.site.jsonSchema[j].id}.component.scss`, ``);
  }
}

init.then((config) => {
  srcPath = `../${args}${config.build.srcPath}`;
  widgetsOutputPath = `../${args}${config.build.widgetsOutputPath}`;
  // Clear destination folders
  fse.emptyDirSync(widgetsOutputPath);
  // Init widgets
  initialize(widgetsOutputPath,config, true);
})
