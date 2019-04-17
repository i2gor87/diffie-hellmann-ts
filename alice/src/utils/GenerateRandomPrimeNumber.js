"use strict";
exports.__esModule = true;
exports.isPrime = function (num) {
    for (var i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0)
            return false;
    return num > 1;
};
var generateRandomNumber = function (length) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
};
exports.generateRandomPrimeNumber = function (ln) {
    var randomLargeInt = generateRandomNumber(ln);
    var randomLargeOddInt = randomLargeInt * 2 - 1;
    while (true) {
        if (exports.isPrime(randomLargeOddInt)) {
            return randomLargeOddInt;
        }
        else {
            randomLargeOddInt = randomLargeOddInt - 1;
        }
    }
};
