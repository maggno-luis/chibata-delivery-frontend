import API_URL from "../config";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-login');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!validateEmail(email)) {
            alert('Email inválido. Verifique o formato do email.');
            return;
        }

        if (!validatePassword(password)) {
            alert('Senha inválida. A senha deve ter pelo menos 8 caracteres.');
            return;
        }

        const url = `${API_URL}/auth/login`;

        const data = {
            email: email,
            password: password
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao fazer login');
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('name', data.name);
                localStorage.setItem('user-id', data.sub);
                localStorage.setItem('scope', data.scope);

                window.location.href = "../sistema/home.html";
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    });
});

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const passwordRegex = /^.{9,}$/;
    return passwordRegex.test(password);
}
