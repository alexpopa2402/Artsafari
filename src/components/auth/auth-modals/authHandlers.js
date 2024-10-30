import { supabase } from '../../../services/supabaseClient';
import { validateName, validateEmail, validatePassword, calculatePasswordStrength } from './authValidation';

//this function is used to handle the click event of the login button
export const handleForgotPasswordClick = (setPopupType, setErrors) => {
    setPopupType('forgotPassword');
    setErrors({ email: '', password: '' }); // Clear errors
};
//this function is used to handle the click event of the sign up button
export const handleSignUpClick = (setPopupType, setPassword, setErrors) => {
    setPopupType('signUp');
    setPassword('');
    setErrors({ email: '', password: '', name: '' }); // Clear errors
};
//this is the function that handles the password change event
export const handlePasswordChange = (e, setPassword, setPasswordStrength, setErrors, errors, popupType) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = calculatePasswordStrength(newPassword);
    setPasswordStrength(strength);

    const passwordError = validatePassword(newPassword);
    if (newPassword === '') {
//the additional setErrors is Make sure that setErrors is always initialized before any onChange events are triggered.
        setErrors && setErrors({ ...errors, password: '' });
    } else if (popupType === 'signUp') {
        setErrors && setErrors({ ...errors, password: passwordError });
    } else {
        setErrors && setErrors({ ...errors, password: '' });
    }
};
//this function is used to handle the change event of the email input field
export const handleNameChange = (e, setName, setErrors, errors) => {
    const newName = e.target.value;
    setName(newName);
    if (newName === '' || validateName(newName)) {
        setErrors({ ...errors, name: '' });
    } else {
        setErrors({ ...errors, name: 'Name can only contain letters and spaces' });
    }
};
//this is the function that handles the submit event of the form
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
// this is the function that handles the sign up event
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
//this function is used to handle the login event
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