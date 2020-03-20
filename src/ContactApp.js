import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import clsx from 'clsx';
import AppDrawer from './components/AppDrawer';
import AppHeader from './components/AppHeader';
import Local from './scenes/Local';
import Twitter from './scenes/Twitter';
import GitHub from './scenes/GitHub';
import {
  withStyles,
  Backdrop,
  Hidden,
} from '@material-ui/core';

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
        <Router>
          <AppDrawer
            open={drawer}
            handleMiniDrawerToggle={this.handleMiniDrawerToggle}
          />
          <div className={clsx(classes.content, drawer === "open" && classes.contentPosition)}>
            <AppHeader
              handleFullDrawerToggle={this.handleFullDrawerToggle}
            />
            <Switch>
              <Route exact path={"/"} key={"Local"}>
                <Local />
              </Route>
              <Route exact path={"/Twitter"} key={"Twitter"}>
                <Twitter />
              </Route>
              <Route exact path={"/GitHub"} key={"GitHub"}>
                <GitHub />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
};

export default withStyles(styles)(ContactApp);