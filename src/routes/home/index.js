import { h } from 'preact';
import style from './style';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IndBox from '../../components/indbox.js';
import Grid from '@material-ui/core/Grid';
import { useState, useEffect, useCallback } from 'preact/hooks';
import Pagination from '@material-ui/lab/Pagination';
import {navigate, updateState, chipObj, storage} from '../../utilities/utility';
import StateChip from '../../components/stateChip.js';
let total;
const Home = (props) => {
let from = props.from || 0;
let loading = true;
const limit = 10;
//const [searchtTxt, setSearchTxt] = useState(props.searchTxt);
const [results, setResults] = useState([]);
const [pages, setPages] = useState(1);
const [current, setCurrent] = useState(1);
const [count, setCount] = useState(1);
  useEffect(() => {
    //loading = true

    (async () => {
    let countries;
    try {
        let opts = {
            search: props.searchTxt?props.searchTxt.toLowerCase():'',
            from: props.from || 0,
        }
        if (props.movie) {
            opts.movie = props.movie;
        }
        if (props.actor) {
            opts.actor = props.actor;
        }
        if (props.character) {
            opts.character = props.character;
        }
        if (props.tag) {
            opts.tag = props.tag;
        }
        if (props.context) {
            opts.context = props.context;
        }
        if (props.language) {
            opts.language = props.language;
        }
        if (props.isFavorite) {
            opts.isFavorite = props.isFavorite;
        }
        if (props.isApproved) {
            opts.isApproved = !props.isApproved;
        }
      let token = storage.getItem('token');
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        headers : {'Content-Type': 'application/json', Authorization: token},
        body: JSON.stringify(opts)
      });
      countries = await response.json();
      } catch (e) {
        console.log(`error in fetching posts ${e}`)
      }
         total =countries.total;
         setCount(total)
         
         setPages(total ? Math.ceil(total/10) : 1)
         console.log(pages)
        setResults(countries.hits)
        setCurrent(Number(props.from/10)+1)
    })();

    return () => {
      loading = false;
    };
  }, [props.searchTxt, props.from, props.movie, props.actor, props.character, props.tag, props.context, props.language, props.isFavorite, props.isApproved]);
return (
<div className={style.home}>
    <StateChip chipData={chipObj()}/>
    <div className={style.total}><code>{`Found ${count} memes` }</code></div>
    <Grid container spacing={3} className={style.gridWrap}>
    {results.map(x=><IndBox post={x} setResults={setResults} results={results}/>)}
    </Grid>
    {console.log(current)}
     <Pagination count={pages} page={current} defaultPage={1} boundaryCount={2} onChange={(event, page)=> {console.log(page); setCurrent(page); updateState('from', ((page - 1 )*limit));  navigate('/'); }} />
    </div>
)
};

export default Home;
