const mix = require('laravel-mix')
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.autoload({
    jquery: ['$', 'jQuery', 'jquery', 'window.jQuery']
})

mix.js('resources/js/admin-lte.js', 'public/js')
    .js('resources/js/auth.js', 'public/js')
    .js('resources/js/userIndex.js', 'public/js')
    .js('resources/js/user.js', 'public/js')
    .sass('resources/sass/admin-lte.scss', 'public/css')

// mix.js('resources/assets/js/auth.js', 'public/js').sass(
//     'resources/assets/sass/auth.scss',
//     'public/css'
// )

mix.extract(['jquery', 'bootstrap', 'lodash'], 'public/js/vendor.js')

mix.version()

mix.setPublicPath('public')

// mix.js('resources/js/app.js', 'public/js')
//     .js('resources/js/auth.js', 'public/js')
//     .js('resources/js/userIndex.js', 'public/js')
//     .js('resources/js/user.js', 'public/js')
//     .sass('resources/sass/app.scss', 'public/css')
//     .autoload({})

// mix.js('resources/js/app.js', 'public/js')
//     .js('resources/js/auth.js', 'public/js')
//     .js('resources/js/userIndex.js', 'public/js')
//     .js('resources/js/user.js', 'public/js')
//     .sass('resources/sass/app.scss', 'public/css')
//     .autoload({
//         jquery: ['$', 'jQuery', 'window.jQuery']
//     })
