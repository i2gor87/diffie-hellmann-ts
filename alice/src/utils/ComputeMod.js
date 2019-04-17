"use strict";
exports.__esModule = true;
var bi = require("big-integer");
exports.computeMod = function (base, pow, modulo) {
    var l = bi(base);
    var s = l.pow(pow);
    var b = s.mod(modulo);
    return b.valueOf();
};
