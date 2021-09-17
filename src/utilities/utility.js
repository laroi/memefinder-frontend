import { route } from 'preact-router';
let stateObj = {
    from:0,
    movie:'',
    searchTxt: '',
    actor:'',
    character: '',
    tag: '',
    language:'',
    context:'',
    isFavorite:false,
    isApproved:false
}
const updateState = (key, value)=> {
    console.log(`updating ${key} with ${value}`)
    stateObj[key] = value;
}
const navigate = (mainRoute) => {
    let url = `${mainRoute}?`;
    if (stateObj.searchTxt) {
        url += `searchTxt=${stateObj.searchTxt}&`
    }
    if (stateObj.from) {
        url += `from=${stateObj.from}&`
    }
    if (stateObj.movie) {
        url += `movie=${stateObj.movie}&`
    }
    if (stateObj.actor) {
        url += `actor=${stateObj.actor}&`
    }
    if (stateObj.character) {
        url += `character=${stateObj.character}&`
    }
    if (stateObj.tag) {
        url += `tag=${stateObj.tag}&`
    }
    if (stateObj.language) {
        url += `language=${stateObj.language}&`
    }
    if (stateObj.context) {
        url += `context=${stateObj.context}&`
    }
    if (stateObj.isFavorite) {
        url += `isFavorite=${stateObj.isFavorite}&`
    }
    if (stateObj.isApproved) {
        url += `isApproved=${stateObj.isApproved}&`
    }
    if (stateObj.user) {
        url += `user=${stateObj.user}&`
    }
        route(url, true)
}
let chipObj = () => {
    let retObj = [];
    if (stateObj.searchTxt) {
        retObj.push({type: 'search', label: 'search', val: stateObj.searchTxt})
    }
    if (stateObj.movie) {
        retObj.push({type: 'search', label: 'movie', val: stateObj.movie})
    }
     if (stateObj.actor) {
        retObj.push({type: 'search', label: 'actor', val: stateObj.actor})
    }
     if (stateObj.character) {
        retObj.push({type: 'search', label: 'character', val: stateObj.character})
    }
    if (stateObj.tag) {
        retObj.push({type: 'search', label: 'tag', val: stateObj.tag})
    }
    if (stateObj.language) {
        retObj.push({type: 'filter', label: 'language', val: stateObj.language})
    }
    if (stateObj.context) {
        retObj.push({type: 'filter', label: 'context', val: stateObj.context})
    }
    if (stateObj.isFavorite) {
        retObj.push({type: 'filter', label: 'favorite', val: stateObj.isFavorite})
    }
    if (stateObj.isApproved) {
        retObj.push({type: 'filter', label: 'unApproved', val: stateObj.isApproved})
    }
    if (stateObj.user) {
        retObj.push({type: 'filter', label: 'user', val: stateObj.username})
    }
    return retObj;
}
let storage =  {
        setItem :(key, value)=> {
        if (typeof window !== "undefined"){
            let storage = JSON.parse(localStorage.getItem('hypermemia')||'{}');
            storage[key]=value
            localStorage.setItem('hypermemia', JSON.stringify(storage));
        }
    },
        getItem: (key)=> {
        if (typeof window !== "undefined"){
            let storage = JSON.parse(localStorage.getItem('hypermemia')||'{}');
            return storage[key]
        }
    },
        delItem: (key)=> {
        if (typeof window !== "undefined"){
            let storage = JSON.parse(localStorage.getItem('hypermemia')||'{}');
            delete storage[key];
            localStorage.setItem('hypermemia', JSON.stringify(storage));
        }
    }
}
let session =  {
        setItem :(key, value)=> {
        if (typeof window !== "undefined"){
            let storage = JSON.parse(sessionStorage.getItem('hypermemia')||'{}');
            storage[key]=value
            sessionStorage.setItem('hypermemia', JSON.stringify(storage));
        }
    },
        getItem: (key)=> {
        if (typeof window !== "undefined"){
            let storage = JSON.parse(sessionStorage.getItem('hypermemia')||'{}');
            return storage[key]
        }
    },
        delItem: (key)=> {
        if (typeof window !== "undefined"){
            let storage = JSON.parse(sessionStorage.getItem('hypermemia')||'{}');
            delete storage[key];
            sessionStorage.setItem('hypermemia', JSON.stringify(storage));
        }
    }
}
export {updateState, navigate, chipObj, stateObj, storage, session}
