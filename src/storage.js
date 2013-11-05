require('jquery-plugins');

var supportsLocalStorage,
    namespace = '';

resetSupportsLocalStorage();

module.exports = storage;

module.exports.remove = remove;

module.exports.clear = clear;

module.exports.setSupportsLocalStorage = setSupportsLocalStorage;

module.exports.resetSupportsLocalStorage = resetSupportsLocalStorage;

module.exports.setNamespace = setNamespace;


function storage(key, value) {
    if (typeof key != null) {
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
    var all = storage();
    for (var k in all) {
        var match = k.match('^'+namespace+'(.+)$');
        if (namespace == null || match == null) {
            remove(key)
        }
    }
}

function setSupportsLocalStorage(s) {
    supportsLocalStorage = s;
}

function resetSupportsLocalStorage() {
    supportsLocalStorage = !!window.localStorage;
}

function setNamespace(p) {
    namespace = p + '_';
}

function formatKey(key) {
    if (ENV.isTest) {
        key = namespace+key;
    }
    return key;
}
