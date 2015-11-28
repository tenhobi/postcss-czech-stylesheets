# <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg" alt="Czech Republic" height="32px" width="auto"> PostCSS Czech Stylesheets

> [PostCSS](https://github.com/postcss/postcss) plugin for writing Czech Style Sheets.

## Installation

```console
$ npm install postcss-czech-stylesheets --save-dev
```

## Preview

### Input

```css
.foo {
    barva: bílá;
    pozadí: bílé !důležité;
}
```

### Output

```css
.foo {
    color: white;
    background: white !important;
}
```

## Usage

### Gulp

```js
var gulp = require('gulp');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var czechCSS = require('postcss-czech-stylesheets');
var autoprefixer = require('autoprefixer-core')

gulp.task('default', function () {
    var processors = [
        autoprefixer({ browsers: ['> 0%'] }),
        czechCSS()
    ];
    gulp.src('src/**/*.css')
        .pipe(postcss(processors))
        .pipe(rename('output.css'))
        .pipe(gulp.dest('build'))
});
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
