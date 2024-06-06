module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: { //Configurando o less
            development: { //Foi usado o development, pois foi usado o ambiente de desenvolvimento, no nosso computador
                files: {
                    'main.css':'main.less' //aquivo de destino : arquivo de origem
                }
            },
            production: { //Aqui é como vai se comportar na produção, onde o cliente acessa.
                options: {
                    compress: true,
                },
                files: {
                    'main.min.css':'main.less' //.min é para criar esse arquivo minificado
                }
            }
        },
        sass: { //configurando o sass
            dist: {
                options: {
                    style: 'compressed' //arquivo minificado do sass
                },
                files: {
                    'main2.css':'main.scss' //aquivo de destino : arquivo de origem - CUIDADO PARA NÃO SOBRESCREVER POR CAUSA DO NOME
                }
            }
        },
        concurrent: { //configurando o concurrent
            target: ['olaGrunt','less','sass']
        }
    })

    grunt.registerTask('olaGrunt', function() {
        const done = this.async();
        setTimeout(function() {
            console.log('Olá Grunt');
            done();
        }, 3000); //3000 é o tempo de espera
    })

    grunt.loadNpmTasks('grunt-contrib-less'); //Carregando o plugin do less
    grunt.loadNpmTasks('grunt-contrib-sass'); //Carregando o plugin do sass
    grunt.loadNpmTasks('grunt-concurrent'); //Carregando o plugin do concurrent
    
    grunt.registerTask('default', ['concurrent']); //onde vamos adicionar as tarefas, nesse caso o concurrent faz toas as tarefas de uma serial
}