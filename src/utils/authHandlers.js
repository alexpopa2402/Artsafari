import { supabase } from '../services/supabaseClient';
import useAuthStore from '@store/useAuthStore';
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
        setErrors({ ...errors, password: '' });
    } else if (popupType === 'signUp') {
        setErrors({ ...errors, password: passwordError });
    } else {
        setErrors({ ...errors, password: '' });
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

/**
 * Handles user sign-up with email, password, and metadata (e.g., name).
 * @param {string} email
 * @param {string} password
 * @param {object} metadata - User metadata, such as name.
 * @param {function} setIsLoading - Function to toggle the loading state.
 * @param {function} setErrors - Function to set error messages.
 * @param {function} setShowThankYouMessage - Function to display a thank-you message on success.
 */
export const handleSignUp = async (email, password, metadata, setIsLoading, setErrors, setShowThankYouMessage) => {
    try {
        setIsLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: metadata },
        });

        if (error) {
            setErrors({ email: error.message });
        } else {
            setShowThankYouMessage(true);
        }
    } catch {
        setErrors({ email: 'An unexpected error occurred. Please try again later.' });
    } finally {
        setIsLoading(false);
    }
};

/**
 * Handles user login with email and password.
 * @param {string} email
 * @param {string} password
 * @param {function} setErrors - Function to set error messages.
 * @returns {boolean} - Indicates if login was successful.
 */
export const handleLogin = async (email, password, setErrors) => {
    try {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setErrors({ password: 'Invalid credentials' });
            return false;
        } else {
            return true;
        }
    } catch (error) {
        setErrors({ password: error.message });
        return false;
    }
};

/**
 * Handles user logout, clears session, and navigates to home page.
 * @param {function} setSession - Function to clear session state in the store.
 * @param {function} navigate - Function to redirect user to a specified route.
 */
export const handleLogout = async (navigate) => {
    try {
        await supabase.auth.signOut();
        useAuthStore.getState().clearAuthData(); // Clear session in the store
        navigate('/');
    } catch (err) {
        console.error('Logout error:', err);
    }
};