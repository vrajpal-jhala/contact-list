import React from 'react';
import {
  Hidden,
} from '@material-ui/core';
import ContactListItem from '../components/ContactListItem';
import NewContactListItem from '../components/NewContactListItem';
import ContactForm from '../components/ContactForm';

const ContactListBody = ({ contacts, selectedContact, selectContact, editContact, isEditing, updateContact, isAdding, saveContact, checkContact, deselectContact, cancelAddContact }) => {

  return (
    <>
      {
        contacts.map((contact) => {
          return (
            <React.Fragment key={contact.id}>
              <ContactListItem
                contact={contact}
                active={contact.id === selectedContact.id}
                selectContact={selectContact}
                saveContact={saveContact}
                checkContact={checkContact}
              />
              {
                contact.id === selectedContact.id &&
                <Hidden lgUp>
                  <ContactForm
                    selectedContact={contact}
                    editable={isEditing}
                    editContact={editContact}
                    updateContact={updateContact}
                    deselectContact={deselectContact}
                  />
                </Hidden>
              }
            </React.Fragment>
          );
        })
      }

      {
        isAdding &&
        <NewContactListItem
          saveContact={saveContact}
          cancelAddContact={cancelAddContact}
        />
      }
    </>
  );
};

export default ContactListBody;