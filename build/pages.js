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
const init = configPromise.init();

const renderLayout = (templateConfig, pageContent) => {
  const layoutFileName = `../templates/layouts/default.ejs`;
  const layoutData = fse.readFileSync(layoutFileName, 'utf-8');
  return ejs.render(
    layoutData,
    Object.assign({}, templateConfig, {
      body: pageContent,
      filename: layoutFileName
    })
  );
};

const initialize = (files, subfolder, distPath, config, isWidget) => {
  files.forEach((file) => {
    const fileData = path.parse(file);
    let destPath = '';
    destPath = path.join(distPath, fileData.dir);
    fse.mkdirsSync(destPath);

    // Read page file
    const data = fse.readFileSync(`../${subfolder}/${file}`, 'utf-8');

    // Generate templateConfig
    const pageData = frontMatter(data);
    const templateConfig =  Object.assign({}, config, {
      page: pageData.attributes
    });

    // Generate files
    // Generate page content according to file type
    let pageContent = pageContentGenerator.generate(fileData, pageData, subfolder,templateConfig, file, srcPath);

    // Render layout with page contents
    const completePage = renderLayout(templateConfig, pageContent);

    // Save the html file
    fse.writeFileSync(`${destPath}/${fileData.name}.template.jsx`, completePage);

    fileGenerator.generateComponents(srcPath, fileData, '.js');
    fileGenerator.generateTranslationFiles(srcPath, fileData, '.js' );
    fileGenerator.generateRoutes(srcPath, files);
    fileGenerator.generateTestFiles(srcPath, fileData.name, '.test.js', isWidget );
    // Generate Css files
    fse.writeFileSync(`${destPath}/${fileData.name}.component.scss`, ``);
  });
}

init.then((config) => {
  srcPath = `../${args}${config.build.srcPath}`;
  distPath = `../${args}${config.build.outputPath}`;

  // Clear destination folders
  fse.emptyDirSync(distPath);

  // Read pages
  const files = glob.sync('**/*.@(md|ejs|html|htm)', { cwd: `../templates/pages` });

  // Init pages
  initialize(files,'/templates/pages',distPath,config, false);
})
