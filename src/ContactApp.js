import React from 'react';
import clsx from 'clsx';
import AppDrawer from './components/AppDrawer';
import AppHeader from './components/AppHeader';
import Local from './scenes/Local';
import {
  withStyles,
  Backdrop,
  Hidden,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  contentFixed: {
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
        <AppDrawer
          open={drawer}
          handleMiniDrawerToggle={this.handleMiniDrawerToggle}
        />
        <div style={{ width: "100%" }} className={clsx(drawer === "open" && classes.contentFixed)}>
          <AppHeader
            handleFullDrawerToggle={this.handleFullDrawerToggle}
          />
          <Local />
        </div>
      </div>
    );
  }
};

export default withStyles(styles)(ContactApp);