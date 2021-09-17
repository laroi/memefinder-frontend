import { h, Component } from 'preact';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect, useContext } from 'preact/hooks';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InputLabel from '@material-ui/core/InputLabel';
import {storage, navigate} from '../../utilities/utility';
import TextField from '@material-ui/core/TextField';
import CreateAutoComplete from '../../components/createAutoComplete.js'
import CreateAutoCompleteMulti from '../../components/createAutoCompleteMulti.js'
import Select from '@material-ui/core/Select';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from '../../components/general.js'
import {GeneralContext} from '../../context/generalContext.js'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 65,
    width:'100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  contentWrap: {
    boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    maxWidth: '800px'
    
  },
  icon: {
    fontSize:18,
  },
  iconWrap: {
    padding: '5px',
  },
  img: {
    width:'100%',
  },
  title: {
        marginBottom: '10px'
  },
  button: {
    marginTop:'50px',
    marginRight:'50px',
    marginBottom:'50px'
  },
  btnWrap : {
    display: 'flex',
    justifyContent: 'center'
  },
  element: {
    width: '80%',
    margin: '10px 20px',
  },
  elementWrap: {
    width: '100%',
  },
  labelWrap: {
    margin: '0px 20px',
  },
  imgWrap: {
    width: '100%',
    height:'50%',
    paddingRight: '10px'
  },
  img : {
    width: '100%',
    height: '100%'
  },
  input: {
    display: 'none'
  }
}));

const update =  (props) => {
    let {
        id,
        title,
        image,
        movie,
        language,
        context,
        actors,
        characters,
        tags,
        open,
        setOpen,
        setSeverity,
        severity,
        message,
        setMessage,
        post
    } = props
    const arrayEquals = (a, b) => {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }
    return async (e) =>  {
        let token = storage.getItem('token');
        tags = tags ? tags.map(x=>x.name) : [];
        actors = actors ? actors.map(x=>x.name):[];
        characters = characters ? characters.map(x=>x.name): [];
        
        if (token && title && image && movie) {
            let date = new Date();
            /*
             setTitle(_post.title);
                    setSelectedMovie({name: _post.movie})
                    setLanguage(_post.language)
                    setContext(_post.context)
                    setSelectedCharacters(_post.characters.map(x=>{return{name:x}}))
                    setSelectedActors(_post.actors.map(x=>{return{name:x}}))
                    setSelectedTags(_post.tags.map(x=>{return{name:x}}))
                    setPreview(`/api${_post.image.thumb}`)
                    */
            let postData = {
                
            };
            if (title !== post.title) {
                postData.title = title;
            }
            if (image !== `/api${post.image.thumb}`) {
                postData.image = image;
            }
            if (movie.name !== post.movie) {
                postData.movie = movie.name;
            }
            if (context !== post.context) {
                postData.context = context;
            }
            console.log(language, post.language)
            if (language !== post.language) {
                postData.language = language;
            }
            if (!arrayEquals(tags, post.tags)) {
                postData.tags = tags;
            }
            if (!arrayEquals(actors, post.actors)) {
                postData.actors = actors;
            }
            if (!arrayEquals(characters, post.characters)) {
                postData.characters = characters;
            }
                
            if (Object.keys(postData).length > 0) {     
                postData.user = storage.getItem('user')._id,
                postData.lastModified= date.toISOString()
                try {
                    let response = await fetch(`/api/post/${id}`, {
                        method: 'PUT',
                        headers : {'Content-Type': 'application/json', Authorization: token},
                        body: JSON.stringify(postData)
                    });
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    setOpen(true);
                    setSeverity('info')
                    setMessage(`Edited Successfully`);
                } catch (e) {
                    console.log(`error in fetching posts ${e}`)
                    setOpen(true);
                    setSeverity('error')
                    setMessage(`Error in uploading`)
                }
            } else {
                setOpen(true);
                setSeverity('error');
                setMessage(`Nothing to update`)
            }
        } else {
                setOpen(true);
                setSeverity('error');
                setMessage(`Error in uploading : Required parameters missing`)
        }
    }

}

