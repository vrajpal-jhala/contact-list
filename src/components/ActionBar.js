import React from 'react';
import {
  makeStyles,
  Grid,
  Paper,
  InputBase,
  Button,
  Hidden,
} from '@material-ui/core';
import {
  Search,
} from '@material-ui/icons';

const useStyle = makeStyles(theme => ({
  innerSpacing: {
    padding: '40px 50px',
    [theme.breakpoints.only("xs")]: {
      padding: '15px 0px',
    },
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 50,
    padding: '6px 16px',
  },
  searchBarSpacing: {
    padding: '50px 0px',
    [theme.breakpoints.down("sm")]: {
      padding: '30px 0px',
    },
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  addBtnWrapper: {
    padding: '50px 20px',
    [theme.breakpoints.down("sm")]: {
      padding: '30px 10px',
    },
  },
  addBtn: {
    background: 'linear-gradient(to right, #fa8569, #ff4b6e)',
    color: '#ffffffbf',
    textTransform: 'none',
    height: '100%',
    [theme.breakpoints.only("xs")]: {
      borderRadius: '50%',
      minWidth: '44px',
    },
  },
}));

const ActionBar = () => {
  const classes = useStyle();

  return (
    <Grid container item md={12}>
      <Grid item lg={4} md={6} sm={8} xs={9} className={classes.searchBarSpacing}>
        <Paper elevation={0} className={classes.searchBar}>
          <InputBase
            className={classes.searchInput}
            placeholder="Search contacts"
          />
          <Search />
        </Paper>
      </Grid>
      <Grid item lg={8} md={6} sm={4} xs={3} className={classes.addBtnWrapper}>
        <Button variant="contained" className={classes.addBtn}>
          + <Hidden xsDown>Add Contact</Hidden>
        </Button>
      </Grid>
    </Grid>
  );
};

export default ActionBar;