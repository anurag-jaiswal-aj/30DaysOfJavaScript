
const eyeIcon = document.getElementById("eyeIcon");
const password = document.getElementById("password");

eyeIcon.addEventListener("click", (event) => {
    event.preventDefault();
    if (password.type === "password") {
        password.type = "text";
        eyeIcon.src = "eye-open.png";
    } else {
        password.type = "password";
        eyeIcon.src = "eye-close.png";
    }
});