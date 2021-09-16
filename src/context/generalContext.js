import { h, createContext } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import {session} from '../utilities/utility';
export const GeneralContext = createContext();

export const GeneralProvider = props => {
    const [contexts, setContexts] = useState(session.getItem('contexts') || []);
    const [languages, setLangauges] = useState(session.getItem('languages')|| []);
    useEffect(() => {
        (async () => {
            if(contexts.length < 1) {
                const response = await fetch(`/api/contexts`);
                const countries = await response.json();
                session.setItem('contexts', countries)
                setContexts(countries)
            }
        })();
    }, [contexts]);
    useEffect(() => {
        (async () => {
            if(languages.length < 1) {
                const response = await fetch(`/api/langs`);
                const countries = await response.json();
                session.setItem('languages', countries)
                setLangauges(countries)
            }
        })();
    }, [contexts]);
    
    return (
        <GeneralContext.Provider value={[contexts, languages]}>
        {props.children}
        </GeneralContext.Provider>
    )
}
