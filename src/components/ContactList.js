import React from 'react';
import ContactListHeader from '../components/ContactListHeader';
import ContactListBody from '../components/ContactListBody';
import {
  Grid,
  makeStyles,
} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  noContacts: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40vh'
  }
}));

const ContactList = ({ contacts, selectedContact, selectContact, editContact, isEditing, updateContact, saveContact, isAdding, checkContact, someSelected, allSelected, selectAll, deselectAll, deselectContact, cancelAddContact }) => {

  const classes = useStyle();

  return (
    <Grid item lg={6} xs={12}>
      <ContactListHeader
        someSelected={someSelected}
        allSelected={allSelected}
        selectAll={selectAll}
        deselectAll={deselectAll}
      />
      <ContactListBody
        contacts={contacts}
        selectedContact={selectedContact}
        selectContact={selectContact}
        editContact={editContact}
        isEditing={isEditing}
        updateContact={updateContact}
        isAdding={isAdding}
        saveContact={saveContact}
        checkContact={checkContact}
        deselectContact={deselectContact}
        cancelAddContact={cancelAddContact}
      />
      {
        contacts.length === 0 &&
        <h3 className={classes.noContacts}>
          No Contacts
        </h3>
      }
    </Grid>
  );
};

export default ContactList;