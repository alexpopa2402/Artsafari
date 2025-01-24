import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface LogoutButtonProps {
    closeMenu: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ closeMenu }) => {
    const supabaseClient = useSupabaseClient();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
            return;
        }
        closeMenu();
    };

    return (
        <button className='logout-button-component' onClick={handleLogout}>
            <i className="fa fa-sign-out-alt"></i>
            Log out
        </button>
    );
};

export default LogoutButton;