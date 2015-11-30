# <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg" alt="Czech Republic" height="32px" width="auto"> PostCSS Czech Stylesheets

> [PostCSS](https://github.com/postcss/postcss) plugin for writing Czech Style Sheets.

## Installation

```console
$ npm install --save-dev postcss-czech-stylesheets
```

## Example

### Input

```css
.error-msg {
    zobrazení: blok;
    levý-rámeček: 3px pevné červené;
    velikost-písma: 15px;
    výška-řádku: 20px;
    pozadí: průhledné;
    barva: červená !kurva;
}
```

### Output

```css
.error-msg {
    display: block;
    border-left: 3px solid red;
    font-size: 15px;
    line-height: 20px;
    background: transparent;
    color: red !important;
}
```

## Usage

### Gulp

```js
var gulp = require('gulp');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer')
var czechCSS = require('postcss-czech-stylesheets');

gulp.task('default', function () {
    var processors = [
        czechCSS(),
        autoprefixer({ browsers: ['> 0%'] })
    ];
    
    return gulp.src('src/**/*.css')
        .pipe(postcss(processors))
        .pipe(rename('output.css'))
        .pipe(gulp.dest('build'));
});
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
