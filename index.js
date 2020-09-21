"use strict";

// Require Internal Dependencies
const { isIterable, isValidStringPrimitive } = require("./src/utils.js");

class FrequencySet {
    #data = new Map();

    constructor(iterable = []) {
        if (iterable === null || iterable === undefined) {
            return;
        }
        if (!isIterable(iterable)) {
            throw new TypeError("object is not iterable (cannot read property Symbol(Symbol.iterator))");
        }
        for (const value of iterable) {
            this.add(value);
        }
    }

    add(value) {
        if (this.#data.has(value)) {
            this.#data.get(value).count++;
        }
        else {
            this.#data.set(value, { count: 1 });
        }

        return this;
    }

    clear() {
        this.#data.clear();
    }

    delete(value) {
        return this.#data.delete(value);
    }

    * entries() {
        for (const [value, { count }] of this.#data.entries()) {
            yield [value, count];
        }
    }

    * [Symbol.iterator]() {
        yield* this.entries();
    }

    forEach(callback, thisArg) {
        for (const [value, count] of this.entries()) {
            callback.call(thisArg, value, count, this);
        }
    }

    has(value) {
        return this.#data.has(value);
    }

    values() {
        return this.#data.keys();
    }

    toJSON() {
        const payload = [];
        for (const [value, count] of this.entries()) {
            if (isValidStringPrimitive(value)) {
                payload.push([String(value), count]);
            }
        }

        return payload;
    }
}

module.exports = FrequencySet;
