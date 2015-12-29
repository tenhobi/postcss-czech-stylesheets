var postcss = require('postcss');
var CZproperties = require('./properties.js');
var CZvalues = require('./values.js');
var importantValues = ['!kurva', '!dulezite', '!funguj'];

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
                    decl.value = decl.value.replace(new RegExp(value, 'g'), key);
                    continue;
                }

                for (var _key in value) {
                    var _value = value[_key];
                    decl.value = decl.value.replace(_value, key);
                }
            }

            // Replace Important
            for (var i = 0; i < importantValues.length; i++) {
                if (decl.value.indexOf(importantValues[i]) >= 0) {
                    decl.value = decl.value.replace(new RegExp(importantValues[i], 'gi'), '');
                    decl.important = true;
                }
            }

        });

    };
});
