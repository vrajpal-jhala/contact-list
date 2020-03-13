import React from 'react';
import clsx from "clsx";
import {
  Grid,
  Checkbox,
  Box,
  Avatar,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import {
  Edit,
} from '@material-ui/icons';

const useStyle = makeStyles(theme => ({
  onHover: {
    '&:hover,&.active': {
      backgroundColor: '#e8ecef'
    }
  },
}));

const ContactListItem = ({ active }) => {
  const classes = useStyle();
  return (
    <Grid container alignItems="center" className={clsx(classes.onHover, active && 'active')}>
      <Grid item md={1}>
        <Checkbox
        />
      </Grid>
      <Grid item md={5}>
        <Box style={{ display: 'flex' }}>
          <Box style={{ padding: '10px 10px 10px 0px' }}>
            <Avatar style={{ height: '50px', width: '50px', backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16) + 'bf' }}>
              AB
                    </Avatar>
          </Box>
          <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ margin: 0 }}>Mike Huston</h3>
            <small>mikehuston@live.com</small>
          </Box>
        </Box>
      </Grid>
      <Grid item md={5}>
        <h4 style={{ margin: 0 }}>Estra Boutique Ltd.</h4>
      </Grid>
      <Grid item md={1}>
        <IconButton size="small" style={{ background: 'linear-gradient(to right, #fa8569, #ff4b6e)', color: '#ffffffbf' }}>
          <Edit />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ContactListItem;