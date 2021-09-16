import { h } from "preact";
import { createContext } from "preact-context";
import {stateObj} from '../utilities/utility.js'
const MyContext = createContext({stateObj});
export default MyContext;
