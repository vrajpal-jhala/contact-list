import React from 'react';
import {
  NavLink
} from "react-router-dom";
import clsx from "clsx";
import {
  makeStyles,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  ChevronLeft,
  ChevronRight,
  PermIdentity as Local,
  LiveTv,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  drawer: {
    backgroundImage: 'linear-gradient(#fa8569, #ff4b6e)',
    color: '#ffffffbf',
    boxShadow: '0px 0px 7px darkgrey',
  },
  drawerSemi: {
    width: theme.spacing(7.5) + 1,
    overflow: 'hidden',
    [theme.breakpoints.only("xs")]: {
      width: '0px'
    }
  },
  drawerOpen: {
    width: theme.spacing(20) + 1,
  },
  toggleBtn: {
    padding: 4,
    textAlign: 'right',
  },
  colorWhite: {
    color: '#ffffffbf',
  },
  menu: {
    paddingTop: theme.spacing(4) + 1,
  },
}));

const AppDrawer = ({ open, handleMiniDrawerToggle }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={clsx({
        [classes.drawerOpen]: open === "open",
        [classes.drawerSemi]: open === "semi",
      })}
      classes={{
        paper: clsx(classes.drawer, {
          [classes.drawerOpen]: open === "open",
          [classes.drawerSemi]: open === "semi",
        })
      }}
    >
      <div className={classes.toggleBtn}>
        <IconButton color="inherit" onClick={handleMiniDrawerToggle}>
          {open === "open" ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
      <List className={classes.menu}>
        {
          [
            { icon: <Local />, name: "Contacts", path: "/" },
            { icon: <LiveTv />, name: "Shows", path: "/shows" },
            { icon: <span className='icon-pokedex' />, name: "Pokedex", path: "/pokedex" }
          ].map((tab, index) =>
            <NavLink exact to={tab.path} key={tab.name}>
              <ListItem button key={tab.name} className="menuItem" >
                <ListItemIcon className={classes.colorWhite}>{tab.icon}</ListItemIcon>
                <ListItemText primary={tab.name} />
              </ListItem>
            </NavLink>
          )
        }
      </List>
    </Drawer>
  );
};

export default AppDrawer;