(function () {
    String.prototype.ToCode = function ToCode(separator = ' ') {
        var splittedStr = this.split(separator);
        var result = '';
        for (var str of splittedStr) {
            result += (str[0] + '');
        }
        return result.toUpperCase();
    };
})();