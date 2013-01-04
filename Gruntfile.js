    /*global config:true, task:true, process:true*/
module.exports = function( grunt ) {

  grunt.initConfig({
    pkg: "<json:package.json>",
    concat: {
      "dist/navigator.getusermedia.js": [ "src/navigator.getusermedia.js" ]
    },
    uglify: {
      "dist/navigator.getusermedia.min.js": [ "dist/navigator.getusermedia.js" ]
    },
    qunit: {
      files: [ "test/**/*.html" ]
    },
    watch: {
      files: "<config:lint.files>",
      tasks: "lint qunit"
    },
    jshint: {
      files: [ "grunt.js", "src/**/*.js", "test/**/*.js" ]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-qunit");

  // Default grunt
  grunt.registerTask( "default", [ "jshint", "uglify", "qunit" ] );

};
