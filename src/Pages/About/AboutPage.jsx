import './AboutPage-style.css';

const About = () => {
    return (
         <div className="about-container">
            <h1 className="about-title">About Us</h1>
            <div className="about-content">
                <p>
                    At Youngblood, we bring together a vibrant collection of artwork from talented artists across the globe. Whether you are an avid art enthusiast or just exploring the beauty of artistic expression, our gallery offers a diverse range of mediums, styles, and perspectives that will captivate and inspire.
                </p>
                <p>
                    From contemporary paintings to abstract sculptures, each piece tells a unique story and showcases the creativity of emerging and established artists. Take a journey through our curated collections and immerse yourself in the global art scene, right from the comfort of your home.
                </p>
            </div> 
        </div>
    );
};

export default About;


/* import { useState } from 'react';

const About = () => {
    const [email, setEmail] = useState('');
    const [emailExists, setEmailExists] = useState(null);
    const [error, setError] = useState(null);

    const validateEmail = (email) => {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const sanitizeEmail = (email) => {
        // Trim whitespace and convert to lowercase
        return email.trim().toLowerCase();
    };

    const checkEmail = async () => {
        const sanitizedEmail = sanitizeEmail(email);

        if (!validateEmail(sanitizedEmail)) {
            setError('Please enter a valid email address.');
            setEmailExists(null);
            return;
        }

        try {
            const response = await fetch('https://wrgvvysgvsljrfsjxrzy.supabase.co/functions/v1/whoDis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: sanitizedEmail }),
            });

            const data = await response.json();
            if (response.ok) {
                setEmailExists(data.exists);
                setError(null);
            } else {
                setError(data.error || 'An error occurred while checking the email.');
                setEmailExists(null);
            }
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred while checking the email.');
            setEmailExists(null);
        }
    };

    return (
        <div className="about-container">
            <h1 className="about-title">About Us</h1>
            <div className="about-content">
                <p>
                    At Youngblood, we bring together a vibrant collection of artwork from talented artists across the globe. Whether you are an avid art enthusiast or just exploring the beauty of artistic expression, our gallery offers a diverse range of mediums, styles, and perspectives that will captivate and inspire.
                </p>
                <p>
                    From contemporary paintings to abstract sculptures, each piece tells a unique story and showcases the creativity of emerging and established artists. Take a journey through our curated collections and immerse yourself in the global art scene, right from the comfort of your home.
                </p>
            </div>
            <div className="email-check">
                <h2>Check if Email Exists</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                />
                <button onClick={checkEmail}>Check Email</button>
                {emailExists !== null && (
                    <p>{emailExists ? 'Email exists.' : 'Email does not exist.'}</p>
                )}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default About; */