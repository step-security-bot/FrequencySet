"use strict";

function isIterable(object) {
    return typeof object[Symbol.iterator] === "function";
}

function isValidStringPrimitive(value) {
    const vT = typeof value;

    return !(vT === "function" || (vT === "object" && value !== null));
}

module.exports = { isIterable, isValidStringPrimitive };
