document.addEventListener('DOMContentLoaded',function() {
    document.getElementById('form-sorteador'). addEventListener('submit',function(evento) { //Aqui estamos captando o número que o user digitou
        evento.preventDefault(); //previne o comportamento padrão do formulário, que é carregar a página
        let numeroMaximo = document.getElementById('numero-maximo').value; //Aqui fazendo o armazenamento dele
        numeroMaximo = parseInt(numeroMaximo); //Convertendo a string em número inteiro
    
        //Obtendo o número aleatório
        let numeroAleatorio = Math.random() * numeroMaximo;
        numeroAleatorio = Math.floor(numeroAleatorio + 1); //Aqui estamos arredondando o número para o mais próximo. são 3 opções seriam o ceil, para mais e o floor para menos e o round para o mais próximo
        
        document.getElementById('resultado-valor').innerText = numeroAleatorio; //aqui parar mostrar o número
        document.querySelector('.resultado').style.display = 'block'; //aqui configura para mostrar a mensagem de número sorteado ó depois que realmente tiver o número
    })
})