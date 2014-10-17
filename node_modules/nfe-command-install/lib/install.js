
var Download = require('download');
var progress = require('download-status');

var util = require('./util.js');

exports.install = function(name, version, opt){
	version = version === '*' ? 'latest' : (version || 'latest');
	var remote = opt.remote.replace(/^\/$/, '');
	//https://github.com/nfe-repos/jquery/archive/0.0.1.tar.gz
	//var url = remote + '/' + name + '/archive/' + version + '.tar.gz';

//	https://codeload.github.com/opedfe/nfe/tar.gz/v0.0.2
	var url = remote + '/' + name + '/tar.gz/' + version;
	var extract = opt.extract || process.cwd();

	util.log('url', url);
	util.log('dest', extract);

	var download = new Download()
		.get(url, extract, {extract:true, strip:0});
	//download.use(progress());

	download.run(function(err, files){
		if(err){
			util.fatal(err);
		}else{
			util.log('INFO', '下载成功', 'green');
		}
	});
};
