require('laravel-mix')
    .setPublicPath('./')
    .disableSuccessNotifications()
    .autoload({
        popper: ['Popper'],
    })
    .js('vue/main.js', 'assets/js/app.js')
    .extract([
        'axios',
        'collect.js',
        'popper.js',
        'vue',
        'vue-router',
        'vuex',
    ])
