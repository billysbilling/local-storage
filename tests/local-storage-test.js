var localStorage = require('../src/local-storage');

[false, true].forEach(function(supportsLocalStorage) {

    QUnit.module(supportsLocalStorage ? 'local-storage' : 'cookie', {
        setup: function() {
            localStorage.setSupportsLocalStorage(supportsLocalStorage);
            localStorage.setTestPrefix('');
        },
        teardown: function() {
            localStorage.clear();
            localStorage.resetTestPrefix();
            localStorage.resetSupportsLocalStorage();
        }
    });
    
    test('Set returns the value', function() {
        equal(localStorage('mykey', 'hello'), 'hello');
    });
    
    test('Get can read what was set', function() {
        localStorage('mykey', 'hello')
        equal(localStorage('mykey'), 'hello');
    });
    
    test('Get all when empty', function() {
        deepEqual(localStorage(), {});
    });
    
    test('Get all with contents', function() {
        localStorage('a', 'Jane');
        localStorage('b', 'John');
        deepEqual(localStorage(), {a: 'Jane', b: 'John'});
    });
    
    test('String is left as a string', function() {
        localStorage('a', 'John');
        equal(localStorage('a'), 'John');
    });
    
    test('Number is converted to string', function() {
        localStorage('a', 123);
        equal(localStorage('a'), '123');
        
        localStorage('a', 123.456);
        equal(localStorage('a'), '123.456');
    });
    
    test('Boolean is converted to string', function() {
        localStorage('a', true);
        equal(localStorage('a'), 'true');
    
        localStorage('a', false);
        equal(localStorage('a'), 'false');
    });
    
    test('remove', function() {
        localStorage('a', 'John');
        localStorage.remove('a');
        equal(localStorage('a'), undefined);
    });
    
    test('clear', function() {
        localStorage('a', 'John');
        localStorage('b', 'Jane');
        localStorage.clear();
        deepEqual(localStorage(), {});
        equal(localStorage('a'), undefined);
        equal(localStorage('b'), undefined);
    });
    
    test('testTeardown', function() {
        localStorage.resetTestPrefix();
        localStorage('a', 'John');
        localStorage('b', 'Jane');
        localStorage.clear();
        deepEqual(localStorage(), {});
        equal(localStorage('a'), undefined);
        equal(localStorage('b'), undefined);
    });
});