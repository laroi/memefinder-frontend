import { h, Component, Fragment } from 'preact';
import { useState, useEffect, useCallback } from 'preact/hooks'
import AutoComplete from './autocompleteMulti.js'
import {navigate} from '../utilities/utility';

export default function CreateAutoCompleteMulti(props) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    //const [selected, setSelected] = useState([]);
    const [searchTxt, setsearchTxt] = useState('');
    const loading = open && options.length === 0;
    const onChange = (searchTxt)=> {
        return (e, v, r) => {
        
         //let keyword = v && v.name ? v.name.toLowerCase() : v;
           // keyword = keyword || '';
            //let newSelected =[...selected,  keyword] 
            props.setSelected(v)
            //console.log('keyword', keyword)
            
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
        return (e) => {
            if (e.keyCode === 13 && e.target.value) {
                 props.setSelected([...props.selected, {name: e.target.value}])
                //setsearchTxt(e.target.value)
                setOpen(false)
            }
        }
    };
    const onInputChange = () => {
    return (event, value, reason)=> {
            if (reason !=="reset") {
                setsearchTxt(value )
                //setSelected(value)
                //setSelected(value)
                
            } else {
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
  
/*useEffect(() => {
    console.log(`setting search to ${props.state[props.field]}`)
    setsearchTxt(props.state[props.field])
  }, [props.state[props.field]]);*/
  

  return (
    <AutoComplete
    open={open}
    fullWidth={false}
    multiple={props.multiple}
    className={props.className}
    setOpen={setOpen}
    options={options}
    setOptions={setOptions}
    selected={props.selected}
    setSelected={props.setSelected}
    searchTxt={searchTxt}
    setsearchTxt={setsearchTxt}
    onInputChange={onInputChange}
    onChange={onChange}
    onKeydown={onKeydown}
    placeholder={props.placeholder}
    />
  )

}
