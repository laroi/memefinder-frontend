import { h, Component } from 'preact';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';

import { red } from '@material-ui/core/colors';

import Grid from '@material-ui/core/Grid';
import { route } from 'preact-router';


import BottomActions from './bottomBar.js'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  icon: {
    fontSize:18,
  },
  iconWrap: {
    padding: '5px',
  },
  avatar: {
    backgroundColor: red[500],
  },
  img: {
    width:'100%',
  }
}));

const redirectToDetail = (id) => {
    return (e) => {
         e.stopPropagation();
        route(`/post/${id}`)
    }
}

export default function IndCard(props) {
     const classes = useStyles();
     return (
     <Grid item xs={6} sm={4} md={3} lg={1}>
     <Card onClick={redirectToDetail(props.post._id)} className={classes.root}>
     
      <img className={classes.img} src={`/api${props.post._source.image.thumb}`} alt={props.post._source.title}/>
      <BottomActions post={props.post} setResults={props.setResults} results={props.results}/>
    </Card>
    </Grid>
  );
}
