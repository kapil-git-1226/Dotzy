import { createContext, useContext, useEffect } from 'react';
import useFetch from './hooks/use-fetch';
import { getCurrentUSer } from './db/apiAuth';

const UrlContext = createContext()

const UrlProvider = ({children }) => {

    const {data:user, loading, fn:fetchUser} = useFetch(getCurrentUSer)

    const isAuthenticated = user?.role == "authenticated" ;

    useEffect(() =>{
        fetchUser();
    }, []);

    return <UrlContext.Provider value={{user, fetchUser, loading, isAuthenticated}}>
        {children}
    </UrlContext.Provider>
};

export const UrlState = () =>{
    return useContext(UrlContext);
};

export default UrlProvider;