//http://benalman.com/news/2010/11/immediately-invoked-function-expression/

(function () {
    String.prototype.contains = function contains(str2, caseSensitive = false) {
        if (caseSensitive)
            return this.includes(str2);
        return this.toLowerCase().includes(str2.toLowerCase());
    };
})();