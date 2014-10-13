
module.exports = function(){
	var content = [
	 '         ___    '.blue.bold + '       ___      '.yellow.bold + '     ___     ',
	 '        /\\__\\'.blue.bold + '         /\\  \\'.yellow.bold + '         /\\  \\     ' ,
     '       /::|  | '.blue.bold + '      /::\\  \\ '.yellow.bold + '      /::\\  \\    ' ,
     '      /:|:|  | '.blue.bold + '     /:/\\:\\  \\ '.yellow.bold + '    /:/\\:\\  \\   ' ,
     '     /:/|:|  |__'.blue.bold + '   /::\\~\\:\\  \\'.yellow.bold + '   /::\\~\\:\\  \\  ' ,
     '    /:/ |:| /\\__\\'.blue.bold + ' /:/\\:\\ \\:\\__\\'.yellow.bold + ' /:/\\:\\ \\:\\__\\ ' ,
     '    \\/__|:|/:/  /'.blue.bold + ' \\/__\\:\\ \\/__/'.yellow.bold + ' \\:\\~\\:\\ \\/__/ ' ,
     '        |:/:/  /   '.blue.bold + '    \\:\\__\\ '.yellow.bold + '   \\:\\:\\ \\__\\   ' ,
     '        |::/  /    '.blue.bold + '     \\/__/   '.yellow.bold + '  \\:\\ \\/__/   ' ,
     '        /:/  /      '.blue.bold + '               \\:\\__\\     ' ,
     '        \\/__/      '.blue.bold + '                 \\/__/     ' ,
	 '                    v' + fis.cli.info.version].join('\n');
	console.log(content);
};
