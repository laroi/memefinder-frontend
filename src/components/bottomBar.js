import { h, Component, Fragment } from 'preact';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ShareIcon from '@material-ui/icons/Share';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useState } from 'preact/hooks';
import Snackbar from '@material-ui/core/Snackbar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import { route } from 'preact-router';
import MenuItem from '@material-ui/core/MenuItem';
import { storage, navigate} from '../utilities/utility';
import { ChangeColor} from './changeColor';
import {Alert} from './general.js'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  icon: {
    fontSize:18,
  },
  iconWrap: {
    padding: '5px',
  },
  bottom: {
    justifyContent: 'flex-end'
  },
  "@keyframes change": {
    to: {
        fill: 'black',
        opacity: '0.2',
        }
    },
    anim: {
       animation:  `$change 1s infinite alternate`
    }
}));
const delay = ()=> {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{resolve()}, 5000)
    })
}
const download = (post, setDownloading)=> {
    const classes = useStyles();
    return async(e) => {
        e.stopPropagation();
        e.target.classList.add(classes.anim)
        await getImage(`/api/image/${post._id}`, post._id, 'download');
        e.target.classList.remove(classes.anim)
    }
}
const share = (post)=> {
    const classes = useStyles();
    return async (e) => {
        e.stopPropagation();
        e.target.classList.add(classes.anim)
        const file = await getImage(`/api/image/${post._id}`, post._id, 'share');
        if (navigator.share && navigator.canShare( { files: [file] } )) {
            try {
                const shr = await navigator.share({
                    files: [file]
                })
            } catch (err)  {
                console.error(err.message);
                e.target.classList.remove(classes.anim)
                return;
            };             
        } else {
            alert(`not sharable ${navigator.share}`);
            e.target.classList.remove(classes.anim)
            return;
        }     
    }
}
const getImage = (url, filename, action) => {
    if (!url) {
        return Promise.reject('No url');
    }
    if (action === 'download') {
        return fetch(url + '?action='+action)
        .then(function(res){
          return res.blob()
        })
        .then(function(blob){
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = '"'+filename+'".jpg';
            document.body.appendChild(a);
            a.click();
            a.remove();
            //window.URL.revokeObjectURL(url);
            return
        })
        .catch((err) =>  {
            return Promise.reject(err)
        })
    } else if (action === 'share') {
         return fetch(url + '?action='+action)
        .then(function(res){
          return res.arrayBuffer()
        })
        .then(function(blob){
            filename = filename+'.jpg';
            console.log(filename, blob)
            return new File([blob], filename, {type: 'image/jpeg'});            
            //return new File(["test"], 'test.txt', {type: 'text/plain'});            
        })
        .catch((err) =>  {
            return Promise.reject(err)
        })
    }
    return Promise.reject('No action specified');
}
const Favorite = (props) => {
    const classes = useStyles();
    const user = storage.getItem('user');
    if (user && user.name) {
        return (
            <IconButton className={classes.iconWrap} aria-label="add to favorites">
                <StarBorderIcon className={classes.icon} />
            </IconButton>
        )
    }
    return null
}
const deletePost = (id, setConf, setSnk, setMessage, setResults, results) => {
    return async ()=> {
        let token = storage.getItem('token');
        setConf(false);
        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
            headers : {'Content-Type': 'application/json', Authorization: token},
        });
        if (!response.ok){
            setMessage(`Deleting ${id} failed`);
            setSnk(true)
            return
            //throw  new Error(response.statusCode)
        }
        let newRes = results.filter(x=>x._id !== id)
        setResults(newRes);
    }
}
const DeleteMenu = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <Fragment>
            <MenuItem onClick={(e)=>{props.setOpen(false); props.setConf(true)}}>Delete </MenuItem>
        </Fragment>
    )
}
const More = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [conf, setConf] = useState(false);
    const [snk, setSnk] = useState(false);
    const [message, setMessage] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const user = storage.getItem('user');
    const {post:{_source={}}={}} = props
    if (user && (user.type==='admin' || user._id === _source.user)) {
        return (
            <Fragment>
            <IconButton className={classes.iconWrap} onClick={(e)=> {e.stopPropagation();setOpen(true); setAnchorEl(e.currentTarget);}} aria-label="More">
                <MoreVertIcon className={classes.icon} />
            </IconButton>
                <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                anchorOrigin={{ vertical: 'top', horizontal: 'left'}}
                onClose={(e)=>{setOpen(false)}}
                PaperProps={{
                style: {
                width: '10ch',
                },
                }}
                >
                    <MenuItem onClick={(e)=>{ e.stopPropagation(); setOpen(false); route(`/edit/${props.post._id}`)}}>Edit </MenuItem>
                    <DeleteMenu setOpen={setOpen} setConf={setConf}/>
                </Menu>
                <Dialog
                    open={conf}
                    onClose={()=>{setConf(false)}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="del-conf">{"Are you sure you want to delete?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="del-conf-txt">
                        You are about to delete this post. This action is irreversible
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{setConf(false)}} color="primary">No</Button>
                    <Button onClick={deletePost(props.post._id, setConf, setSnk, setMessage, props.setResults, props.results)} color="secondary" autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snk} autoHideDuration={6000} anchorOrigin={ {vertical:'top', horizontal:'center'}} >
                <Alert onClose={()=> {setSnk(false)} } severity={"error"}> {message} </Alert>
            </Snackbar>
            </Fragment>
        )
    }
    return null;
}
const Share = (props) => {
    const classes = useStyles();
    if (navigator.share) {
        return (
            <IconButton onClick={share(props.post)} className={classes.iconWrap} aria-label="share">
                <ShareIcon  className={classes.icon}/>
            </IconButton>
        )
    }
}
const Download = (props) => {
    const classes = useStyles();
    const [downloading, setDownloading] = useState(false);
    return (
        <IconButton className={classes.iconWrap} onClick={download(props.post, setDownloading)} aria-label="download">
            <GetAppIcon className={classes.icon} />
        </IconButton>
    )
}
export default function BottomActions(props) {
    const classes = useStyles();
    return (
        <CardActions className={classes.bottom}>
            <Favorite post={props.post}/>
            <Share post={props.post}/>
            <Download post={props.post}/>
            <More post={props.post} setResults={props.setResults} results={props.results}/>
            
        </CardActions>
)
}
