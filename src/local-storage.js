var supportsLocalStorage = !!window.localStorage;

module.exports = storage;
module.exports.remove = remove;
module.exports.testTeardown = testTeardown;

function storage(key, value) {
    if (typeof key === 'undefined') {
        //Get all
        if (supportsLocalStorage) {
            return localStorage;
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
                $.cookie(key, value, {path: '/'});
            }
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

function testTeardown() {
    var all = storage();
    for (var k in all) {
        if (!all.hasOwnProperty(k)) continue;
        
        var match = k.match(/^__test__(.+)$/);
        if (match) {
            remove(match[1]);
        }
    }
}

function formatKey(key) {
    if (ENV.isTest) {
        key = '__test__'+key;
    }
    return key;
}