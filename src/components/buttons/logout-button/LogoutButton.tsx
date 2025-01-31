import { supabase } from '@services/supabaseClient';
import { useAuthStore } from 'stores/useAuthStore';
interface LogoutButtonProps {
    closeMenu: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ closeMenu }) => {
    const setUser = useAuthStore((state) => state.setUser);
    const setProfile = useAuthStore((state) => state.setProfile);
    const setIsLoading = useAuthStore((state) => state.setIsLoading);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
            return;
        }
        closeMenu();
        setUser(null);
        setProfile(null);
        setIsLoading(false);
    };

    return (
        <button className='logout-button-component' onClick={handleLogout}>
            <i className="fa fa-sign-out-alt"></i>
            Log out
        </button>
    );
};

export default LogoutButton;