var storage = require('../src/storage');

[false, true].forEach(function(supportsLocalStorage) {

    QUnit.module(supportsLocalStorage ? 'localStorage' : 'cookie', {
        setup: function() {
            storage.setSupportsLocalStorage(supportsLocalStorage);
            storage.setTestPrefix('');
        },
        teardown: function() {
            storage.clear();
            storage.resetTestPrefix();
            storage.resetSupportsLocalStorage();
        }
    });
    
    test('Set returns the value', function() {
        equal(storage('mykey', 'hello'), 'hello');
    });
    
    test('Get can read what was set', function() {
        storage('mykey', 'hello')
        equal(storage('mykey'), 'hello');
    });
    
    test('Get all when empty', function() {
        deepEqual(storage(), {});
    });
    
    test('Get all with contents', function() {
        storage('a', 'Jane');
        storage('b', 'John');
        deepEqual(storage(), {a: 'Jane', b: 'John'});
    });
    
    test('String is left as a string', function() {
        storage('a', 'John');
        equal(storage('a'), 'John');
    });
    
    test('Number is converted to string', function() {
        storage('a', 123);
        equal(storage('a'), '123');

        storage('a', 123.456);
        equal(storage('a'), '123.456');
    });
    
    test('Boolean is converted to string', function() {
        storage('a', true);
        equal(storage('a'), 'true');

        storage('a', false);
        equal(storage('a'), 'false');
    });
    
    test('remove', function() {
        storage('a', 'John');
        storage.remove('a');
        equal(storage('a'), undefined);
    });
    
    test('clear', function() {
        storage('a', 'John');
        storage('b', 'Jane');
        storage.clear();
        deepEqual(storage(), {});
        equal(storage('a'), undefined);
        equal(storage('b'), undefined);
    });
    
    test('testTeardown', function() {
        storage.resetTestPrefix();
        storage('a', 'John');
        storage('b', 'Jane');
        storage.clear();
        deepEqual(storage(), {});
        equal(storage('a'), undefined);
        equal(storage('b'), undefined);
    });
});