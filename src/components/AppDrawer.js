import React from 'react';
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
  GitHub,
  Twitter,
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
  leftBorder: {
    borderLeft: '4px solid transparent',
    '&:hover, &:focus, &.active': {
      borderColor: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    }
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
            { icon: <Local />, name: "Local" },
            { icon: <Twitter />, name: "Twitter" },
            { icon: <GitHub />, name: "GitHub" }
          ].map((tab, index) =>
            <ListItem button key={tab.name} className={clsx(classes.leftBorder, index === 0 && 'active')} >
              <ListItemIcon className={classes.colorWhite}>{tab.icon}</ListItemIcon>
              <ListItemText primary={tab.name} />
            </ListItem>
          )
        }
      </List>
    </Drawer>
  );
};

export default AppDrawer;