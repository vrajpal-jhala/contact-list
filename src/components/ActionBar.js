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
  Delete,
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
  btnWrapper: {
    padding: '50px 20px',
    [theme.breakpoints.down("sm")]: {
      padding: '30px 10px',
    },
    [theme.breakpoints.down("xs")]: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '0px 10px 30px 10px',
    },
  },
  actionBtn: {
    background: 'linear-gradient(to right, #fa8569, #ff4b6e)',
    color: '#ffffffbf',
    textTransform: 'none',
    height: '100%',
    margin: '0px 2px',
    [theme.breakpoints.down("sm")]: {
      margin: '0px 6px',
      minWidth: '48px',
    },
    [theme.breakpoints.down("xs")]: {
      minWidth: '90px',
    },
    [theme.breakpoints.up("md")]: {
      minWidth: '126px',
    },
  },
}));

const ActionBar = ({ addContact, someSelected, deleteContact, searchQuery, searchContact }) => {
  const classes = useStyle();

  return (
    <Grid container item md={12}>
      <Grid item lg={4} md={6} sm={8} xs={12} className={classes.searchBarSpacing}>
        <Paper elevation={0} className={classes.searchBar}>
          <InputBase
            className={classes.searchInput}
            placeholder="Search contacts"
            value={searchQuery}
            onChange={searchContact}
          />
          <Search />
        </Paper>
      </Grid>
      <Grid item lg={4} md={6} sm={4} xs={12} className={classes.btnWrapper}>
        <Button variant="contained" className={classes.actionBtn} onClick={addContact}>
          + <Hidden only="sm">Add<Hidden smDown> Contact</Hidden></Hidden>
        </Button>
        {
          someSelected &&
          <Button variant="contained" className={classes.actionBtn} onClick={deleteContact}>
            <Delete style={{ fontSize: 16 }} /> <Hidden only="sm">Delete</Hidden>
          </Button>
        }
      </Grid>
    </Grid>
  );
};

export default ActionBar;