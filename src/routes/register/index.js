import { h, Fragment } from 'preact';
import style from './style';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AddPhotoIcon from '@material-ui/icons/AddAPhoto';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CasinoIcon from '@material-ui/icons/Casino';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useState, useContext } from 'preact/hooks';
import {navigate, storage} from '../../utilities/utility';
import {UserContext} from '../../context/userContext.js'
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import Loader from '../../components/loader.js';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProfImage = ({image, onFileChange}) => {
    return (
        <div className={style.profWrapper}>
            <div className={style.profCont}>
                {image && <img className={style.profImg} src={image}/>}
                <label htmlFor="icon-button-file">
                    <div className={style.changeProf}><AddPhotoIcon color="secondary"/></div>
                    <input accept="image/*" onChange={onFileChange} className={style.uploadIcon} id="icon-button-file" type="file" />
                </label>
            </div>
        </div>
    )
}

const GenderSelect = ({gender, handleRadioChange}) => {
    return (
        <FormControl className={style.textel}  component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row aria-label="position" name="gender" value={gender}  onChange={handleRadioChange}>
                <FormControlLabel
                  value="male"
                  control={<Radio color="primary" />}
                  label="Male"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio color="primary" />}
                  label="Female"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio color="primary" />}
                  label="Other"
                  labelPlacement="start"
                />
            </RadioGroup>
        </FormControl>
    )
}

const Register = (props) => {
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [isUsed, setIsUsed] = useState(false);
    const [gender, setGender] = useState("male");
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('error');
    const [user, setUser] = useContext(UserContext);
    const [preview, setPreview] = useState('');
    const [randFechLoad, setRandFechLoad] = useState(false);
    const handleRegister = async () => {
        if (userName && password && name) {
            if (!isUsed) {
                try {
                    let body = {email:userName, password: password, phone:phone, picture:preview, name:name}
                    console.log(body);
                    let response = await fetch(`/api/user`, {
                        method: 'POST',
                        headers : {'Content-Type': 'application/json'},
                        body: JSON.stringify(body)
                    });
                    response = await response.json();
                    if (response.err) {
                        setOpen(true);
                        setMessage(response.err)
                        return
                    }
                    storage.setItem('token', response.token)
                    storage.setItem('user', response.user)
                    setUser(response.user); 
                    setOpen(true);
                    setSeverity('info');
                    setMessage('Registration successful. Please check your mail for verification link. Check spam folder too if you can\'t find it in the inbox');
                    setTimeout(()=>{navigate('/')}, 6000)
                } catch (e) {
                    console.log(e)
                    setOpen(true);
                    setMessage('Error in registering')
                }
            } else {
                setOpen(true);
                setMessage('Name is already used');
            }
        } else {
             setOpen(true);
                setMessage('Failed to get data')
        }
    }
    const onFileChange = (e) => {
        e.preventDefault();
        setIsUsed(false)
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setPreview(reader.result)
        }

        reader.readAsDataURL(file)
    }
    const handleRadioChange = (e) => {
        setGender(e.target.value);
    }
    const getImgTag = ()=>{
        if (preview) {
            return (
                <img className={style.img} src={preview}/>
            )
        }
        return null;
    }
    const fetchRandomName = (gender)=> {
        return async() => {
            try {
                setRandFechLoad(true);
                let response = await fetch(`/api/randomuser?gender=${gender}`, {
                    method: 'GET',
                    headers : {'Content-Type': 'application/json'},
                });
                response = await response.json();
                setRandFechLoad(false);
                console.log(response);
                setName(response.name)
                setPreview(`/api/${response.picture.thumb}`)
                setIsUsed(response.isUsed)
            } catch (e) {
                setRandFechLoad(false);
                setOpen(true);
                console.log(e);
                setMessage('Failed to get data')
            }
        }
    }
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
    return (
        <Container className={style.wrapper}>
            <div className={style.filedWrapper}>
                <ProfImage image={preview} onFileChange={onFileChange}/>
                {isUsed && (<Typography color="error" variant="subtitle2">Sorry.... This name is already used, try next</Typography>)}
                <TextField fullWidth className={style.textel} id="username" onChange={(e)=> {setUserName(e.target.value.trim())}} label="Email*" />
                <TextField fullWidth className={style.textel} id="password" label="Password*" onChange={(e)=> {setPassword(e.target.value)}} type="password"/>
                <GenderSelect gender={gender} handleRadioChange={handleRadioChange} setGender={setGender}/>
                <TextField fullWidth className={`${style.nametext}`} id="name" value={name} onChange={(e)=> {setName(e.target.value.trim())}} label="Name*"
                InputProps={{
                endAdornment:<InputAdornment position="end">
                <Loader loading={randFechLoad}/>
                <IconButton
                  aria-label="toggle password visibility"
                  style={{marginLeft: '20px'}}
                  onClick={fetchRandomName(gender)}
                  onMouseDown={e=>{console.log(e)}}
                >
                  <CasinoIcon/>
                </IconButton>
              </InputAdornment>
                }}       
                />
                
                <Typography variant="caption" display="block" gutterBottom>Always mask your orignal name with pseudonym. Click on the dice for examples (based on gender selected)</Typography>
                <TextField fullWidth className={style.textel} id="phone" onChange={(e)=> {setPhone(e.target.value.trim())}} label="Phone" />
                <div>
                </div>

            </div>
             <Button
            variant="contained"
            className={style.button}
            onClick={handleRegister}
            startIcon={<PersonAddIcon />}
            >
                Register
            </Button>
            <Snackbar open={open} autoHideDuration={6000} anchorOrigin={ {vertical:'top', horizontal:'center'}} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}> {`${message || ''}`} </Alert>
            </Snackbar>
        </Container>
    )
}
export default Register
