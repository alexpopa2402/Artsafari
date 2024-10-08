import { useState } from 'react';
import { supabase } from '../../Client/supabaseClient';
import { useNavigate } from 'react-router-dom';
import './UserMenu-style.css';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    return (
        <div className="user-menu">
            <div className="user-icon" onClick={() => setIsOpen(!isOpen)}>
                👤
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    <button onClick={() => navigate('/user')}>My Profile</button>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;