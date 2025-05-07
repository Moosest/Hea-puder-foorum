const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const button = document.getElementById('register-button');

button.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !username || !password) {
        alert('Täida kõik väljad');
        return;
    }

    const userData = {
        email: email,
        username: username,
        password: password,
        type: "user"
    };

    await fetch("https://kool.krister.ee/chat/heapuderfoorum", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    alert('Registreerimine õnnestus');
    window.location.href = "../login/login.html";
});
