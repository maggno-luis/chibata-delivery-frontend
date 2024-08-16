function loadData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 5000); 
    });
}

window.addEventListener('load', () => {
    loadData().then(() => {
        window.location.href = "sistema/home.html";
    });
});