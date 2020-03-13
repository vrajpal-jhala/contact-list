import React from 'react';
import {
  makeStyles,
  Grid,
  Box,
  Avatar,
  Input,
  Fab,
} from '@material-ui/core';
import {
  Check
} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ContactForm = () => {

  const classes = useStyles();

  return (
    <Grid item container md={6}>
      <Grid item md={12} style={{ paddingLeft: '40px' }}>
        <Box style={{ backgroundColor: '#f1f1f1', padding: '30px 40px' }}>
          <Box style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Avatar style={{ height: '80px', width: '80px' }}>
              <span style={{ fontSize: 28 }}>MH</span>
            </Avatar>
            <h2 style={{ marginBottom: 0 }}>Mike Huston</h2>
            <small>Product Manager @FirstCRM management</small>
          </Box>
          <Grid container style={{ paddingTop: '40px' }}>
            <Grid item container alignItems="center" style={{ paddingTop: '40px' }}>
              <Grid item md={3}>
                Full Name:
              </Grid>
              <Grid item md={9}>
                <Input defaultValue="Mike Huston" inputProps={{ 'aria-label': 'description' }} />
              </Grid>
            </Grid>
            <Grid item container alignItems="center" style={{ paddingTop: '40px' }}>
              <Grid item md={3}>
                Email:
              </Grid>
              <Grid item md={9}>
                mikehuston@live.com
              </Grid>
            </Grid>
            <Grid item container alignItems="center" style={{ paddingTop: '40px' }}>
              <Grid item md={3}>
                Phone:
              </Grid>
              <Grid item md={9}>
                +(069) 238-4587
              </Grid>
            </Grid>
            <Grid item container alignItems="center" style={{ paddingTop: '40px' }}>
              <Grid item md={3}>
                Company:
              </Grid>
              <Grid item md={9}>
                No information provided
              </Grid>
            </Grid>
            <Grid item container alignItems="center" style={{ paddingTop: '40px' }}>
              <Grid item md={3}>
                Address:
              </Grid>
              <Grid item md={9}>
                47, west shrerapara pirerbag road, mirpur, dhaka
              </Grid>
            </Grid>
            <Grid item container justify="center" style={{ paddingTop: '30px' }}>
              <Fab variant="extended" style={{ background: 'linear-gradient(to right, #fa8569, #ff4b6e)', color: '#ffffffbf' }} aria-label="edit">
                <Check className={classes.extendedIcon} />
                Save
              </Fab>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ContactForm;