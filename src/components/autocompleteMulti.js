import { h, Component, Fragment } from 'preact';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState, useEffect, useCallback } from 'preact/hooks'
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';

export default function MultiAutoComplete(props) {
    const {open, setOpen, options, setOptions, selected, searchTxt, setsearchTxt,setSelected, onChange, onInputChange, fullWidth, placeholder, onKeydown} = props;
    const loading = open && options.length === 0;
  return (
    <Autocomplete
        multiple
        id="tags-standard"
        options={options}
        value={selected}
        getOptionLabel={(option) => option.name}
        onInputChange={onInputChange()}
        onChange={onChange()}
        className={props.className}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={placeholder}
            onKeyDown={onKeydown()}
            placeholder={placeholder}
          />
        )}
      />
  );
}
