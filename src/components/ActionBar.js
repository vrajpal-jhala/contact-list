import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Grid,
  Paper,
  InputBase,
  Button,
  Hidden,
  FormHelperText,
  Tooltip,
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
    textTransform: 'capitalize',
    height: '41px',
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

const ActionBar = ({ recordType, searchValue, searchLimit, someSelected, addRecord, deleteRecord, searchRecord }) => {

  const classes = useStyle();

  let [searchQuery, setSearchQuery] = useState({ value: '' });

  const [error, setError] = useState({});

  useEffect(() => {
    setSearchQuery({value: searchValue});
  }, [searchValue]);

  const handleChange = ({ value }) => {
    var { timeoutId } = searchQuery;

    if (timeoutId)
      clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      searchRecord(value);
    }, 1000);

    setSearchQuery({ value, timeoutId });
  }

  const handleKeyDown = ({ target, key }) => {
    const { maxLength, value } = target;
    var { timeoutId } = error;

    const excessiveInput = key.length === 1 && value.length === maxLength;
    if (excessiveInput) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setError({});
      }, 2000);

      setError({ timeoutId, message: `This field can't accept more than ${maxLength} characters` });
    }
  }

  return (
    <Grid container item md={12}>
      <Grid item lg={4} md={6} sm={8} xs={12} className={classes.searchBarSpacing}>
        <Tooltip title={`Search ${recordType}`} placement="top">
          <Paper elevation={0} className={classes.searchBar}>
            <InputBase
              className={classes.searchInput}
              placeholder={`Search ${recordType}s`}
              value={searchQuery.value}
              onChange={({ target }) => handleChange(target)}
              onKeyDown={handleKeyDown}
              inputProps={searchLimit}
            />
            <Search />
          </Paper>
        </Tooltip>
        {
          error.message &&
          <FormHelperText error>{error.message}</FormHelperText>
        }
      </Grid>
      <Grid item lg={4} md={6} sm={4} xs={12} className={classes.btnWrapper}>
        <Tooltip title={`Add ${recordType}`} placement="top">
          <Button variant="contained" className={classes.actionBtn} onClick={addRecord}>
            + <Hidden only="sm">Add<Hidden smDown> {recordType}</Hidden></Hidden>
          </Button>
        </Tooltip>
        <Tooltip title={`Delete ${recordType}`} placement="top">
          <span>
            <Button variant="contained" className={classes.actionBtn} onClick={deleteRecord} disabled={!someSelected} >
              <Delete style={{ fontSize: 16 }} /> <Hidden only="sm">Delete</Hidden>
            </Button>
          </span>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default ActionBar;