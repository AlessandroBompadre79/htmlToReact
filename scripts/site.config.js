const utility = require('./utility/index');

async function waitForData() {
  try {
    var jsonSchema = await utility.getDataFromUrl('http://localhost:3000/jsonSchema');
    jsonSchema = JSON.parse(jsonSchema);
    var uiSchema = await utility.getDataFromUrl('http://localhost:3000/uiSchema');
    uiSchema = JSON.parse(uiSchema);
    var services = await utility.getDataFromUrl('http://localhost:3000/services');
    services = JSON.parse(services);

    return { 
      site: {
        title: 'GFTgen',
        description: 'GFT Static Site Generator in Node.js',
        basePath: process.env.NODE_ENV === 'production' ? '/GFTgen' : '',
        jsonSchema: jsonSchema,
        uiSchema: uiSchema,
        services: services
      },
      build: {
        srcPath: '/src',
        outputPath: '/src/pages/generated',
        widgetsOutputPath: '/src/widgets/generated',
        servicesOutputPath: '/src/services/generated',
      }
    };
  } catch(err) {
    console.log(err);
    return [];  
  }
}

module.exports = {
  init: async () =>{
    let projects = await waitForData();
    return projects;
  } 
};
