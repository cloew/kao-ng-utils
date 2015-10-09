module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        spider_script: {
            options: {
                sourcemap: false
            },
            utils: {
                files: {
                    'dist/kao_utils.js': 'kao_utils.spider'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-spider-script');

    // Default task(s).
    grunt.registerTask('default', ['spider_script']);
};