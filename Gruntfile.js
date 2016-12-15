 module.exports = function(grunt) {

     grunt.initConfig({
         pkg: grunt.file.readJSON('package.json'),

         notify_hooks: {
             options: {
                 enabled: true,
                 max_jshint_notifications: 1, // maximum number of notifications from jshint output
                 title: "Commerce.js", // defaults to the name in package.json, or will use project directory's name
                 success: true, // whether successful grunt executions should be notified automatically
                 duration: 3 // the duration of notification in seconds, for `notify-send only
             }
         },

         coffee: {
             compileBare: {
                 options: {
                     bare: true
                 },
                 files: {
                     'dist/commerce.unminified.js': [
                         'commerce.coffee',
                         'js/ajax.coffee',
                         'js/storage.coffee',
                         'js/abstract.coffee',
                         'features/*.coffee'
                     ],
                 }
             },
         },

         uglify: {
           options: {
        mangle: true,
        compress: {
            drop_console: false
          }
      },
    my_target: {
      files: {
        'dist/commerce.js': ['dist/commerce.unminified.js'],
        '../checkout.v1/public/js/commerce.js': ['dist/commerce.unminified.js']
      }
    }
  },

         watch: {
             js: {
                 files: ['*.coffee', 'js/*.coffee', 'features/*.coffee'],
                 tasks: ['coffee', 'uglify']
             },

         }

     });

     grunt.loadNpmTasks('grunt-notify');
     grunt.loadNpmTasks('grunt-contrib-coffee');
     grunt.loadNpmTasks('grunt-contrib-watch');
     grunt.loadNpmTasks('grunt-contrib-concat');
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.task.run('notify_hooks');
     grunt.registerTask('default', ['watch']);

 };
