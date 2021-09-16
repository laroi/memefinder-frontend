import { h, createContext } from 'preact';
import { useState } from 'preact/hooks';
import {storage} from '../utilities/utility';
export const UserContext = createContext();

export const UserProvider = props => {
    const [user, setUser] = useState(storage.getItem('user'));
    return (
        <UserContext.Provider value={[user, setUser]}>
        {props.children}
        </UserContext.Provider>
    )
}
