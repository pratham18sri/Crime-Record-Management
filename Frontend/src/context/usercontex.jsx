import  { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export const dataContext = createContext();

function UserContext({ children }) {
        const serverUrl = import.meta.env.VITE_SERVER_URL || "https://crime-record-management-3.onrender.com";
        const [currentUser, setCurrentUser] = useState(null);

            const fetchCurrentUser = useCallback(async () => {
                try {
                    const { data } = await axios.get(`${serverUrl}/api/me`, { withCredentials: true });
                    setCurrentUser(data.user || null);
                } catch (err) {
                    // not logged in or error
                    console.debug('fetchCurrentUser error', err);
                    setCurrentUser(null);
                }
            }, [serverUrl]);

        useEffect(() => {
            fetchCurrentUser();
        }, [fetchCurrentUser]);

        const logout = useCallback(async () => {
                try {
                        await axios.post(`${serverUrl}/api/logout`, {}, { withCredentials: true });
                } catch (err) {
                        console.error('logout error', err);
                } finally {
                        setCurrentUser(null);
                }
        }, [serverUrl]);

        const value = useMemo(() => ({
                serverUrl,
                currentUser,
                refreshUser: fetchCurrentUser,
                logout
        }), [serverUrl, currentUser, fetchCurrentUser, logout]);

        return (
                <dataContext.Provider value={value}>
                        {children}
                </dataContext.Provider>
        )
}

export default UserContext;
