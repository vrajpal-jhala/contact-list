import React from 'react';
import {
  makeStyles,
  Grid,
  Checkbox,
  Hidden,
} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  contactListHeader: {
    backgroundColor: '#f1f1f1',
    padding: '5px 10px',
  }
}));

const ContactListHeader = () => {
  const classes = useStyle();

  return (
    <Grid container className={classes.contactListHeader}>
      <Grid item container xs={12} style={{ alignItems: 'center' }}>
        <Grid item md={1} xs={2} sm={2}>
          <Checkbox
            color="primary"
            value="indeterminate"
            indeterminate
          />
        </Grid>
        <Grid item md={5} xs={10} sm={9}>Basic Info</Grid>
        <Hidden smDown>
          <Grid item md={5}>Company</Grid>
        </Hidden>
        <Hidden xsDown>
          <Grid item md={1} sm={1}>Edit</Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
};

export default ContactListHeader;