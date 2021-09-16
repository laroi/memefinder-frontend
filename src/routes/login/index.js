import { h, Component } from 'preact';
import style from './style';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useState, useContext } from 'preact/hooks';
import {navigate, storage} from '../../utilities/utility';
import {UserContext} from '../../context/userContext.js'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Login = (props) => {
    const [userName, setUserName] = useState(false);
    const [password, setPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const login = async () => {
        console.log(userName, password)
        try {
            let response = await fetch(`/api/token`, {
                method: 'POST',
                headers : {'Content-Type': 'application/json'},
                body: JSON.stringify({email:userName, password: password})
            });
            response = await response.json();
            console.log(response);
            if (response.err) {
                setOpen(true);
                setMessage(response.err)
                return
            }
            storage.setItem('token', response.token)
            storage.setItem('user', response.user)
            setUser(response.user); 
            navigate('/')
        } catch (e) {
            setOpen(true);
        }
    }
    return (
        <Container className={style.wrapper}>
            <TextField className={style.textel} id="username" onChange={(e)=> {setUserName(e.target.value.trim())}} label="Username" />
            <TextField className={style.textel} id="password" label="Password" onChange={(e)=> {setPassword(e.target.value)}} type="password"/>
            <Button
            variant="contained"
            className={style.button}
            onClick={login}
            startIcon={<ExitToAppIcon />}
            >
                Login
            </Button>
            <Snackbar open={open} autoHideDuration={6000} anchorOrigin={ {vertical:'top', horizontal:'center'}} onClose={()=> {setOpen(false)}}>
                <Alert onClose={()=> {setOpen(false)} } severity="error"> {`Error in loggin in ${message || ''}`} </Alert>
            </Snackbar>
        </Container>
        
    )
}
export default Login
