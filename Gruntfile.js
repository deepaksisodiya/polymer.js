module.exports = function(grunt) {
  "use strict";
  var jsFiles = ["Gruntfile.js", "src/**/*.js"];
  var htmlfiles = ["src/view/todoList.html", "src/view/todoFooter.html", "src/view/todoCreater.html"];

  grunt.initConfig({
    jshint: {
      all: jsFiles,
      options: {
        jshintrc: ".jshintrc",
        jshintignore: ".jshintignore"
      }
    },
    watch: {
      css: {
        options: {
          livereload: true
        },
        files: ["src/**/*.css"]

      },
      js: {
        options: {
          livereload: true
        },
        files: ["src/**/*.js"]
      },
      html: {
        options: {
          livereload: true
        },
        files: ["src/**/*.html"],
        tasks: ["template"]
      }
    },
    jsbeautifier: {
      js: {
        src: jsFiles,
        options: {
          config: "jsbeautifier.json"
        }
      },
      json: {
        fileTypes: [".json"],
        src: ["bower.json", "package.json", "jsbeautifier.json"],
        options: {
          config: "jsbeautifier.json"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks("grunt-contrib-watch");

  /*
  grunt.loadTasks = "tasks";
  require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
  */

  grunt.registerTask("template", "Converting HTML templates into JSON", function() {
    var _ = require("underscore");

    var src = "";
    htmlfiles.forEach(function(file) {
      var filetext = grunt.file.read(file).split("\t").join("")
        .split("\n").join("")
        .split(">").map(function(v) {
          return v.trim();
        }).join(">");
      src = src + "templates[\"" + file.split("/").pop() + "\"] = " + _.template(filetext).source + ";\n";
    });
    grunt.file.write("src/template.js", "templates = {};" + src);
    console.log("src/template.js Generated");
  });

  grunt.registerTask("default", ["jsbeautifier", "jshint"]);
};
