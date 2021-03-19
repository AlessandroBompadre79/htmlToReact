const imported = {
  routesGenerator: require('./generators/routes/generateRoutes'),
  componentsGenerator: require('./generators/components/generateComponents'),
  testFilesGenerator: require('./generators/testfiles/generateTestFiles'),
  translationFilesGenerator: require('./generators/components/generateComponentTranslate'),
  widgetsGenerator: require('./generators/widgets/generateWidgets'),
  servicesGenerator: require('./generators/services/generateServices'),
};

module.exports = {
  generateRoutes: (srcPath, files,) => {
    // Generate routes file
    imported.routesGenerator.generate(srcPath, files);
  },
  generateComponents: (srcPath, fileData, ext) => {
    // Generate components
    imported.componentsGenerator.generate(srcPath, fileData, ext);
  },
  generateWidgets: (srcPath, config, ext, i) => {
    // Generate widgets
    imported.widgetsGenerator.generate(srcPath, config, ext, i);
  },
  generateServices: (srcPath, config, ext, i) => {
    // Generate services
    imported.servicesGenerator.generate(srcPath, config, ext, i);
  },
  generateTestFiles: (srcPath, fileData, ext, widget) => {
    // Generate test files
    imported.testFilesGenerator.generate(srcPath, fileData, ext, widget)
  },
  generateTranslationFiles: (srcPath, fileData, ext, widget) => {
    // Generate test files
    imported.translationFilesGenerator.generate(srcPath, fileData, ext, widget)
  }
}
