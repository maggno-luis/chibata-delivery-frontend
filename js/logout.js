document.addEventListener('DOMContentLoaded', function(){
    const logout = document.getElementById('logout');

    logout.addEventListener('click', function(){
        result = confirm("Deseje sair?")
        if(result){
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('user-id');
            localStorage.removeItem('cart');
            localStorage.removeItem('scope');
            window.location.href = "../sistema/login.html"
        }
        
    })
})