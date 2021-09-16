import { h, Component } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import Header from './header';
import Grid from '@material-ui/core/Grid';
// Code-splitting is automated for routes
import Home from '../routes/home';
/*import Detail from '../routes/detail';
import Create from '../routes/create';
import Edit from '../routes/edit';
import Login from '../routes/login';*/
import {UserProvider} from '../context/userContext.js'
import {GeneralProvider} from '../context/generalContext.js'
export default class App extends Component {
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
	    console.log(e.url)
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
			    <UserProvider>
			        <GeneralProvider>
			            <Grid container direction={'row'} spacing={1}>
				            <Header />
				            <Router onChange={this.handleRoute}>
					            <Home path="/" />
					             <AsyncRoute
                                    path="/create"
                                    getComponent={ () => import('../routes/create').then(module => module.default) }
                                  />
                                  <AsyncRoute
                                    path="/edit/:id"
                                    getComponent={ () => import('../routes/edit').then(module => module.default) }
                                  />
					            <AsyncRoute
                                    path="/login"
                                    getComponent={ () => import('../routes/login').then(module => module.default) }
                                  />
					            <AsyncRoute
                                    path="/post/:id"
                                    getComponent={ () => import('../routes/detail').then(module => module.default) }
                                  />
                              <AsyncRoute
                                path="/register"
                                getComponent={ () => import('../routes/register').then(module => module.default) }
                              />
				            </Router>
			            </Grid>
			        </GeneralProvider>
			    </UserProvider>
			</div>
		);
	}
}
