/*
 * fis
 * http://fis.baidu.com/
 */
'use strict';

var installer = require('./lib/install.js');
exports.name = 'install';
exports.usage = '<names> [path] [options]';
exports.desc = 'install components and demos';
exports.register = function(commander){
    
    commander
        .option('--repos <url>', 'repository', String)
        .action(function(){
            var args = Array.prototype.slice.call(arguments);
            var options = args.pop();
            var names = args.shift();
            var path = args.shift();
			/**
            var remote = options.repos || fis.config.get(
                'system.repos',
                fis.project.DEFAULT_REMOTE_REPOS
            ) || 'https://codeload.github.com/nfe-repos'; //.replace(/^\/$/, '') + '/component';
			*/
            var remote = options.repos || 'https://codeload.github.com/nfe-repos';
            var dest = process.cwd();
            if(path){
                if(!fis.util.isAbsolute(path)){
                    dest = fis.util(dest, path);
                }
            }
            var opt = {
                extract : dest,
                remote : remote
            };
            names.split(/,/).forEach(function(name){
                name = name.split('@');
                //fis.util.install(name[0], name[1], opt);
				installer.install(name[0], name[1], opt);
            });
        });
};
