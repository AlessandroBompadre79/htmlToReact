const ejs = require('ejs');
const marked = require('marked');
const utility = require('../utility/index');

module.exports = {
    generate: (fileData, pageData, subfolder,templateConfig, file, srcPath) => {
        let pageContent;
        // generate page content according to file type
        switch (fileData.ext) {
          case '.md':
            pageContent = marked(pageData.body);
            break;
          case '.ejs':
            pageContent = ejs.render(pageData.body, templateConfig, {
              filename: `${srcPath}${subfolder}/${file}`
            });
            break;
          case '.htm':
          case '.html':
              pageContent = utility.extractBody(pageData.body);
            break;
          default:
            pageContent = pageData.body;
        }
        return pageContent;
    }
}