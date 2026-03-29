const pass = document.getElementById("password");
const msg = document.getElementById("message");
const str = document.getElementById("strength");

function getStrength(value) {
    let score = 0;
    if (value.length >= 8) score++;
    if (value.length >= 12) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]/.test(value)) score++;

    if (score <= 1) return { label: "weak", color: "#ff5925" };
    if (score <= 3) return { label: "medium", color: "yellow" };
    return { label: "strong", color: "#26d730" };
}

pass.addEventListener("input", () => {
    if (pass.value.length === 0) {
        msg.style.display = "none";
        return;
    }
    msg.style.display = "block";
    const { label, color } = getStrength(pass.value);
    str.innerHTML = label;
    pass.style.borderColor = color;
    msg.style.color = color;
});
