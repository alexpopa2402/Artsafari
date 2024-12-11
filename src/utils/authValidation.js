export const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{8,}$/;
    if (!passwordRegex.test(password)) {
        return 'Password must be at least 8 characters and include an upper case letter, a lower case letter, a number, and a symbol';
    }
    return '';
};

//if code breaks, remove calculatePasswordStrength from here
export const calculatePasswordStrength = (password) => {
    let strength = '';
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (password === '') {
        strength = '';
    } else if (passwordRegex.test(password)) {
        if (password.length >= 12) {
            strength = 'strong';
        } else if (password.length >= 10) {
            strength = 'moderate';
        } else if (password.length >= 8) {
            strength = 'weak';
        }
    } else {
        strength = 'weak';
    }
    return strength;
};