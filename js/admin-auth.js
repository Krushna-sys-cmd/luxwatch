fetch("http://127.0.0.1:5000/admin-status", {
    credentials: "include"
})
.then(function(response) {
    return response.json();
})
.then(function(result) {

    if (!result.logged_in) {
        window.location.href = "admin-login.html";
    }

});