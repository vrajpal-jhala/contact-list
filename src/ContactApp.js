import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import clsx from 'clsx';
import AppDrawer from './components/AppDrawer';
import Contacts from './screens/Contacts';
import Shows from './screens/Shows';
import Pokedex from './screens/Pokedex';
import {
  withStyles,
  Backdrop,
  Hidden,
} from '@material-ui/core';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.scss";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    width: '100%'
  },
  contentPosition: {
    position: "static",
    [theme.breakpoints.only("xs")]: {
      position: "fixed",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer - 1,
  }
});

class ContactApp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      drawer: 'semi'
    }
  }

  handleFullDrawerToggle = () => {
    this.setState({
      drawer: this.state.drawer === "open" ? "close" : "open"
    })
  }

  handleMiniDrawerToggle = () => {
    this.setState({
      drawer: this.state.drawer === "semi" ? "open" : "semi"
    })
  }

  render = () => {
    const { classes } = this.props;
    const { drawer } = this.state;
    return (
      <div className={classes.root} >
        <Hidden smUp>
          <Backdrop open={drawer === "open"} className={classes.backdrop}></Backdrop>
        </Hidden>
        <Router basename="/contact-list">
          <AppDrawer
            open={drawer}
            handleMiniDrawerToggle={this.handleMiniDrawerToggle}
          />
          <div className={clsx(classes.content, drawer === "open" && classes.contentPosition)}>
            <Switch>
              <Route exact path={"/"} key={"Contacts"}>
                <Contacts
                  handleFullDrawerToggle={this.handleFullDrawerToggle}
                />
              </Route>
              <Route exact path={"/shows"} key={"Shows"}>
                <Shows
                  handleFullDrawerToggle={this.handleFullDrawerToggle}
                />
              </Route>
              <Route exact path={"/pokedex"} key={"Pokedex"}>
                <Pokedex
                  handleFullDrawerToggle={this.handleFullDrawerToggle}
                />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
};

export default withStyles(styles)(ContactApp);