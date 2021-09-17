import { h } from 'preact';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import {navigate, updateState, chipObj} from '../utilities/utility';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    marginBottom: 10,
    
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));
const handleDelete = (item) => {
    return (e)=> {
        console.log(item);
        if (item.label === 'search') {
            updateState('searchTxt', '');
            navigate('/')
        }
        if (item.label === 'movie') {
            updateState('movie', '');
            navigate('/')
        }
        if (item.label === 'actor') {
            updateState('actor', '');
            navigate('/')
        }
        if (item.label === 'character') {
            updateState('character', '');
            navigate('/')
        }
        if (item.label === 'tag') {
            updateState('tag', '');
            navigate('/')
        }
        if (item.label === 'language') {
            updateState('language', '');
            navigate('/')
        }
        if (item.label === 'context') {
            updateState('context', '');
            navigate('/')
        }
        if (item.label === 'unApproved') {
            updateState('isApproved', false);
            navigate('/')
        }
        if (item.label === 'favorite') {
            updateState('isFavorite', false);
            navigate('/')
        }
        if (item.label === 'user') {
          updateState('user', false);
          navigate('/')
      }
    }
}
export default function StateChip(props) {
  console.log('state', props.chipData)
  const classes = useStyles();
  if (props.chipData && props.chipData.length > 0) {
      return (
        <Paper component="ul" className={classes.root}>
          {props.chipData.map((data) => {
          console.log('chip data', data)
          const val = typeof(data.val) === 'boolean' ? '': ` - ${data.val}`
          let icon;
            if (data.type === 'search') {
                icon = <SearchOutlinedIcon/>;
            } else {
                icon = <FilterListOutlinedIcon/>;
            }
            

            return (
              <li key={data.key}>
                  <Chip
                    variant="outlined"
                    size="medium"
                    icon={<SearchOutlinedIcon/>}
                    label={`${data.label} ${val}`}
                    onDelete={handleDelete(data)}
                  />
              </li>
            );
          })}
        </Paper>
      );
  }
  return null;

}
