function guardRouter() {
    const token = localStorage.getItem('token');
    if(token === "" || token === null){
        alert('Faça o seu login')
        window.location.href = '../sistema/login.html';
    }
    
}
guardRouter();