import React from 'react';
import {
  makeStyles,
  Grid,
  Checkbox,
  Hidden,
  Tooltip,
} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  contactListHeader: {
    backgroundColor: '#ddd',
    padding: '5px 10px',
  }
}));

const ContactListHeader = ({ someSelected, allSelected, deselectAll, selectAll, listSchema }) => {

  const classes = useStyle();

  const { col1, col2 } = listSchema;

  return (
    <Grid container className={classes.contactListHeader}>
      <Grid item container xs={12} style={{ alignItems: 'center' }}>
        <Grid item md={1} xs={2} sm={2}>
          <Tooltip arrow title="Select/Deselect All" placement="top">
            <Checkbox
              onClick={() => allSelected || someSelected ? deselectAll() : selectAll()}
              color="primary"
              indeterminate={someSelected && !allSelected}
              checked={allSelected || someSelected}
            />
          </Tooltip>
        </Grid>
        <Grid item md={5} xs={10} sm={9}>{col1.name}</Grid>
        <Hidden smDown>
          <Grid item md={6}>{col2.name}</Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
};

export default ContactListHeader;