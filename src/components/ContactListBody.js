import React from 'react';
import ContactListItem from '../components/ContactListItem';

const ContactListBody = () => {
  return (
    <>
      <ContactListItem />
      <ContactListItem />
      <ContactListItem active />
      <ContactListItem />
    </>
  );
};

export default ContactListBody;