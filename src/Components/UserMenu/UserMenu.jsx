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

/*     return (
        <div className="user-menu">
            <div className="fa fa-user" onClick={() => setIsOpen(!isOpen)}></div>
            {isOpen && (
                <div className="dropdown-menu">
                    <button onClick={() => navigate('/profile')}>My Profile</button>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
            )}
        </div>
    );
};
 */
return (
    <div className="user-menu">
      <div className="fa fa-user" onClick={() => setIsOpen(!isOpen)}></div>

            {isOpen && (
                <div className="dropdown-content">
                    <div className="avatar">A</div>
                    <div className='profile-box'>
                        <span className="profile-name">Alex</span>
                        <span className="view-profile" onClick={() => navigate('/profile')}>View profile</span>
                    </div>

                    <div className="collection">
                        <p>My Collection</p>
                        <a className='collection-item' href="#">Artworks</a>
                        <a className='collection-item' href="#">Artists</a>
                        <a className='collection-item' href="#">Insights</a>
                    </div>

                    <div className="favorites">
                        <p>Favorites</p>
                        <a className='collection-item' href="#">Saves</a>
                        <a className='collection-item' href="#">Follows</a>
                        <a className='collection-item' href="#">Alerts</a>
                    </div>

                    <div className="settings">
                        <a className='collection-item' href="#">Settings</a>
                        <a className='collection-item' href="#">Order History</a>
                        <a className='collection-item' onClick={handleLogout}>Log out</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;