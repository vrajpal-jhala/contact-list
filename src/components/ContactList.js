import React from 'react';
import ContactListHeader from '../components/ContactListHeader';
import ContactListBody from '../components/ContactListBody';
import {
  Grid,
} from '@material-ui/core';

const ContactList = () => {
  return (
    <Grid item md={6}>
      <ContactListHeader />
      <ContactListBody />
    </Grid>
  );
};

export default ContactList;