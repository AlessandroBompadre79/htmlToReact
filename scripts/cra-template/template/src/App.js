import './App.scss';
import React, { Component }from 'react';
import Header from './widgets/originary/header/Header';
import { Switch, Route, Redirect, BrowserRouter, Link } from 'react-router-dom';
import PageNotFound from './pages/originary/page-not-found/PageNotFound';
import Home from './pages/originary/home/Home';
import routes from './routes';
import titlize from './common/utilities/string';
import BOOL from './constants/boolean';
import ROOT from './constants/root';

class Main extends Component {
  render() {
    const showRoutes = routes.map(({path, component}) => <Route exact={BOOL.TRUE} path={"/"+path} component={component} />)
    const showLinks = routes.map(({path, name}) => <li className="nav-link"><Link to={"/"+path}>{titlize(name)}</Link></li>)
    return (
      <div className="App">
        <BrowserRouter basename={ROOT}>
          <Header/>
          <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li className="nav-link"><Link to={"/"}>Home</Link></li>
                {showLinks}
              </ul>
            </nav>
            <Switch location={this.props.location}>
              {showRoutes}
              <Route exact={BOOL.TRUE} path='/' component={Home} />
              <Route path='/404' component={PageNotFound} />
              <Redirect to="/404" />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default Main;