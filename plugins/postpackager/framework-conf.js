
var path = require('path');

module.exports = function(ret, conf, settings, opt){

	//var map = fis.config.get('framework', {});
	//
	var fis_nfejs_conf = fis.config.get('nfejs', {});
	//编译时间戳
	fis_nfejs_conf.urlArgs = '_=' + (new Date()).getTime();
	/**
	fis_nfejs_conf.alias = fis_nfejs_conf.alias || {};
	fis.util.map(ret.map.res, function(id, res){
		if(typeof res.pkg != 'undefined' && res.deps && res.deps.length > 0){
			var p = ret.map.pkg[res.pkg];
			fis_nfejs_conf.alias[id] = p.uri;
		}else{
			fis_nfejs_conf.alias[id] = res.uri;
		}
	});
	*/
	/*
	fis_nfejs_conf.map = fis_nfejs_conf.map || {};
	fis_nfejs_conf.map['*'] = fis_nfejs_conf.map['*'] || {};
	fis.util.map(ret.map.res, function(id, res){
		if(typeof res.pkg != 'undefined' && res.deps && res.deps.length > 0){
			var p = ret.map.pkg[res.pkg];
			fis_nfejs_conf.map['*'][id] = p.uri.replace(/\.js$/, '');
		}else{
			fis_nfejs_conf.map['*'][id] = res.uri.replace(/\.js$/, '');
		}
	});
	//fis_nfejs_conf.paths = fis_nfejs_conf.map['*'];
	fis_nfejs_conf.map = {};
	*/
	//构造nfejs的config.js配置文件
	var nfejs_config = fis.file(fis.project.getProjectPath(), 'nfe-config.js');
	//拼接字符串，生成nfe.setConfig调用
	nfejs_config.setContent('require.config(' + JSON.stringify(fis_nfejs_conf, null, opt.optimize ? null : 4) + ');');
	//把新生成的文件放到打包文件输出表
	ret.pkg[nfejs_config.subpath] = nfejs_config;
	//构造页面插入的script标签内容
	var script = '<script src="' + nfejs_config.getUrl(opt.hash, opt.domain) + '"></script>';
	//找到所有的源码文件，对其进行配置文件script标签插入
	fis.util.map(ret.src, function(subpath, file){
		var id = file.getId();
		/**
		if(file.isMod && file.isJsLike){
			var deps = [];
			for(var i=0; i<file.requires.length; i++){
				var dep = file.requires[i];
				if(dep.indexOf('.') === 0){
					dep = path.join(path.dirname(id), dep);
				}
				deps.push('\'' + dep + '\'');
				//deps.push('\'' + file.requires[i] + '\'');
			}
			var cnt = file.getContent();
			cnt = 'define(\'' + file.getId() + '\', [' + deps.join(',') + '], function(require, exports, module){' + cnt + '});';
			file.setContent(cnt);
			//ret.pkg[subpath + '.js'] = file;
		}
		*/
		if(file.isHtmlLike){
			var cnt = file.getContent();
			//if(/\bnfe\.use\s*\(/.test(cnt)){//有用到nfe.use才插入配置
				cnt = cnt.replace(/<\/head>/, script + '\n$&');
				file.setContent(cnt);
		//	}
		}
	});

};
