
var path = require('path');

var u = require('underscore');

var REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g;
var SLASH_RE = /\\\\/g;

function parseDependencies(code) {
  var ret = [];

  code.replace(SLASH_RE, "")
	  .replace(REQUIRE_RE, function(m, m1, m2) {
		if (m2) {
		  ret.push(m2)
		}
	  });

  return u.uniq(ret);
}

module.exports = function(content, file){

	var root = fis.project.getProjectPath();
	//if(file.isMod){
		//content = 'define(\'' + file.getId() + '\', function(require, exports, module){' + content + '\n\n})';
	//}
		var id = file.getId();
		if(file.isMod && file.isJsLike){
			var deps = ['\'require\'', '\'exports\'', '\'module\''];
			var requires = file.requires;
			if(requires.length == 0){
				requires = parseDependencies(content);
			}
			var inlines = [];
			for(var i=0; i<requires.length; i++){
				var dep = requires[i];
				if(/\?__inline/.test(dep)){
					dep = dep.replace('?__inline', '');
					var inline = dep;
					if(dep.indexOf('.') === 0){
						//dep = path.join(file.subdirname, dep);
					}else{
						inline = path.join('/src/', dep);
					}
					if(!/\.[css|less]$/.test(inline)){
						inlines.push(inline);
					}
				}
				if(dep.indexOf('.') === 0){
					dep = path.join(path.dirname(id), dep);
				}
				deps.push('\'' + dep + '\'');
				//deps.push('\'' + file.requires[i] + '\'');
			}
			content = '/**\n * Build By nfe(base on FIS)\n * @author noahfe@baidu.com\n */\ndefine(\'' + file.getId() + '\', [' + deps.join(',') + '], function(require, exports, module){' + content + '});';
			for(var i=0; i<inlines.length; i++){
				var dep = inlines[i];
				if(!/\.js$/.test(dep)){
					dep += '.js';
				}
				content += '\n__inline(\''+dep+'\');';
			};

			file.isMod = false;
		}
	return content;
}
