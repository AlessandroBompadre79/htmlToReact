const fse = require('fs-extra');
const fileGenerator = require('./filesGenerator/index');
const configPromise = require('./site.config');

const [,, ...args] = process.argv
let servicesOutputPath;
const init = configPromise.init();

const initializeServices = (config, servicesOutputPath) => {
  for(var j =0; j < config.site.services.length; j++) {
    const destPath = `${servicesOutputPath}/${config.site.services[j].id}`;
    fse.mkdirsSync(destPath);
    fileGenerator.generateServices(destPath, config, '.js', j);
  }
}

init.then((config) => {
  servicesOutputPath = `../${args}${config.build.servicesOutputPath}`;
  console.log(servicesOutputPath);
  // Clear destination folders
  fse.emptyDirSync(servicesOutputPath);
  // gen rest services' calls
  initializeServices(config, servicesOutputPath);
})
