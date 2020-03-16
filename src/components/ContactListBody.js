import React from 'react';
import ContactListItem from '../components/ContactListItem';

const ContactListBody = ({ contacts, selectedContact, selectContact, editContact, isEditing }) => {
  return (
    <>
      {
        contacts.map((contact, index) =>
          <ContactListItem
            index={index}
            contact={contact}
            key={contact.name}
            active={index === selectedContact}
            selectContact={selectContact}
            editContact={editContact}
            isEditing={isEditing}
          />
        )
      }

      <ContactListItem
        contact={contacts[0]}
        isNewContact
        active={true}
      />
    </>
  );
};

export default ContactListBody;