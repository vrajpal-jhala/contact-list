import React from 'react';
import {
  Hidden,
} from '@material-ui/core';
import ContactListItem from '../components/ContactListItem';
import ContactForm from '../components/ContactForm';

const ContactListBody = ({ contacts, selectedContact, selectContact, editContact, isEditing, updateContact, isAdding, saveContact, checkContact }) => {
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
                editContact={editContact}
                saveContact={saveContact}
                checkContact={checkContact}
              />
              {
                contact.id === selectedContact.id &&
                <Hidden lgUp>
                  <ContactForm selectedContact={contact} editable={isEditing} editContact={editContact} updateContact={updateContact} />
                </Hidden>
              }
            </React.Fragment>
          );
        })
      }

      {
        isAdding &&
        <ContactListItem
          contact={selectedContact}
          key={'newContact'}
          active={true}
          selectContact={() => {}}
          editContact={() => {}}
          isEditing={isEditing}
          saveContact={saveContact}
          isNewContact={isAdding}
        />
      }
    </>
  );
};

export default ContactListBody;