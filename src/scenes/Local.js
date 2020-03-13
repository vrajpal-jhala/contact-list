import React from 'react';
import SceneHeader from '../components/SceneHeader';
import ActionBar from '../components/ActionBar';
import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';
import {
  Grid,
  makeStyles,
} from '@material-ui/core';
import '@fortawesome/fontawesome-free/css/all.min.css';

const useStyle = makeStyles(theme => ({
  outerSpacing: {
    padding: '50px 60px',
    [theme.breakpoints.only("xs")]: {
      padding: '20px',
    },
  },
  innerSpacing: {
    padding: '40px 50px',
    [theme.breakpoints.only("xs")]: {
      padding: '0px',
    },
  },
}));

const Local = () => {
  const classes = useStyle();

  return (
    <Grid container className={classes.outerSpacing}>
      <SceneHeader />
      <Grid container item className={classes.innerSpacing} spacing={3} md={12}>
        <ActionBar />
        <Grid container item md={12} style={{ padding: '40px 14px' }} spacing={3}>
          <ContactList />
          {/* <ContactForm /> */}
        </Grid>
      </Grid >
    </Grid >
  );
};

export default Local;