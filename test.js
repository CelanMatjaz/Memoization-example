const memoization = require('./memoizaton');
const expect = require('chai').expect;

const sinon = require('sinon');
const clock = sinon.useFakeTimers();

// hint: use https://sinonjs.org/releases/v6.1.5/fake-timers/ for faking timeouts

describe('memoization', function () {
    it('should memoize function result', () =>{
        let returnValue = 5;
        const testFunction = (key) => returnValue;

        const memoized = memoization.memoize(testFunction, (key) => key, 1000);
        expect(memoized('c544d3ae-a72d-4755-8ce5-d25db415b776')).to.equal(5);

        returnValue = 10;

        // TODO currently fails, should work after implementing the memoize function, it should also work with other
        // types then strings, if there are limitations to which types are possible please state them
        expect(memoized('c544d3ae-a72d-4755-8ce5-d25db415b776')).to.equal(5);
    });

    // TODO additional tests required


    //Test to see if the memoized function really returns the new value after 1000 ms have passed
    it('should change function result after 1010 miliseconds', () => {
        let returnValue = 5;
        const testFunction = (key) => returnValue;

        const memoized = memoization.memoize(testFunction, (key) => key, 1000);
        expect(memoized(1)).to.equal(5);

        returnValue = 10;

        clock.tick(1010);
        expect(memoized(1)).to.equal(10);
    });

    //Test to see if the memoized function works with more than 1 parameter
    it('should work with more than 1 argument', () => {
        const testFunction = (arg1, arg2, arg3) => arg1 + arg2 + arg3;

        const memoized = memoization.memoize(testFunction, (arg1, arg2, arg3) => arg1 + arg2 + arg3, 1000);
        expect(memoized('1', '2', '3')).to.equal('123');
        expect(memoized(1, '2', false)).to.equal('12false');
    });

    //Test to see if the memoized function works without a resolver
    it('should work without a resolver', () => {
        const testFunction = (arg1, arg2, arg3) => arg1 + arg2 + arg3;
        const memoized = memoization.memoize(testFunction);
        expect(memoized('1', '2', '3')).to.equal('123');
    });

    //Test to see if the memoized function still works with more parameters than the testFunction handles
    it('should work with more arguments than specified', () => {
        const testFunction = (arg1, arg2, arg3) => arg1 + arg2 + arg3;
        const memoized = memoization.memoize(testFunction, key => key, 1000);
        expect(memoized('1', '2', '3', '4', '5')).to.equal('123'); 
    });
});