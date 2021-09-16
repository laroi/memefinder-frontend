import { h, Component } from 'preact';
import { withStyles } from '@material-ui/core/styles';
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

export default function AboutUs(props) {
  /*const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };*/

  return (
    <div>
      <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          About Us
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            This is a hobby project we started aiming to make plain memes searchable. It all started some time back when one of us wanted to reply to a friend with a meme. Like many of you, he tried <Link href="https://www.google.com" target="_blank">Google</Link>, but <Link href="https://www.facebook.com" target="_blank">Facebook</Link> will not let <Link href="https://www.google.com" target="_blank">Google</Link> index their data. So you can't see it in <Link href="https://www.google.com" target="_blank">Google</Link>. <Link href="https://www.facebook.com" target="_blank">Facebook</Link>  itself is not very good at searching posts. And the posts never had any structure. So he tried alternatives like <Link href="https://www.makeachali.com/" target="_blank">Make a Chali</Link> and <Link href="http://www.whykol.com/" target="_blank">Whykool</Link>. <Link href="https://www.makeachali.com/" target="_blank">Make a Chali</Link> is a good initiative, but not well maintained and is very hard to use, while <Link href="http://www.whykol.com/" target="_blank">Whykool</Link> is very tedious to search. Needless to say, he couldn't reply to his friend on time, and it was very embarrassing. This whole thing resembled Internet in mid 90s, there was a bunch of search engines, none did what it was supposed to do, In reasonably good way.
          </Typography>
          <Typography gutterBottom>
            All of these brings us to the main meme search application <Link href="https://www.memezero.com/" target="_blank">memezero</Link>. At this point, memezero holds most number of memes. Even though the application is quite popular, there are some problems with it. The main problem we see is the third party app usage, Like facebook for login, and google for analytics. Another main problem is the ads. We do understand that ads are the only source of income and hence ads are fine. But if an ad starts tracking users, that is not at all cool.  And the site lack modern web features. We intend to index all the plain memes in a structured way so that you can find them with ease. Primary objective is to find specific meme without trying hard with no one (not even google or facebook) tracking our users. We firmly believe facebook and google are evil for the users in the internet
          </Typography>
          <Typography gutterBottom>
            Some people use <Link href="https://www.facebook.com" target="_blank">Facebook</Link> mainly to read trolls (and may be to back up photos). If you are one of them who are stuck with <Link href="https://www.facebook.com" target="_blank">Facebook</Link> just for reading trolls even if you don't want to use it, you could use this application. In the recent light of incidents with <Link href="https://www.theguardian.com/news/2018/mar/26/the-cambridge-analytica-files-the-story-so-far" target="_blank">Cambridge Analytica scandal</Link>, if anyone wants to stay as less as possible from <Link href="https://www.facebook.com" target="_blank">Facebook</Link> and still enjoy reading the trolls, this could be a potential place
          </Typography>
          <Typography gutterBottom>
          We also think <Link href="https://www.facebook.com" target="_blank">Facebook</Link>  is not designed specifically for memes, for example, reply for a meme should not be redundant. Also, all the replies and replies of replies should be grouped together. Currently there is no way to do this. Another problem with <Link href="https://www.facebook.com" target="_blank">Facebook</Link> groups are that they will give away your identity This could be problem for those who want appreciate a good troll in groups like <Link href="https://www.facebook.com/groups/MNTROLLS/" target="_blank">MNT</Link>.
          </Typography>
          <Typography gutterBottom>
          There will be absolutely no tracking of users (not even google analytics). We also will not, under any circumstance, allow any ad trackers to track you by our application. while using this website, your comminication will be with our servers and our servers only. We respect our users privacy, you might have already noticied it if you have completed the registration
          </Typography>
          <Typography gutterBottom>
          <h2>Fields Description</h2>
                <ul>
                    <li> Title : This should be the key identifier. Can either be dialog or one line description Eg : Mothalaalee, Johns pling </li>
                    <li> Tag : If there are multiple dialgoes, add it here. Can be multiple values</li>
                    <li> Movie : The movie in which the troll scene is from</li>
                    <li> Actors : Actors in the scene. Can be multiple</li>
                    <li> Character : Actor's Character name in the scene</li>
                    <li> Context : These are the emotions that represent the troll. We have some predefined contexts to pick</li>
                    <li> Language : To which language the troll belong to</li>
                </ul>
          </Typography>
          <Typography gutterBottom>
            <h2>How to use</h2>
                <ul class="usage">
                    <li>By default you will be listed with newest memes</li>
                    <li><i>Basic search</i> will bring you matches in any of the field <br/>
    Eg: <span class="field">Hrithik Roshan</span> can match actor <span class="field">Hrithik Roshan</span> as well as movie <span class="field">Kattappanayile Hrithik Roshan</span></li>
                    <li><i>Advanced search</i> will search for the specific field <br/>
    Eg: Actor<span class="field">Dulquer Salmaan</span> will give you only scenes which has <span class="field">Dulquer Salmaan</span></li>
                    <li><i>Filter</i> can be used filter out based on <i>Language</i>, <i>Context</i> etc</li>
                    <li>You can download the image by clicking <i>Download</i> Icon</li>
                    <li>You can <i>Favorite</i> a meme, so that you can filter only your favorites</li>
                    <li><i>Liking</i> a post is just a way of showing appreciation, your details wont be displayed. Only number of likes will be shown</li>
                    <li>You can get all the trolls by a user by clicking the user's photo</li>
                    <li>You can <i>Upload</i> a meme by upload meme and filling appropreate values. Once uploaded it will be submitted for approvals</li>
                    
                    <li>You don't need to log in to <i>Download</i> or <i>Search</i> memes</li>
                    <li>You should be logged in to <i>Like</i> or <i>Favorite</i>  a meme</li>                    
                </ul>
          </Typography>
          <Typography gutterBottom>
          <h2>What's next</h2>
            <ul class="what-next">
                <li>Multivalue search for fields Eg: search a meme which has two actors</li>
                <li>Searchable trolls </li>
                <li>Notification system</li>
                <li>Offline search engine (very excited about it)</li>
                <li>Create memes using plain meme - A full fledged meme generator</li>
                <li>Meme replies - A meme should be replied only by another meme. All the replies will be displayed in order</li>
            </ul>
             </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose} color="primary">
            Thats cool
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


