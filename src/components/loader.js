import { h, Component } from 'preact';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    cont: {
        width: '50px',
        height: '50px',
        position: 'absolute'
    }
}));
const Loader = ({loading}) => {
    const classes = useStyles();
    if (loading) {
        return (
            <div className={classes.cont}>
                <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 100 100" enable-background="new 0 0 0 0" xmlSpace="preserve">
                    <circle fill="#673AB7" stroke="none" cx="6" cy="50" r="6">
                        <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.1"/>    
                    </circle>
                    <circle fill="#673AB7" stroke="none" cx="26" cy="50" r="6">
                        <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite" 
                        begin="0.2"/>       
                    </circle>
                    <circle fill="#673AB7" stroke="none" cx="46" cy="50" r="6">
                        <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite" 
                        begin="0.3"/>     
                    </circle>
                </svg>
            </div>
        )
    }
    return null;
}

export default Loader;
