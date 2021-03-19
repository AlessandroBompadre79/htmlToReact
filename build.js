// Libriries
const fse = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const frontMatter = require('front-matter');
const glob = require('glob');
// Utilities
const fileGenerator = require('./filesGenerator/index');
const pageContentGenerator = require('./pageContentGenerator/index');

// Config
const configPromise = require('./site.config');
const [,, ...args] = process.argv

let srcPath;
let distPath;
let widgetsOutputPath;
let jsonSchema;
let servicesOutputPath;
const init = configPromise.init();

const renderLayout = (pageData, templateConfig, pageContent, isWidget) => {
  const layout = isWidget ? 'widget' : 'default';
  const layoutFileName = `../templates/layouts/${layout}.ejs`;
  const layoutData = fse.readFileSync(layoutFileName, 'utf-8');
  return ejs.render(
    layoutData,
    Object.assign({}, templateConfig, {
      body: pageContent,
      filename: layoutFileName
    })
  );
};

const initializeServices = (config, servicesOutputPath) => {
  for(var j =0; j < config.site.services.length; j++) {
    const destPath = `${servicesOutputPath}/${config.site.services[j].id}`;
    fse.mkdirsSync(destPath);
    fileGenerator.generateServices(destPath, config, '.js', j);
  }
}

const initialize = (files, subfolder, distPath, config, isWidget) => {
  files.forEach((file, i) => {
    const fileData = path.parse(file);
    let destPath = '';
    if(!isWidget) {
      destPath = path.join(distPath, fileData.dir);
      fse.mkdirsSync(destPath);
    }

    // Read page file
    const data = fse.readFileSync(`../${subfolder}/${file}`, 'utf-8');

    // Generate templateConfig
    const pageData = frontMatter(data);
    const templateConfig =  Object.assign({}, config, {
      page: pageData.attributes
    });

    // Generate files
    if(isWidget) {
      for(var j =0; j < config.site.jsonSchema.length; j++) {
        destPath = path.join(distPath, config.site.jsonSchema[j].id);
        fse.mkdirsSync(destPath);
        fileGenerator.generateWidgets(srcPath, config, '.js', j);
        fileGenerator.generateTestFiles(srcPath, config.site.jsonSchema[j].id, '.test.js', isWidget );
        // Generate Css files
        fse.writeFileSync(`${destPath}/${config.site.jsonSchema[j].id}.component.scss`, ``);
      }
    } else {
      // Generate page content according to file type
      let pageContent = pageContentGenerator.generate(fileData, pageData, subfolder,templateConfig, file, srcPath);

      // Render layout with page contents
      const completePage = renderLayout(pageData, templateConfig, pageContent, isWidget);

      // Save the html file
      fse.writeFileSync(`${destPath}/${fileData.name}.template.jsx`, completePage);

      fileGenerator.generateComponents(srcPath, fileData, '.js');
      fileGenerator.generateTranslationFiles(srcPath, fileData, '.js' );
      fileGenerator.generateRoutes(srcPath, files);
      fileGenerator.generateTestFiles(srcPath, fileData.name, '.test.js', isWidget );
      // Generate Css files
      fse.writeFileSync(`${destPath}/${fileData.name}.component.scss`, ``);
    }
  });
}

init.then((config) => {
  srcPath = `../${args}${config.build.srcPath}`;
  distPath = `../${args}${config.build.outputPath}`;
  widgetsOutputPath = `../${args}${config.build.widgetsOutputPath}`;
  servicesOutputPath = `../${args}${config.build.servicesOutputPath}`;
  console.log(widgetsOutputPath);
  jsonSchema = config.site.jsonSchema;

  // Clear destination folders
  fse.emptyDirSync(distPath);
  fse.emptyDirSync(widgetsOutputPath);

  // Read pages
  const files = glob.sync('**/*.@(md|ejs|html|htm)', {
    cwd: `../templates/pages`
  });
  console.log(files);

  // Init pages
  initialize(files,'/templates/pages',distPath,config, false);


  // Read widgets
  const widgets = glob.sync('**/*.@(md|ejs|html|htm)', {
    cwd: `../templates/widgets`
  });

  // Init widgets
  initialize(widgets,'/templates/widgets',widgetsOutputPath,config, true);
  initializeServices(config, servicesOutputPath);
})
