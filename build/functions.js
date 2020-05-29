"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binaryXOR = exports.hexToBinary = void 0;
var lookup = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    a: '1010',
    b: '1011',
    c: '1100',
    d: '1101',
    e: '1110',
    f: '1111',
    A: '1010',
    B: '1011',
    C: '1100',
    D: '1101',
    E: '1110',
    F: '1111',
};
function hexToBinary(s) {
    let ret = '';
    for (var i = 0, len = s.length; i < len; i++) {
        ret += lookup[s[i]];
    }
    return ret;
}
exports.hexToBinary = hexToBinary;
function binaryXOR(s1, s2) {
    let result = '';
    if (s1.length != s2.length) {
        throw 'Strings must be of  the same length';
    }
    for (let i = 0; i < s1.length; i++) {
        if (s1.charAt(i) == s2.charAt(i)) {
            result = result + '0';
        }
        else {
            result = result + '1';
        }
    }
    return result;
}
exports.binaryXOR = binaryXOR;
