var postcss = require('postcss');
var CZproperties = require('./properties.js');
var CZvalues = require('./values.js');

module.exports = postcss.plugin('postcss-czech-stylesheets', function (opts) {
    opts = opts || {};

    String.prototype.replaceAll = function(str1, str2, ignore)
    {
        return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
    };

    return function (css) {

        css.walkDecls(function transformDecl(decl) {

            // Check if some Czech property is used and if so then replace it with CSS property.
            for (var key in CZproperties) {
                var value = CZproperties[key];

                if (decl.prop === value) {
                    decl.prop = key;
                }
            }

            // Check if some Czech value is used and if so then replace it with CSS value.
            for (var key in CZvalues) {
                var value = CZvalues[key];

                if (typeof value === 'string') {
                    decl.value = decl.value.replaceAll(value, key);
                    continue;
                }

                for (var _key in value) {
                    var _value = value[_key];
                    decl.value = decl.value.replace(_value, key);
                }
            }

            // Important
            if (decl.value.indexOf('!kurva') >= 0) {
                decl.value = decl.value.replace(/\s*!kurva\s*/, '');
                decl.important = true;
            }
        });

    };
});