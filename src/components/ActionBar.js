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
  actionBar: {
    marginBottom: 40,
  },
  background: {
    backgroundColor: '#ddd',
    padding: '40px 20px',
    [theme.breakpoints.only("xs")]: {
      padding: '30px 20px',
    },
  },
  searchBarCol: {
    borderRadius: '10px 0px 0px 10px',
    boxShadow: '5px 2px 3px silver',
    [theme.breakpoints.down("xs")]: {
      paddingBottom: 0,
      borderRadius: '10px 10px 0px 0px',
      boxShadow: '3px 3px 3px silver',      
    }
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffffbf',
    borderRadius: 50,
    padding: '6px 16px',
    [theme.breakpoints.down("xs")]: {
      margin: '0px 0px 20px 0px',
    },
    '&:hover': {
      backgroundColor: '#ffffff',
      boxShadow: '0px 2px 2px silver',
    },
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  btnWrapper: {
    [theme.breakpoints.down("xs")]: {
      display: 'flex',
      justifyContent: 'space-around',
    },
  },
  addBtnCol: {
    borderRadius: 0,
    boxShadow: '4px 2px 3px silver',
    [theme.breakpoints.down("xs")]: {
      paddingTop: 0,
      borderRadius: '0px 0px 0px 10px',
      boxShadow: '6px 3px 3px silver',      
    }
  },
  deleteBtnCol: {
    borderRadius: '0px 10px 10px 0px',
    boxShadow: '3px 2px 3px silver',
    [theme.breakpoints.down("xs")]: {
      paddingTop: 0,
      borderRadius: '0px 0px 10px 0px',
      boxShadow: '3px 3px 3px silver',      
    }
  },
  actionBtn: {
    fontSize: 13,
    background: 'linear-gradient(to right, #fa8569, #ff4b6e)',
    color: '#ffffffbf',
    textTransform: 'capitalize',
    height: '41px',
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
    '&:hover': {
      color: '#fff',
      background: 'linear-gradient(to right, #ff6641, #ff2a53)',
    },
    '&.Mui-disabled': {
      color: '#ffffffbf',
    }
  },
  spanPadding: {
    maxWidth: 127,
    position: 'absolute',
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      position: 'static',
    },
    '&:hover': {
      '& > .Mui-disabled': {
        color: '#fff',
        background: 'linear-gradient(to right, #ff6641, #ff2a53)',
      }
    }
  },
}));

const ActionBar = ({ recordType, searchValue, totalRecords, searchLimit, someSelected, addRecord, deleteRecord, searchRecord }) => {

  const classes = useStyle();

  let [searchQuery, setSearchQuery] = useState({ value: '' });

  const [error, setError] = useState({});

  useEffect(() => {
    setSearchQuery({ value: searchValue });
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
    <Grid container item md={12} className={classes.actionBar}>
      <Grid item lg={4} md={6} sm={8} xs={12} className={`${classes.background} ${classes.searchBarCol}`}>
        <Tooltip arrow title={`Search ${recordType}`} placement="top">
          <Paper elevation={0} className={classes.searchBar}>
            <InputBase
              className={classes.searchInput}
              placeholder={`Search from ${totalRecords} ${recordType}s...`}
              value={searchQuery.value}
              onChange={({ target }) => handleChange(target)}
              onKeyDown={handleKeyDown}
              inputProps={searchLimit}
              disabled={totalRecords === 0 && searchQuery.length > 0}
            />
            <Search />
          </Paper>
        </Tooltip>
        {
          error.message &&
          <FormHelperText error>{error.message}</FormHelperText>
        }
      </Grid>
      <Grid item lg={2} md={3} sm={2} xs={6} className={`${classes.btnWrapper} ${classes.background} ${classes.addBtnCol}`}>
        <Tooltip arrow title={`Add ${recordType}`} placement="top">
          <Button variant="contained" className={classes.actionBtn} onClick={addRecord}>
            + <Hidden only="sm">Add<Hidden smDown> {recordType}</Hidden></Hidden>
          </Button>
        </Tooltip>
      </Grid>
      <Grid item lg={2} md={3} sm={2} xs={6} className={`${classes.btnWrapper} ${classes.background} ${classes.deleteBtnCol}`}>
        <Tooltip arrow title={!someSelected ? `Select atleast 1 ${recordType} to enable` : `Delete ${recordType}`} placement="top">
          <span className={classes.spanPadding}>
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