import { h, Component, Fragment } from 'preact';
import { useState, useEffect, useCallback } from 'preact/hooks'
import AutoComplete from './autocomplete.js'
import {navigate, updateState} from '../utilities/utility';

export default function FieldAutoComplete(props) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState([]);
    const [searchTxt, setsearchTxt] = useState(props.state[props.field]);
    const loading = open && options.length === 0;
    const onChange = (searchTxt)=> {
        return (e, v, r) => {
        
         let keyword = v && v.name ? v.name : v;
            keyword = keyword || '';
            setSelected({name:keyword})
            console.log('keyword', keyword)
            updateState(props.field, keyword)
            updateState('from', 0)
            if (props.redirectOnSelect) {
                navigate('/'); 
            }
            if (props.closeOnSelect) {
                props.setAnchor(null);
            }
            
           /* v = v || '';
            let keyword = v.name ? v.name.toLowerCase() : v;
            setSelected({name:keyword})
            console.log('keyword', keyword)
            updateState(props.field, keyword)
            updateState('from', 0)
            if (props.closeOnSelect) {
                props.setAnchor(null);
            }
            if (props.redirectOnSelect) {
                navigate('/'); 
            }*/
        }
    }
    const onKeydown = ()=> {
        return () => {
        
        }
    };
    const onInputChange = () => {
    return (event, value, reason)=> {
          console.log('**', value, reason)
            if (reason !=="reset") {
                setsearchTxt(value )
                //setSelected(value)
                updateState(props.field, value)
                updateState('from', 0)
                setSelected(value)
                
            } else {
                setSelected(value)
                //updateState(props.field, value)
                //updateState('from', 0)
                //setSelected(value)
                //setsearchTxt(selected.name);
            }
            setOptions([]);
          }
      }
    useEffect(() => {
        let active = true;
            (async () => {
                if(searchTxt) {
                    let url = `/api/suggestions?field=${props.field}&query=${searchTxt?searchTxt.toLowerCase():''}`;
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
    console.log(`setting search to ${props.state[props.field]}`)
    setsearchTxt(props.state[props.field])
  }, [props.state[props.field]]);
  return (
    <AutoComplete
    open={open}
    fullWidth={props.fullWidth}
    setOpen={setOpen}
    options={options}
    setOptions={setOptions}
    selected={selected}
    setSelected={setSelected}
    searchTxt={searchTxt}
    setsearchTxt={setsearchTxt}
    onInputChange={onInputChange}
    onChange={onChange}
    onKeydown={onKeydown}
    placeholder={props.placeholder}
    />
  )

}
