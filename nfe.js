
var fis = module.exports = require('fis');

fis.require.prefixes = ['nfe', 'fis'];
fis.cli.name = 'nfe';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');
fis.cli.version = require('./version.js');
fis.cli.help.commands = ['release', 'install', 'server'];

var defaultConfig = require('./configs/default.js');
fis.config.merge(defaultConfig);

//alias
Object.defineProperty(global, 'nfe', {
	enumerable:true,
	writable:false,
	value:fis
});
