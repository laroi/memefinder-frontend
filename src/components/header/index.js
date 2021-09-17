import { h, Fragment } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import {TextField, Container, Grid, InputLabel, Button, Menu, MenuItem, Select, SwipeableDrawer, List, Divider, FormControlLabel, Switch, Snackbar, Avatar, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AComplete from './searchAutoComplete.js';

import { useState, useContext } from 'preact/hooks';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FilterListIcon from '@material-ui/icons/FilterList';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MuiAlert from '@material-ui/lab/Alert';
import FieldAutoComplete from '../fieldAutoComplete.js';
import {navigate, stateObj, storage, updateState} from '../../utilities/utility';
import AboutUs from '../aboutUs.js';
import Insights from '../insights.js';
import Match from 'preact-router/match';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {UserContext} from '../../context/userContext.js'
import {GeneralContext} from '../../context/generalContext.js'
import { purple } from '@material-ui/core/colors';
import {Alert} from '../general.js'
const PurpleSwitch = withStyles({
  switchBase: {
    color: '#808080',
    '&$checked': {
      color: '#673AB7',
    },
    '&$checked + $track': {
      backgroundColor: '#673AB7',
    },
  },
  checked: {},
  track: {},
})(Switch);

const useStyles = makeStyles((theme) => ({
  element: {
    width: '80%',
    margin: '10px 20px',
  },
  purpleElement: {
    margin: '10px 20px',
  },
elementWrap: {
    width: '100%'
},
labelWrap: {
    margin: '0px 20px'
},
filterWrapper: {
    display: 'flex',
    flexDirection: 'column'
},
fieldWrapper: {
    marginLeft: '10px'
}
}));

const loginClick = (setDrawer) => {
    return () => {
        setDrawer(false);
        navigate('/login')
        
    }
}
const registerClick = (setDrawer) => {
    return () => {
        setDrawer(false);
        navigate('/register')
        
    }
}
const createNewClick = (setDrawer) => {
    return () => {
        setDrawer(false);
        navigate('/create')
        
    }
}
const logoutClick = (setDrawer, setOpen, setMessage) => {
    const [user, setUser] = useContext(UserContext);
    return async() => {
        try {
            let response = await fetch(`/api/token/${storage.getItem('token')}`, {
                method: 'DELETE',
                headers : {'Content-Type': 'application/json'},
            });
        }
        catch (e) {
            setDrawer(false);
            setOpen(true);
            setMessage(e)
            return
        } 
        setDrawer(false);
        storage.delItem('token');
        storage.delItem('user');
        setUser({});
        navigate('/')
        
    }
}

const getUser = ()=> {
    const [user, setUser] = useContext(UserContext);
    if (user && user.name) {
        return (
            <div className={style.userWrap}>
                <div className={style.avatarCont}><Avatar alt={user.name} src={`api/${user.picture.thumb}`} /></div>
                <div className={style.username}>{user.name}</div>
            </div>
        )
    }
    return (
        <div className={style.userWrap}>
            <div className={style.avatarCont}><PersonSharpIcon /></div>
        </div>
    )
}
const getLogin = (setDrawer) => {
    const [user, setUser] = useContext(UserContext);
    if (!(user&&user.name)) {
        return (
            <Fragment>
            <Divider />
                <ListItem button onClick={loginClick(setDrawer)}>
                    <ListItemIcon><ExitToAppIcon /> </ListItemIcon>
                    <ListItemText primary={'Log in'} />
                 </ListItem>
             </Fragment>
        )
    }
    return null
}
const getRegister = (setDrawer) => {
    const [user, setUser] = useContext(UserContext);
    if (!(user && user.name)) {
        return (
            <Fragment>
            <Divider />
                <ListItem button onClick={registerClick(setDrawer)}>
                    <ListItemIcon><PersonAddIcon /> </ListItemIcon>
                    <ListItemText primary={'Register'} />
                 </ListItem>
             </Fragment>
        )
    }
    return null
}
const getLogout = (setDrawer) => {
    const [user, setUser] = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    if (user && user.name) {
        return (
            <Fragment>
                <Divider />
                <ListItem button onClick={logoutClick(setDrawer, setOpen, setMessage)} >
                    <ListItemIcon><ExitToAppIcon className={style.logout}/> </ListItemIcon>
                    <ListItemText primary={'Logout'} />
                 </ListItem>
                 <Snackbar open={open} autoHideDuration={6000} anchorOrigin={ {vertical:'top', horizontal:'center'}} onClose={()=> {setOpen(false)}}>
                    <Alert onClose={()=> {setOpen(false)} } severity="error"> {`Error in loggin in ${message || ''}`} </Alert>
                 </Snackbar>
             </Fragment>
        )
    }
    return null
}
const getCreateNew = (setDrawer) => {
    const [user, setUser] = useContext(UserContext);
    if (user&&user.name) {
        return (
            <Fragment>
            <Divider />
                <ListItem button onClick={createNewClick(setDrawer)}>
                    <ListItemIcon><AddIcon /> </ListItemIcon>
                    <ListItemText primary={'Create'} />
                 </ListItem>
             </Fragment>
        )
    }
    return null
}
const ListComponent = (setDrawer, setAboutusopen, setInsightsOpen) => (
    <div
      role="presentation"
      onKeyDown={()=>{setDrawer(false)}}
    >
      
      <List>
           <div className={style.drawerContainer}>
            <div className={style.title} onClick={()=> {setDrawer(false); navigate('/')}}>HyperMemia</div>
            {getUser()}
           </div>
            <Divider />
          <ListItem button onClick={()=>{setDrawer(false); setAboutusopen(true)}} >
            <ListItemIcon><InfoIcon /> </ListItemIcon>
            <ListItemText primary={'About Us'} />
          </ListItem>
          {getLogin(setDrawer)}
          {getRegister(setDrawer)}
          {getLogout(setDrawer)}
          {getCreateNew(setDrawer)}
          <Divider />
          <ListItem button onClick={()=>{setDrawer(false); setInsightsOpen(true)}} >
            <ListItemIcon><AssessmentIcon /> </ListItemIcon>
            <ListItemText primary={'Insights'} />
          </ListItem>
           <Divider />
      </List>
      
    </div>
  );
const ContextSelect = (props) => {
    const [contexts, languages] = useContext(GeneralContext);
    const classes = useStyles();
    return (
    <div  className={classes.elementWrap} >
        <InputLabel className={classes.labelWrap}  htmlFor="cont">Context</InputLabel>
        <Select
            native
            value={props.context}
            className={classes.element}
            inputProps={{ name: 'context', id: 'cont', }}
            onChange={props.setContext()}
        >
            {contexts.map(x=> <option value={x}>{x}</option>)}
        </Select>
    </div>
    )
}  
const LangSelect = (props) => {
    const [contexts, languages] = useContext(GeneralContext);
    const classes = useStyles();
    return (
    <div  className={classes.elementWrap} >
        <InputLabel className={classes.labelWrap}  htmlFor="lang">Language</InputLabel>
        <Select
            native
            value={props.language}
            className={classes.element}
            inputProps={{ name: 'language', id: 'lang', }}
            onChange={props.setLanguage()}
        >
            {languages.map(x=> <option value={x}>{x}</option>)}
        </Select>
    </div>
    )
}  
const UnApprovedSwitch = (props) => {
    const user = storage.getItem('user');
    if (user && user.type==='admin') {
    const classes = useStyles();
        return (
            <div  className={classes.elementWrap} >
                <FormControlLabel
                    control={
                        <PurpleSwitch
                        className={classes.purpleElement}
                        checked={props.unapproved}
                        onChange={props.onChange(!props.unapproved)}
                        name="checkedB"
                        />
                    }
                    label="Unapproved"
                />
            </div>
        )
    }
    return null;
}
const FavoriteSwitch = (props) => {
    const user = storage.getItem('user');
    const isDisabled = user && user.name ? false : true;
    const classes = useStyles();
    return (
        <div>
            <FormControlLabel
                control={
                    <PurpleSwitch
                    className={classes.purpleElement}
                    checked={props.favorite}
                    onChange={props.onChange(!props.favorite)}
                    disabled={isDisabled}
                    name="checkedB"
                    />
                }
                label="Favorite"
            />
        </div>
    )
}
export default function Header(props) {
  const [anchorAdvSearch, setanchorAdvSearch] = useState(null);
  const [anchorFilter, setanchorFilter] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [aboutusopen, setAboutusopen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [state, setState] = useState({});
  const [language, setLanguage] = useState('');
  const [context, setContext] = useState('');
  const [unapproved, setUnapproved] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const handleSeachClick = (event) => {
    const el = document.querySelector('#asynchronous-demo-label')
    console.log(el);
    setanchorAdvSearch(el);
  }
  const handleSearchClose = () => {
    setanchorAdvSearch(null);
  };
  const handleFilterClick = (event) => {
    setanchorFilter(event.currentTarget);
  }
  const handleFilterClose = () => {
    setanchorFilter(null);
  };
  return (
    <header className={style.header} > 
        <Match path="*">
        { ({ matches, path, url }) => { 
            setState(stateObj)
            return (
                <Grid item container direction ={'row'}>
                    <Grid item xs={2}  sm={2}  md={2}  lg={1}>
                        <Button onClick={()=>{console.log('menu click');setDrawer(true)}}><MenuIcon/></Button>
                    </Grid>
                    <Grid item xs={7}  sm={4}  md={4}  lg={4}>
                        <AComplete state={state} setAnchor={setanchorAdvSearch}/>
                         <Menu
                        id="adv-search"
                        anchorEl={anchorAdvSearch}
                        keepMounted
                        open={Boolean(anchorAdvSearch)}
                        onClose={handleSearchClose}
                        
                        classes={{paper:style.menuwrap}}
                        PopoverClasses={{paper:style.menuwrap}}
                        >
                            <FieldAutoComplete placeholder="Movie" state={state} closeOnSelect={false} redirectOnSelect={false} setAnchor={setanchorAdvSearch} field="movie" />
                            <FieldAutoComplete placeholder="Character" state={state} closeOnSelect={false} redirectOnSelect={false} setAnchor={setanchorAdvSearch} field="character" />
                            <FieldAutoComplete placeholder="Actor" state={state} closeOnSelect={false} redirectOnSelect={false} setAnchor={setanchorAdvSearch} field="actor" />
                            <FieldAutoComplete placeholder="Tag" state={state} closeOnSelect={false} redirectOnSelect={false} setAnchor={setanchorAdvSearch} field="tag" />
                            <div className={style.buttonWrap}>
                            <Button onClick={()=> {handleSearchClose();navigate('/');}} className={style.button}>Search</Button>
                            </div>
                        </Menu>
                    </Grid>
                    <Grid container  item  xs={1}  sm={2}  md={2}  lg={1}>
                        <Button aria-controls="adv-search" aria-haspopup="true" onClick={handleSeachClick}>
                        <ArrowDropDownIcon/>
                        </Button>
                    </Grid>
                    <Grid item  xs={2}  sm={2}  md={2}  lg={1}>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleFilterClick}>
                        <FilterListIcon/>
                        </Button>
                        <Menu
                        id="simple-menu"
                        anchorEl={anchorFilter}
                        keepMounted
                        open={Boolean(anchorFilter)}
                        onClose={handleFilterClose}
                        >
                            <div className={style.filterWrapper}>
                                <ContextSelect context={context} setContext={(val) => {return (e)=> {setContext(e.target.value); updateState('context', e.target.value);}}}/>
                                <LangSelect language={language} setLanguage={(val) => {return (e)=> {setLanguage(e.target.value); updateState('language', e.target.value);}}}/>
                                <UnApprovedSwitch unapproved={unapproved} onChange={(val)=>{return ()=> {setUnapproved(val); updateState('isApproved', val);}}}/>
                                <FavoriteSwitch favorite={favorite} onChange={(val)=>{return ()=> {setFavorite(val); updateState('isFavorite', val);}}}/>
                                <div className={style.buttonWrap}>
                                    <Button onClick={()=> {handleFilterClose();navigate('/');}} className={style.button}>Apply</Button>
                                </div>
                            </div>
                        </Menu>
                    </Grid>
                </Grid>
            )
        } }
        </Match>    
        
        <AboutUs open={aboutusopen} handleClose={()=>{setAboutusopen(false)}} />
        <Insights open={insightsOpen} handleClose={()=>{setInsightsOpen(false)}} />
        <SwipeableDrawer
        anchor={'left'}
        open={drawer}
        classes={{
        paper: style.drawer, // class name, e.g. `classes-nesting-root-x`
      }}
        onClose={()=>{setDrawer(false)}}
        onOpen={()=>{console.log('on open'); setDrawer(true)}}
        >
            {ListComponent(setDrawer, setAboutusopen, setInsightsOpen)}
        </SwipeableDrawer>
          
              
    </header>
    )
}

