document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const checkButton = document.getElementById("check-btn");
    const strengthBar = document.getElementById("strength-bar");
    const strengthLabel = document.getElementById("strength-label");
    const feedbackList = document.getElementById("feedback");

    const tooltip = document.querySelector(".tooltip");
    tooltip.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            tooltip.textContent = "🙈";
        } else {
            passwordInput.type = "password";
            tooltip.textContent = "👁️";
        }
    });

    checkButton.addEventListener("click", () => {
        const password = passwordInput.value;
        const { strength, feedback } = evaluatePassword(password);

        updateStrengthBar(strength);
        updateFeedback(feedback);
    });

    function evaluatePassword(password) {
        let strength = 0;
        const feedback = [];

        // Length Check
        if (password.length >= 8) strength++;
        else feedback.push("Password should be at least 8 characters long.");

        // Uppercase Check
        if (/[A-Z]/.test(password)) strength++;
        else feedback.push("Include at least one uppercase letter.");

        // Lowercase Check
        if (/[a-z]/.test(password)) strength++;
        else feedback.push("Include at least one lowercase letter.");

        // Digit Check
        if (/\d/.test(password)) strength++;
        else feedback.push("Include at least one digit.");

        // Special Character Check
        if (/[@#$%^&*()_\-+=\[\]{};:'",.<>!?]/.test(password)) strength++;
        else feedback.push("Include at least one special character (!@#$%^&* etc.).");

        return { strength, feedback };
    }

    function updateStrengthBar(strength) {
        const colors = ["red", "orange", "yellow", "lightgreen", "green"];
        const labels = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];

        strengthBar.style.width = `${strength * 20}%`;
        strengthBar.style.backgroundColor = colors[strength - 1] || "red";
        strengthLabel.textContent = `Password Strength: ${labels[strength - 1] || "Very Weak"}`;
    }

    function updateFeedback(feedback) {
        feedbackList.innerHTML = "";
        feedback.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            feedbackList.appendChild(li);
        });
    }
});
