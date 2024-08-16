function admin(){
    const token = localStorage.getItem('scope')
    if(token !== 'ADMIN'){
        alert("Este usuário não possui essa autorização!")
        window.location.href = "../sistema/login.html"
    }
}
admin();