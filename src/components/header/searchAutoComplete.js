import { h, Component, Fragment } from 'preact';
import { useState, useEffect, useCallback } from 'preact/hooks'
import AutoComplete from '../autocomplete.js'
import {navigate, updateState} from '../../utilities/utility';

export default function SearchAutoComplete(props) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState({name:''});
    const [searchTxt, setsearchTxt] = useState(props.state.searchTxt || '');
    const loading = open && options.length === 0;
 console.log('>>>', searchTxt, props.state.searchTxt)
    const onChange = (searchTxt)=> {
        return (e, v, r) => {
            let keyword = v && v.name ? v.name.toLowerCase() : v;
            keyword = keyword || '';
            setSelected({name:keyword})
            console.log('keyword', keyword)
            updateState('searchTxt', keyword)
            updateState('from', 0)
            navigate('/'); 
        }
    }
    const onKeydown = (searchTxt) => {
        return (e, v, r) => {
            if (e.keyCode === 13 && e.target.value) {
                props.setAnchor(null);
                setSelected({name:e.target.value.toLowerCase()})
                setOpen(false);
                updateState('searchTxt', e.target.value.toLowerCase())
                updateState('from', 0)
                navigate('/'); 
            }
        }
    }
       const onInputChange = () => {
    return (event, value, reason)=> {
          console.log('**', value, reason)
            if (reason !=="reset") {
                setsearchTxt(value )
                setSelected(value)
            } else {
               // setSelected(value)
                //setsearchTxt(selected.name);
            }
            setOptions([]);
          }
      }
    useEffect(() => {
        let active = true;
        
            (async () => {
                if(searchTxt) {
                    let url = `/api/suggestions?query=${searchTxt?searchTxt.toLowerCase():''}`;
                    const response = await fetch(url);
                    const countries = await response.json();
                    let results = [];
                    for (let country in countries) {
                        results = results.concat(countries[country][0].options.map(x => {return {name :x.text, type:country}}))
                    }
                    var setObj = new Set(); // create key value pair from array of array
                    results = results.reduce((acc,item)=>{
                        if(!setObj.has(item.name)){
                        setObj.add(item.name,item)
                        acc.push(item)
                        }
                        return acc;
                    },[])
                    if (active) {
                        setOptions(results)
                    }
                }
                
            })();
        return () => {
            active = false;
        };
    }, [searchTxt]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
    useEffect(() => {
    console.log(`setting search to ${props.state.searchTxt}`)
    setsearchTxt(props.state.searchTxt)
  }, [props.state.searchTxt]);
  return (
    <AutoComplete
    open={open}
    setOpen={setOpen}
    options={options}
    setOptions={setOptions}
    selected={selected}
    onInputChange={onInputChange}
    setSelected={setSelected}
    searchTxt={searchTxt}
    setsearchTxt={setsearchTxt}
    onChange={onChange}
    onKeydown={onKeydown}
    placeholder={'Search'}
    
    />
  )

}
