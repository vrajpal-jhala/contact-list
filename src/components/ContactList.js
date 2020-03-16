import React from 'react';
import ContactListHeader from '../components/ContactListHeader';
import ContactListBody from '../components/ContactListBody';
import {
  Grid,
} from '@material-ui/core';

const ContactList = ({ contacts, selectedContact, selectContact, editContact, isEditing }) => {
  return (
    <Grid item lg={6} xs={12}>
      <ContactListHeader />
      <ContactListBody contacts={contacts} selectedContact={selectedContact} selectContact={selectContact} editContact={editContact} isEditing={isEditing} />
    </Grid>
  );
};

export default ContactList;