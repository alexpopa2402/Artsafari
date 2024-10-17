//disable this file if code breaks and revert to original unfactored code in LoginRegisterCard.jsx

import { supabase } from '../../../Client/supabaseClient';
import { validateName, validateEmail, validatePassword, calculatePasswordStrength } from './validation';

export const handleForgotPasswordClick = (setPopupType, setErrors) => {
    setPopupType('forgotPassword');
    setErrors({ email: '', password: '' }); // Clear errors
};

export const handleSignUpClick = (setPopupType, setPassword, setErrors) => {
    setPopupType('signUp');
    setPassword('');
    setErrors({ email: '', password: '', name: '' }); // Clear errors
};

export const handlePasswordChange = (e, setPassword, setPasswordStrength, setErrors, errors, popupType) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = calculatePasswordStrength(newPassword);
    setPasswordStrength(strength);
    
    const passwordError = validatePassword(newPassword);
    if (newPassword === '') {
        setErrors({ ...errors, password: '' });
    } else if (popupType === 'signUp') {
        setErrors({ ...errors, password: passwordError });
    } else {
        setErrors({ ...errors, password: '' });
    }
};

export const handleNameChange = (e, setName, setErrors, errors) => {
    const newName = e.target.value;
    setName(newName);
    if (newName === '' || validateName(newName)) {
        setErrors({ ...errors, name: '' });
    } else {
        setErrors({ ...errors, name: 'Name can only contain letters and spaces' });
    }
};

export const handleSubmit = async (e, popupType, email, password, name, setErrors, handleSignUp, handleLogin, setIsLoading, setShowThankYouMessage) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { email: '', password: '', name: '' };

    if (!validateEmail(email)) {
        newErrors.email = 'Invalid email format';
        valid = false;
    }

    if (popupType === 'signUp') {
        if (!validateName(name)) {
            newErrors.name = 'Name can only contain letters and spaces';
            valid = false;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            newErrors.password = passwordError;
            valid = false;
        }
    }

    setErrors(newErrors);

    if (valid) {
        if (popupType === 'signUp') {
            await handleSignUp(email, password, name, setIsLoading, setErrors, setShowThankYouMessage);
        } else if (popupType === 'login') {
            await handleLogin(email, password, setErrors);
        }
    }
};

export const handleSignUp = async (email, password, name, setIsLoading, setErrors, setShowThankYouMessage) => {
    setIsLoading(true);
    const { /* user, */ error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
            }
        }
    });
    setIsLoading(false);
    if (error) {
        setErrors({ email: error.message });
    } else {
        setShowThankYouMessage(true);
    }
};

export const handleLogin = async (email, password, setErrors) => {
    const { data: /* { session }, */ error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        setErrors({ password: 'Invalid credentials' });
    } else {
        window.location.href = '/profile';
    }
};