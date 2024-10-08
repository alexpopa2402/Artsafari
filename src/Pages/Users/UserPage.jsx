import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const UserPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = supabase.auth.user();
            setUser(user);
        };

        fetchUser();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome, {user.email}</h1>
            {/* Display more user-specific information here */}
        </div>
    );
};

export default UserPage;