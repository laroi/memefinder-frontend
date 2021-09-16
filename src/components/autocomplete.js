import { h, Component, Fragment } from 'preact';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState, useEffect, useCallback } from 'preact/hooks'
import CloseIcon from '@material-ui/icons/Close';

export default function AutoComplete(props) {
    const {open, setOpen, options, setOptions, searchTxt, onChange, onInputChange, fullWidth, placeholder, onKeydown} = props;
    const loading = open && options.length === 0;
  return (
    <Autocomplete
      id="asynchronous-demo"
      open={open}
      value={{name:searchTxt || ''}}
      freeSolo
      openOnFocus={true}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
        setOptions([]);
      }}
      selectOnFocus
      fullWidth={props.fullWidth}
      multiple={props.multiple}
      className={props.className}
      getOptionSelected={(option, value) => { return option.name}}
      getOptionLabel={(option) => `${option.name}`}
      options={options}
      onInputChange = {onInputChange()}
      onChange = {onChange()}
      closeIcon = {<CloseIcon fontSize="small" />}
      loading={loading && searchTxt}
       renderOption={option => {
          return <div>{`${option.name} (${option.type})`}</div>;
        }}
            renderInput={(params) => {
             return (
        <TextField
          {...params}
          onKeyDown={onKeydown()}
          label={placeholder}
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
