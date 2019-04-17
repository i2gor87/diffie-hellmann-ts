"use strict";
exports.__esModule = true;
var GenerateRandomPrimeNumber_1 = require("./GenerateRandomPrimeNumber");
var ComputeMod_1 = require("./ComputeMod");
exports.generateG = function (p) {
    var g;
    for (g = p; g < p + 1000; g++) {
        if (GenerateRandomPrimeNumber_1.isPrime(g)) {
            if (ComputeMod_1.computeMod(g, p - 1, p) == 1) {
                return g;
            }
        }
    }
};
