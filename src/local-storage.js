require('jquery-plugins');

var supportsLocalStorage,
    testPrefix,
    testPrefixRegex;

resetSupportsLocalStorage();

resetTestPrefix();

module.exports = storage;

module.exports.originalLocalStorage = localStorage;

module.exports.remove = remove;

module.exports.clear = clear;

module.exports.setSupportsLocalStorage = setSupportsLocalStorage;

module.exports.resetSupportsLocalStorage = resetSupportsLocalStorage;

module.exports.setTestPrefix = setTestPrefix;

module.exports.resetTestPrefix = resetTestPrefix;

module.exports.testTeardown = testTeardown;


function storage(key, value) {
    if (typeof key === 'undefined') {
        //Get all
        if (supportsLocalStorage) {
            var all = {};
            for (var k in localStorage) {
                all[k] = localStorage[k];
            }
            return all;
        } else {
            return $.cookie();
        }
    } else {
        key = formatKey(key);

        if (typeof value === 'undefined') {
            //Get one
            if (supportsLocalStorage) {
                return localStorage[key];
            } else {
                return $.cookie(key);
            }
        } else {
            //Set one
            if (supportsLocalStorage) {
                localStorage[key] = value;
            } else {
                $.cookie(key, value, {path: '/', expires: 365});
            }
            return value;
        }
    }
}

function remove(key) {
    key = formatKey(key);

    if (supportsLocalStorage) {
        delete localStorage[key];
    } else {
        $.removeCookie(key, {path: '/'});
    }
}

function clear() {
    if (supportsLocalStorage) {
        localStorage.clear();
    } else {
        var all = $.cookie();
        for (var k in all) {
            $.removeCookie(k);
        }
    }
}

function setSupportsLocalStorage(s) {
    supportsLocalStorage = s;
}

function resetSupportsLocalStorage() {
    supportsLocalStorage = !!window.localStorage;
}

function setTestPrefix(p) {
    testPrefix = p;
    testPrefixRegex = new RegExp('^'+testPrefix+'(.+)$');
}

function resetTestPrefix() {
    setTestPrefix('__test__');
}

function testTeardown() {
    var all = storage();
    for (var k in all) {
        if (!all.hasOwnProperty(k)) continue;
        
        var match = k.match(testPrefixRegex);
        if (match) {
            remove(match[1]);
        }
    }
}

function formatKey(key) {
    if (ENV.isTest) {
        key = testPrefix+key;
    }
    return key;
}