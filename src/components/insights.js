import { h, Component } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Accordion, AccordionDetails, AccordionSummary, Chip} from '@mui/material';
/*import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';*/
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

});
const useStyles = makeStyles((theme) => ({
    dialog: {
        maxWidth:'1000px',
        width: '60%'
    },
  dialogBody: {
    width:'90%'
  },
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },
  accordTitleWrap: {
      display:'flex',
      width: '100%',
      justifyContent:'space-between'
  },
  accordTitle: {
      fontWeight: 'bold'
  },
  indwrap: {display: 'flex', height:'50px', alignItems: 'center', cursor: 'pointer'},
  indname: {marginRight:'50px', textAlign:'left'},
  indcount: {}
}));
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    textAlign: 'justify'
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
const AccordionContent = ({key, title, obj})=> {
    const classes = useStyles();
    const titleMap = {
        movieList : {title: 'Movies', loc: '?movie='},
        userList : {title: 'Users', loc:'?user='},
        langList : {title: 'Language', loc:'?language='},
        actorList : {title: 'Actors', loc: '?actor='}
    }
  const getUrl = (x) => {
    if (title==='userList') {
      return ()=>{window.location=`${titleMap[title].loc}${x._id}&username=${x.name}`}
    }
    return ()=>{window.location=`${titleMap[title].loc}${x._id}`}
  }
  return (
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={classes.accordTitleWrap}> <div className={classes.accordTitle}>{titleMap[title].title}</div><div><Chip label={obj.length} color="primary"/></div></div>
        </AccordionSummary>
        <AccordionDetails>
          {obj.map(x=>(x._id && (<div className={classes.indwrap} onClick={getUrl(x)}><div className={classes.indname}>{x.name || x._id}</div><div className={classes.indcount}><Chip label={x.count}/></div></div>)))}
        </AccordionDetails>
      </Accordion>
  )
}
export default function Insights(props) {
    const classes = useStyles();
  const [details, setDetails] = useState({});
  useEffect(() => {
    (async () => {
            let url = `/api/insight`;
            const response = await fetch(url);
            const _details = await response.json();
            console.log(_details)
            setDetails(_details)
    })();
}, [])
console.log(details)
  return (
    <div>
      <Dialog classes={{ paper: classes.dialogPaper }} fullWidth maxWidth="md" onClose={props.handleClose} sx={{ width: '800px'}}aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
         Inights
        </DialogTitle>
        <DialogContent className={classes.dialogBody} dividers>
        <div>{Object.keys(details).map(detail => <AccordionContent key={detail} title={detail} obj={details[detail]}/>)}</div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose} color="primary">
            Woah... Dude
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


