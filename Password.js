function generatePassword() {
    const length = document.getElementById("passwordLength").value;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeLowercase = document.getElementById("includeLowercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;

    let characters = "";
    if (includeUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) characters += "0123456789";
    if (includeSymbols) characters += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (characters === "") {
        alert("Please select at least one character type.");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    document.getElementById("passwordOutput").value = password;
    checkPasswordStrength(password); // Also checks strength of generated password
}

function checkPasswordStrength(password) {
    const strengthMessage = document.getElementById("passwordStrengthMessage");

    if (!password) {
        strengthMessage.innerText = "";
        strengthMessage.style.color = "";
        return;
    }

    let strength = 0;
    if (password.length >= 8) strength++; // Longer passwords are stronger
    if (/[A-Z]/.test(password)) strength++; // Contains uppercase letters
    if (/[a-z]/.test(password)) strength++; // Contains lowercase letters
    if (/[0-9]/.test(password)) strength++; // Contains numbers
    if (/[^A-Za-z0-9]/.test(password)) strength++; // Contains special characters

    // Set strength message and color
    if (strength <= 2) {
        strengthMessage.innerText = "Weak Password";
        strengthMessage.style.color = "red";
    } else if (strength === 3) {
        strengthMessage.innerText = "Medium Password";
        strengthMessage.style.color = "orange";
    } else if (strength >= 4) {
        strengthMessage.innerText = "Strong Password";
        strengthMessage.style.color = "green";
    }
}

// Add event listener for custom password input field
document.getElementById("customPasswordInput").addEventListener("input", function() {
    checkPasswordStrength(this.value);
});
