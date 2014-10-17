
var colors = require('colors');

exports.log = function (type, msg, color) {
    color = color || 'grey';
    var pad = Array(Math.max(0, 10 - type.length) + 1).join(' '),
        m = type === 'warn' || type === 'error' ? type : 'log';
    console[m]((pad + type).green, msg[color]);
};

exports.warn = function (msg) {
    exports.log('WARN', msg, 'yellow');
};

exports.error = function (msg) {
    exports.log('ERROR', msg, 'red');
};

exports.fatal = function (err) {
    //if (typeof err === 'string') err = new Error(err);
    exports.error(new String(err));
    process.exit(1);
};
