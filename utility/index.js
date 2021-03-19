const rest = require('rest');

module.exports = {
  KebabToCamel: (string) => {
    // Take a string written in kebab-case end return a string in camelCase
    string = string.replace(/-([a-z]|[0-9])/g, function (g) {
      return g[1].toUpperCase();
    });
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  CamelToKebab: (string) => {
    // Take a string written in camelCase end return a string in kebab-case
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  },
  extractBody: (string) => {
    // Take an html page as a string and return its body content as string
    if(string.indexOf('<body') >= 0){
      var content = string.split('<body')[1];
      content = content.substr( (1 + content.indexOf(">")));
      content = content.split('</body>')[0];
      content = content.substr(0,content.indexOf("<script"));
    } else {
        content = string;
    }
    const regex_attributes = /<([a-z][a-z0-9]*)(?:[^>]*(\s(type *= *|class *= *|scope *= *|colspan *= *|target *= *|title *= *)['"][^'"]*['"]))?[^>]*?(\/?)>/ig;
    const regex_comments = /<!--(.*?)-->/ig;
    const regex_input = /<input (?:[^>]*(\s(type *= *|class *= *)['"][^'"]*['"]))?[^>]*?(\/?)>/ig;

    content=content.replace(regex_attributes,'<$1$2>');
    content=content.replace(/class *= */ig,'className=');
    content=content.replace(regex_input, '<input />');
    content=content.replace(regex_comments,'');
    return content;
  },
  getDataFromUrl: (url) => {
    return rest(url).then(
      function(response) {
        return response.entity;
      },
      function(response) {
        return [];
      }
    );
  } 
}
