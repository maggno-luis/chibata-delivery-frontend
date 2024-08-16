document.getElementById('finalizeOrder').addEventListener('click', function(){
    const token = localStorage.getItem('token');
    if(!token){
        alert('Por favor faça o login para finalizar o pedido.');
        window.location.href = '../sistema/login.html';
    }else{
        window.location.href = '../sistema/checkout.html';
    }
})