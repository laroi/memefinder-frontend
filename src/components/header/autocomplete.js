import { h, Component, Fragment } from 'preact';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState, useEffect, useCallback } from 'preact/hooks';
import {navigate, updateState} from '../../utilities/utility';


function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

export default function AutoComplete() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchTxt, setsearchTxt] = useState(undefined);
  const loading = open && options.length === 0;
  
    const debounceOnChange = useCallback(
        debounce(value => {
          setInputSearch(value);
        }, 400),
        []
      );
function handleChange(value) {
    setSelected(value);
    debounceOnChange(value);
  }
  
  useEffect(() => {
    let active = true;


    (async () => {

      console.log(searchTxt)
      

    if(searchTxt) {
        const response = await fetch(`/api/suggestions?query=${searchTxt?searchTxt.toLowerCase():''}`);
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
        //setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
    })();

/*(async () => {
      const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
    
      const countries = await response.json();

      if (active) {
        setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
      }
    })();*/
    return () => {
      active = false;
    };
  }, [searchTxt]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      open={open}
      freeSolo
      openOnFocus={true}
      onOpen={() => {
      
        setOpen(true);
       

      }}
      onClose={() => {
        setOpen(false);
        setOptions([]);
        
      }}
      getOptionSelected={(option, value) => { return option.name === value.name;}}
      getOptionLabel={(option) => `${option.name}`}
      options={options}
      onInputChange = {
          (event, value, reason)=> {
            if (reason !=="reset") {
                setsearchTxt(value)
            } else {
                setsearchTxt(selected.name);
            }
            setOptions([]);
            console.log(`input changes ${value}`)
          }
      }
      onChange = {(e, v, r) => {console.log('selected', e, v, r);
      let keyword = searchTxt;
      if (v.name) {
        keyword = v.name.toLowerCase()
      }
      setSelected({name:keyword})
      console.log(selected);
      updateState('searchTxt', keyword)
      updateState('from', 0)
      navigate('/'); 
       //route(`/?searchTxt=${v.name.toLowerCase()}`, true);
        /*setSelected(v);*/}}
      closeIcon = {false}
      loading={loading && searchTxt}
       renderOption={option => {
          return <div>{`${option.name} (${option.type})`}</div>;
        }}
            renderInput={(params) => {
            params.InputProps.value=selected.name;
             return (
        <TextField
          {...params}
          label="Search"
          value={selected.name}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}}
    />
  );
}
