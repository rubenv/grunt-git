'use strict';
// Helper libraries
var uscore = require('underscore');
uscore.string = require('underscore.string');

// Static helper functions
/**
 * Get keys in testObj that are not in standardObj
 * @param [object] standardObj An object that contains acceptable keys
 * @param [object] testObj An object whose keys are compared against standard
 * @return [array] An array of keys that are in testObj but not in standardObj
 */
var getExtraKeys = function (standardObj, testObj) {
    var stdKeys = uscore.keys(standardObj);
    var testKeys = uscore.keys(testObj);
    return uscore.difference(testKeys, stdKeys);
};

// Arg Prototype
/**
 * Constructor for Arg prototype
 * @param [object] config An object with properties for the new Arg
 */
var Arg = function (config) {
    var errorMsg = '';
    // Set default value for config;
    config = config || {};

    // Validate config
    if (!uscore.isObject(config)) {
        errorMsg += 'Invalid config passed to Arg. ';
        errorMsg += 'Expected `object` but receieved ' + typeof config;
        throw new Error(errorMsg);
    }

    // Set default properties
    this.option = undefined;
    this.defaultValue = undefined;
    this.validationFn = undefined;
    this.flag = undefined;
    this.useDasherize = true;
    this.required = false;
    this.useValue = false;
    this.useAsFlag = true;
    this.flagify = undefined;
    this.value = undefined;
    this.customValueFn = undefined;
    this.customFlagFn = undefined;

    // Verify that no invalid keys are specified in config
    var invalidKeys = getExtraKeys(this, config);
    if (invalidKeys.length) {
        errorMsg += 'Unknown values passed to Arg constructor (';
        errorMsg += invalidKeys.join(', ') + ')';
        throw new Error(errorMsg);
    }

    // Extend default options with config;
    uscore.extend(this, config);

    // Verify that required properties have been set
    if (!this.option) {
        errorMsg += 'An `option` property must be specified in Arg';
        throw new Error(errorMsg);
    }
};

/**
 * Validate arg's value.
 * If `arg.validationFn` is a function, then call it to validate
 * If `arg.required == true`, check that
 * arg.value is not undefined, null, or an empty string
 * Note: 'false' and zero are consider valid values.
 * @return [boolean] True if validation succeeds, false if not.
 */
Arg.prototype.validate = function () {
    var testVal = this.value;
    var errorMsg = '';
    if (uscore.isFunction(this.validationFn)) {
        return this.validationFn.call(null, this);
    } else if (this.required) {
        if (uscore.isString(testVal)) {
            testVal = testVal.trim();
        }
        if (testVal === null || testVal === '' || testVal === undefined) {
            errorMsg += this.option + ' is required, but its value is (';
            errorMsg += this.value + ')';
            throw new Error(errorMsg);
        }
    }
    return true;
};

/**
 * Get this arg's flag value.
 * @return [string] The flag or null (see below):
 * If `arg.useAsFlag == false`, then null.
 * If `arg.flag` was explicitly set, then that value.
 * If `arg.useDasherize`, then a dasherized version of arg.option.
 * If `arg.flagify` is a function, then the result of calling flagify.
 * Otherwise, `arg.option`.
 */
Arg.prototype.getFlag = function () {
    if (!this.validate()) {
        throw new Error(this.option + ' failed validation.');
    }
    if (uscore.isFunction(this.customFlagFn)) {
        return this.customFlagFn.call(null, this);
    } else if (this.useAsFlag) {
        // Only return flags for args with non-falsy and zero values
        if (this.value || this.value === 0) {
            if (this.flag) {
                return this.flag;
            } else if (this.useDasherize) {
                return '--' + uscore.string.dasherize(this.option);
            } else if (uscore.isFunction(this.flagify)) {
                return this.flagify.call(null, this);
            } else {
                return this.option;
            }
        }
    }
    return null;
};

/**
 * Set this arg's value.
 * @param [object] Options object containing option:value pairs
 * @return [object] this object
 */
Arg.prototype.setValueFromOptions = function (options) {
    this.value = options[this.option];
    return this;
};

/**
 * Get this arg's value.
 * @param
 * @return [string|int] The arg's value or null (see below):
 * If `arg.useValue == false`, then null.
 * Otherwise, `arg.value`.
 */
Arg.prototype.getValue = function () {
    if (!this.validate()) {
        throw new Error(this.option + ' failed validation.');
    }
    if (uscore.isFunction(this.customValueFn)) {
        return this.customValueFn.call(null, this);
    } else if (this.useValue) {
        if (this.value || this.value === 0) {
            return this.value;
        }
    }
    return null;
};

module.exports = Arg;
