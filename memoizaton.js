/**
 * Creates a function that memoizes the result of func. If resolver is provided,
 * it determines the cache key for storing the result based on the arguments provided to the memorized function.
 * By default, the first argument provided to the memorized function is used as the map cache key. The memorized values
 * timeout after the timeout exceeds. The timeout is in defined in milliseconds.
 *
 * Example:
 * function addToTime(year, month, day) {
 *  return Date.now() + Date(year, month, day);
 * }
 *
 * const memoized = memoization.memoize(addToTime, (year, month, day) => year + month + day, 5000)
 *
 * // call the provided function cache the result and return the value
 * const result = memoized(1, 11, 26); // result = 1534252012350
 *
 * // because there was no timeout this call should return the memorized value from the first call
 * const secondResult = memoized(1, 11, 26); // secondResult = 1534252012350
 *
 * // after 5000 ms the value is not valid anymore and the original function should be called again
 * const thirdResult = memoized(1, 11, 26); // thirdResult = 1534252159271
 *
 * @param func      the function for which the return values should be cached
 * @param resolver  if provided gets called for each function call with the exact same set of parameters as the
 *                  original function, the resolver function should provide the memoization key.
 * @param timeout   timeout for cached values in milliseconds
 */


function memoize(func, resolver, timeout) {
    // TODO implement the memoize function

    //The cache object for storing  the values
    const cache = {};

    //Returns a function 
    return (...args) => {
        //Sets the object index/property to the output of resolver or to the first argument if resolver is not provided
        const index = resolver ? resolver(...args).toString() : args[0].toString();

        /*
            Checks if the cache at the index is equal to null, if it is, 
            it sets the cache at the index to the result of func with all the parameters
        */
        if(!cache[index]) cache[index] = func(...args);

        //SetTimeout that sets the value at the index to null after the desired timeout, effectively deleting the data after the time passes.
        setTimeout(() => cache[index] = null, timeout);

        //Retuns the value at index
        return cache[index];
    };
}

module.exports = {
    memoize,
};

