import API_URL from "../config";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-register-user');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!validateName(name)) {
            alert('Nome inválido. Utilize apenas letras e espaços.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Email inválido. Verifique o formato do email.');
            return;
        }

        if (!validatePassword(password)) {
            alert('Senha inválida. A senha deve ter pelo menos 8 caracteres.');
            return;
        }

        const url = `${API_URL}/auth/register`;

        const data = {
            name: name,
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
                    throw new Error('Erro ao fazer cadastro');
                }
                return response.json();
            })
            .then(data => {
                alert('Cadastro realizado com sucesso');
                window.location.href = "../sistema/login.html";
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

function validateName(name) {
    const nameRegex = /^[a-zA-Zà-úÀ-Ú\s]+$/;
    return nameRegex.test(name);
}

function validatePassword(password) {
    const passwordRegex = /^.{9,}$/;
    return passwordRegex.test(password);
}
