import  { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const dataContext = createContext();

function UserContext({ children }) {
        const serverUrl = "http://localhost:8000";
        const [currentUser, setCurrentUser] = useState(null);

            const fetchCurrentUser = async () => {
                try {
                    const { data } = await axios.get(`${serverUrl}/api/me`, { withCredentials: true });
                    setCurrentUser(data.user || null);
                } catch (err) {
                    // not logged in or error
                    console.debug('fetchCurrentUser error', err);
                    setCurrentUser(null);
                }
            }

        useEffect(() => {
            fetchCurrentUser();
        }, []);

        const value = {
                serverUrl,
                currentUser,
                refreshUser: fetchCurrentUser
        }

        return (
                <dataContext.Provider value={value}>
                        {children}
                </dataContext.Provider>
        )
}

export default UserContext;