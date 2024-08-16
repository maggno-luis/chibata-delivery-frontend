import API_URL from "../config";

if(localStorage.getItem('cart')){
document.getElementById('finalizeOrder').addEventListener('click', function() {
    const cartData = localStorage.getItem('cart');

    if (cartData) {
        const cartItemsObject = JSON.parse(cartData);
        const cartItems = Object.values(cartItemsObject);

        const addressForm = document.getElementById('deliveryAddressForm');
        const addressData = {
            street: addressForm.street.value,
            houseNumber: addressForm.houseNumber.value,
            neighborhood: addressForm.neighborhood.value,
            complement: addressForm.complement.value
        };

        const paymentForm = document.getElementById('paymentMethodForm');
        const paymentMethod = paymentForm.paymentMethod.value;

        const userId = localStorage.getItem('user-id');

        const payload = {
            userId: userId,
            items: cartItems,
            paymentMethod: paymentMethod,
            address: addressData
        };

        const url = `${API_URL}/order`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error('Erro na resposta: ' + JSON.stringify(err));
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Pedido finalizado com sucesso!');
                localStorage.removeItem('cart');
                window.location.href = "../sistema/pedidos.html"
            } else {
                alert('Falha ao finalizar o pedido. Por favor, tente novamente.');
            }
        })
        .catch(error => {
            alert('Ocorreu um erro. Por favor, tente novamente.');
        });
    } else {
        alert('Seu carrinho está vazio.');
    }
});

const cartDataCheck = localStorage.getItem('cart');
console.log("Cart Data Before Click:", cartDataCheck);

if (cartDataCheck) {
    const cartItemsCheck = JSON.parse(cartDataCheck);
    console.log("Parsed Cart Items:", cartItemsCheck);
}
}else{
    alert('Carrinho vazio')
    window.location.href = "../sistema/home.html"
}