const approve = (id, user, setMessage, setSeverity, setOpen) => {
    return async(e)=> {
        let token = storage.getItem('token');
        const response = await fetch(`/api/post/${id}`, {
            method: 'PUT',
            headers : {'Content-Type': 'application/json', Authorization: token},
            body: JSON.stringify({isApproved: true, _id: id, user: user})
        });
        if (!response.ok){
            setSeverity("error");
            setMessage(`Approving ${id} failed`);
            setOpen(true)
            return
            //throw  new Error(response.statusCode)
        }
        setSeverity("info");
        setMessage(`Successfully approved ${id}`);
        setOpen(true);
        setTimeout(()=> {navigate('/');}, 6000)
    }

}
export default function EditCard(props) {
    const classes = useStyles();
    const [post, setPost] = useState({});
    const [language, setLanguage] = useState('');
    const [context, setContext] = useState('');
    //const [languages, setLanguages] = useState([]);
    //const [contexts, setContexts] = useState([]);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('');
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState(false);
    const [open, setOpen] = useState();
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedActors, setSelectedActors] = useState([]);
    const [selectedCharacters, setSelectedCharacters] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [contexts, languages] = useContext(GeneralContext);
    useEffect(() => {
            (async () => {
                    let url = `/api/post/${props.id}`;
                    const response = await fetch(url);
                    const _post = await response.json();
                    setTitle(_post.title);
                    setSelectedMovie({name: _post.movie})
                    setLanguage(_post.language)
                    setContext(_post.context)
                    setSelectedCharacters(_post.characters.map(x=>{return{name:x}}))
                    setSelectedActors(_post.actors.map(x=>{return{name:x}}))
                    setSelectedTags(_post.tags.map(x=>{return{name:x}}))
                    setPreview(`/api${_post.image.thumb}`)
                    setPost(_post);
                   
            })();
    }, [props.id])

    const onFileChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setFile(file)
            setPreview(reader.result)
            console.log(preview)
        }

        reader.readAsDataURL(file)
    }
    const getImgTag = ()=>{
        if (preview) {
            return (
                <img className={classes.img} src={preview}/>
            )
        }
        return null;
    }
    const ApproveButton = (props) => {
        let user = storage.getItem('user');
        if (user.type==='admin' && !props.isApproved){
            return (
                <Button 
                variant="contained" 
                className={classes.button} 
                onClick={approve(props.id, props.user, props.setMessage, props.setSeverity, props.setOpen)} 
                startIcon={<CheckCircleIcon />}> 
                    Approve
                </Button>
            )
        }
        return null;
    }
    return (
        <div className={classes.root}>
         <Grid container className={classes.contentWrap}>
            <Grid item xs={12}>
                 <Typography variant="h6" gutterBottom>{title || 'Untitled'}</Typography>
            </Grid>
            <Grid container item xs={12} className={classes.subcontentWrap}>
                <Grid item xs={8}>
                    <TextField className={classes.element} value={title} onChange={(e)=> {if (e.target.value.trim()){setTitle(e.target.value.trim())}}} id="standard-basic" label="Title" />
                    <div  className={classes.elementWrap} >
                        <InputLabel className={classes.labelWrap}  htmlFor="lang">Language</InputLabel>
                        <Select
                            native
                            value={language.toLowerCase()}
                            className={classes.element}
                            inputProps={{ name: 'language', id: 'lang', }}
                            onChange={(e)=> {setLanguage(e.target.value)}}
                        >
                            {languages.map(x=> <option value={x}>{x}</option>)}
                        </Select>
                    </div>
                     <div  className={classes.elementWrap} >
                        <InputLabel className={classes.labelWrap}  htmlFor="lang">Context</InputLabel>
                        <Select
                            native
                            value={context.toLowerCase()}
                            className={classes.element}
                            inputProps={{ name: 'context', id: 'cont', }}
                            onChange={(e)=> {console.log(e.target.value); setContext(e.target.value)}}
                        >
                            {contexts.map(x=> <option value={x}>{x}</option>)}
                        </Select>
                    </div>
                    <CreateAutoComplete selected={selectedMovie} setSelected={setSelectedMovie} className={classes.element} placeholder="Movie" field="movie" />
                    <CreateAutoCompleteMulti selected={selectedActors} setSelected={setSelectedActors} className={classes.element} multiple={true} placeholder="Actors" field="actor" />
                    <CreateAutoCompleteMulti selected={selectedCharacters} setSelected={setSelectedCharacters} className={classes.element} multiple={true} placeholder="Characters" field="character" />
                    <CreateAutoCompleteMulti selected={selectedTags} setSelected={setSelectedTags} className={classes.element} multiple={true} placeholder="Tags" field="tag" />
                    
                      
                    
                    
                  </Grid>
                  <Grid item xs={4}>
                    <Grid  item xs={12} className={classes.imgWrap}>
                        {getImgTag()}
                    </Grid>
                    <Grid  item xs={12} className={classes.btnWrap}>
                         <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            onChange={onFileChange}
                            type="file"
                          />
                          <label htmlFor="contained-button-file">
                            <Button variant="contained" className={classes.button} startIcon={<PhotoCamera />} component="span">
                              Upload
                            </Button>
                          </label>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid  item xs={12} className={classes.btnWrap}>
                    <Button 
                    variant="contained" 
                    className={classes.button} 
                    onClick={(e)=> {navigate('/')}} 
                    startIcon={<ArrowBackIosIcon />}> 
                        Cancel
                    </Button>
                    <Button 
                    variant="contained" 
                    className={classes.button} 
                    onClick={update({
                        id:props.id,
                        post:post,
                        title: title,
                        image: preview,
                        movie: selectedMovie,
                        language: language,
                        context: context,
                        actors: selectedActors,
                        characters: selectedCharacters,
                        tags: selectedTags,
                        open: open,
                        setOpen: setOpen,
                        setSeverity: setSeverity,
                        severity: severity,
                        message: message,
                        setMessage: setMessage
                    })} 
                    startIcon={<SaveIcon />}> 
                        Update
                    </Button>
                    <ApproveButton id={post._id} user={post.user} isApproved={post.isApproved} setOpen={setOpen} setMessage={setMessage} setSeverity={setSeverity}/>
                    
                </Grid>
        </Grid>
             
        <Snackbar open={open} autoHideDuration={6000} anchorOrigin={ {vertical:'top', horizontal:'center'}} >
            <Alert onClose={()=> {setOpen(false)} } severity={severity}> {message} </Alert>
        </Snackbar>
        </div>
    )
}
