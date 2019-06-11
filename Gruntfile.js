module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
      compass: {
          options: {
              sassDir: 'src/assets/sass',
              imagesDir: 'src/img',
              cssDir: 'web/assets/css',
              force: true
          },
          dist: {
              options: {
                  environment: 'production',
                  noLineComments: true
              }
          },
          dev: {
              options: {
                  noLineComments: true
              }
          },
          watch: {
              options: {
                  noLineComments: true,
                  watch: true
              }
          }
      },
      assemble: {
        options: {
            layoutdir: 'src/templates/layouts',
            layout: ['default.hbs'],
            partials: ['src/templates/partials/{,*/}*.*', 'src/sprites/svg/*'],
            helpers: ['partial'],
            flatten: true
        },
        en: {
            options: {
                data: ['src/templates/data/en/*.yml']
            },
            src: ['src/templates/pages/en/*.hbs'],
            dest: './web'
        },
        lt:{
          options:{
            data: ['src/templates/data/lt/*.yml']
          },
          src: ['src/templates/pages/lt/*.hbs'],
          dest: './web/lt/'
        }
    },
    watch: {
        options: {
        },
        dev: {
            files: ['src/assets/sass/**/*.scss', 'src/templates/**/*.hbs'],
            tasks: ['compass:dev', 'assemble:site']
        },
        handlebars: {
            files: ['src/templates/*/*.hbs', 'src/templates/layouts/*.hbs' ],
            tasks: ['assemble:site']
        }
    },
    svg_sprite: {
       generate: {
           cwd: 'web/assets/vendor/material-design-icons',
           src: [
               '../../../../web/assets/images/ic_menu_24px.svg',
               '../../../../web/assets/images/ic_dashboard_24px.svg',
               '../../../../web/assets/images/ic_typography_24px.svg',
               '../../../../web/assets/images/ic_components_24px.svg',
               '../../../../web/assets/images/ic_icons_24px.svg',
               '../../../../web/assets/images/ic_forms_24px.svg',
               '../../../../web/assets/images/ic_ukit_24px.svg',
               '../../../../web/assets/images/ic_tables_24px.svg',
               '../../../../web/assets/images/ic_charts_24px.svg',
               '../../../../web/assets/images/ic_maps_24px.svg',
               '../../../../web/assets/images/ic_mail_24px.svg',
               '../../../../web/assets/images/ic_pages_24px.svg',
               '../../../../web/assets/images/ic_extras_24px.svg',
               '../../../../web/assets/images/ic_multilvl_24px.svg',
               '../../../../web/assets/images/ic_sq-top_24px.svg',
               '../../../../web/assets/images/ic_dot-top_24px.svg',
               '../../../../web/assets/images/ic_bell-top_24px.svg',
               '../../../../web/assets/images/ic_FBlogo_24px.svg',
               '../../../../web/assets/images/ic_facebook_24px.svg',

           ],
           dest: 'src/sprites',
           options: {
               shape: {
                   id: {
                       generator: function(filename) {
                           var id = filename.match(/ic_(\w+)_\d+/);
                           return id[1];
                       }
                   },
               },
               mode: {
                   symbol: {
                       dest: ''
                   }
               }
           }
       }
   },
  });

  [
    'grunt-contrib-compass',
    'grunt-contrib-watch',
    'grunt-assemble',
    'grunt-svg-sprite'
].forEach(grunt.loadNpmTasks);

  // Default task(s).
  grunt.registerTask('assemble:site', [
      'assemble:en',
      'assemble:lt',
  ]);

  grunt.registerTask('default', [
      'compass:dist',
      'assemble:en',
      'assemble:lt',
  ]);

};
