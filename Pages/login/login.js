const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        alert('Palun täida kõik väljad');
        return;
    }

    const response = await fetch("https://kool.krister.ee/chat/heapuderfoorum");
    const data = await response.json();

    const user = data.find(item =>
        item.type === "user" &&
        item.username === username &&
        item.password === password
    );

    if (!user) {
        alert("Vale kasutajanimi või parool");
        return;
    }

    sessionStorage.setItem("username", username);
    alert("Sisselogimine õnnestus");
    window.location.href = "../mainpage/index.html";
});

function reg() {}