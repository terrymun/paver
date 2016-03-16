module.exports = {

    options: {
        reporter: require('jshint-stylish')
    },

    main: [
        'src/js/*.js',
        'demo/src/js/*.js'
    ]
};