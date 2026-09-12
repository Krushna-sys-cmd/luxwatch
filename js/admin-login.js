const loginForm = document.getElementById("admin-login-form");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const username = document.getElementById("admin-username").value;
        const password = document.getElementById("admin-password").value;

        const response = await fetch("http://127.0.0.1:5000/admin-login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const result = await response.json();

        if (result.success) {
            window.location.href = "admin.html";
        } else {
            alert("Invalid username or password.");
        }
    });
}