import { h, Component } from 'preact';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'preact/hooks';
import BottomActions from '../../components/bottomBar.js'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {navigate} from '../../utilities/utility';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 65,
    width:'100%'
    
  },
  contentWrap: {
    width:'95%',
    maxWidth:'600px',
    boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
    margin: '0 auto',
    
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
        marginBottom: '10px',
        marginLeft: '10px'
  }
}));

export default function DetCard(props) {
  const [post, setPost] = useState({});
  useEffect(() => {
  (async () => {
        
            let response = await fetch(`/api/post/${props.id}`);
            response = await response.json();
            setPost(response)
            
       })()
        
  },[props.id])
    const classes = useStyles();
    const {image:{url}={}, title} = post
    return (
        <div className={classes.root}>
        <div className={classes.title}> <IconButton onClick={()=> {navigate('/')}} className={classes.iconWrap} aria-label="share">
                <ArrowBackIosIcon  className={classes.icon}/>
            </IconButton> {title}</div>
            <div className={classes.contentWrap}>
            
            <img className={classes.img} src={`../api${ url}`} alt={title}/>
            <BottomActions post={post}/>
            </div>
        </div>
    )
}
