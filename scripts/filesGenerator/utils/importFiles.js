const fse = require('fs-extra');

module.exports = {
    import: (file) => fse.readFileSync(file, 'utf-8')
}