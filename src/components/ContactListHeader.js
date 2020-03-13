import React from 'react';
import {
  Grid,
  Checkbox,
} from '@material-ui/core';

const ContactListHeader = () => {
  return (
    <Grid container style={{ backgroundColor: '#f1f1f1' }}>
      <Grid item container md={12} style={{ alignItems: 'center' }}>
        <Grid item md={1}>
          <Checkbox
            value="indeterminate"
            indeterminate
          />
        </Grid>
        <Grid item md={5}>Basic Info</Grid>
        <Grid item md={5}>Company</Grid>
        <Grid item md={1}>Edit</Grid>
      </Grid>
    </Grid>
  );
};

export default ContactListHeader;