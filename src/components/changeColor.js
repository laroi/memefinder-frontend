import { h, Component } from 'preact';
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 1,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 1 },
};

const Fade = (props) => (
  <Transition in={props.propsIn} timeout={300}>
    {state => {console.log(state);return (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
       {props.children}
      </div>
    )}}
  </Transition>
);

const ChangeColor=(Target, downloading)=> {
    return (<Fade propsIn={downloading}>{Target}</Fade>)
    
}

export {ChangeColor}
