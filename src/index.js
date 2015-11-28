var postcss = require('postcss');
var CZproperties = require('./properties.js');
var CZvalues = require('./values.js');

module.exports = postcss.plugin('postcss-czech-stylesheets', function (opts) {
    opts = opts || {};

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
                    decl.value = decl.value.replace(value, key);
                    continue;
                }

                for (var _key in value) {
                    var _value = value[_key];
                    decl.value = decl.value.replace(_value, key);
                }
            }

            // Important
            if (decl.value.indexOf('!důležité') >= 0) {
                decl.value = decl.value.replace(/\s*!důležité\s*/, '');
                decl.important = true;
            }
        });

    };
});