var plugins = {
	define: require('../plugins/postprocessor/define.js'),
	postprocessor: require('../plugins/postprocessor/postprocessor.js'),
	packager: require('../plugins/packager.js'),
	prepackager: require('../plugins/prepackager.js'),
	frameworkConf: require('../plugins/postpackager/framework-conf.js')
};

module.exports = {
	modules:{
		parser:{
			md:'marked',
			less:'less',
			coffee:'coffee-script'
		},
		lint:{
			js:'jshint'
		},
		preprocessor:{
			js: plugins.define
		},
		postprocessor:{
			//js: plugins.postprocessor
		},
		//prepackager:[plugins.prepackager],
		//packager:[plugins.packager],
		postpackager:[plugins.frameworkConf]
	},
	settings:{
		lint:{
			jshint:{
				ignored:['libs/**', 'dep/**'],
				i18n:'zh-CN'
			}
		},
		optimizer:{
			'uglify-js':{
				//不压缩require关键字，nfejs需要
				except:['require']
			}
		}
	},
	roadmap:{
		ext:{
			less:'css',
			coffee:'js',
			md:'html'
		},
		path:[{
			reg: /^\/nfe\/(.*)$/i,
			useComplie:false,
			release: false
		},{
			//reg:/^\/dep\/(\w+(?:\/[\d\.]*)?)\/(\w+)\.(js|coffee|less|css)$/i,
			reg:/^\/dep\/(.*)\.(js|coffee|less|css)$/i,
			isMod:false,
			useSprite:true,
			id:'$1',
			url:'${urlPrefix}/static/dep/$1.$2',
			release:'/static/dep/$1.$2'
		},{
			reg:/^\/dep\/(.*)\.(gif|png|jpg|jpeg|bmp)$/i,
			useSprite:false,
			url:'${urlPrefix}/static/dep/img/$1.$2',
			release:'/static/dep/img/$1.$2'
		},{
			reg:/^\/dep\/(.*)\.(eot|ttf|woff|svg)$/i,
			useSprite:false,
			url:'${urlPrefix}/static/dep/fonts/$1.$2',
			release:'/static/dep/fonts/$1.$2'
		},{
			reg:/^\/libs\/(.*\.(js|coffee|less|css))$/i,
			isMod:false,
			useSprite:true,
			id:'$1',
			url:'${urlPrefix}/static/libs/$1',
			release:'/static/libs/$1'
		},{
			reg:/^\/src\/(.*)\.(js|coffee)$/i,
			isMod:true,
			useSprite:true,
			id:'$1',
			url:'${urlPrefix}/static/js/$1.$2',
			release:'/static/js/$1.$2'
		},{
			reg:/^\/src\/(.*)\.(less|css)$/i,
			isMod:true,
            isCssLike:true,
			useSprite:true,
			id:'$1.css',
			url:'${urlPrefix}/static/css/$1',
			release:'/static/css/$1'
		},{
			reg:/^\/src\/(.*)\.(gif|png|jpg|jpeg|bmp)$/i,
			useSprite:true,
			url:'${urlPrefix}/static/img/$1.$2',
			release:'/static/img/$1.$2'
		},{
			reg:/^\/(nfe-config\.js)$/i,
			useSprite:true,
			url:'${urlPrefix}/static/$1',
			release:'/static/$1'
		},{
			reg:/\.mixin\.less$/,
			release:false
		},{
			reg:/\.(js|coffee|less|css)$/,
			useSprite:true,
			useMap:false
		},{
			reg:/\/src\/(.*\.(?:htm|html|php|jsp))$/,
			useSprite:true,
			isHtmlLike: true,
			release:'/template/$1'
		},{
			reg:'**',
			useHash:false,
			useComplie:false
		}]
	}
};
