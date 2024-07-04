module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: { //Configurando o less
            development: { //Foi usado o development, pois foi usado o ambiente de desenvolvimento, no nosso computador
                files: {
                    'dev/styles/main.css':'src/styles/main.less' //aquivo de destino : arquivo de origem
                }
            },
            production: { //Aqui é como vai se comportar na produção, onde o cliente acessa.
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css':'src/styles/main.less' //.min é para criar esse arquivo minificado
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {//Configurando o replace
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'], //arquivo onde a substituição vai ser feita
                        dest: 'dev/' //pasta de destino do arquivo acima
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './src/scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'], //arquivo onde a substituição vai ser feita
                        dest: 'dist/' //pasta de destino do arquivo acima
                    }
                ]
            }
        },
        htmlmin: {//Configurando o HTMLMIN
            dist: {
                options: {
                    removeComments: true, //Remove qualquer comentário no HTML
                    collapseWhitespace: true, //Apaga todo espaço em branco
                },
                files: {
                    'prebuild/index.html' : 'src/index.html' //1. ele faz a minificação - 'origem' : 'destino'
                    //2. ele faz a substituição do arquivo na PROD(DIST)
                }
            }
        },
        clean: ['prebuild'],
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js' : 'src/scripts/main.js'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less'); //Carregando o plugin do less
    grunt.loadNpmTasks('grunt-contrib-watch'); //Carregando o plugin do watch
    grunt.loadNpmTasks('grunt-replace'); //Carregando o plugin do grunt replace
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); //Carregando o plugin
    grunt.loadNpmTasks('grunt-contrib-clean'); //Carregando o plugin
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']); //tarefa para salvar os arquivos automaticamente
    grunt.registerTask('build', ['less:production','htmlmin:dist','replace:dist','clean','uglify']); //tarefa para salvar os arquivos para a PROD
}