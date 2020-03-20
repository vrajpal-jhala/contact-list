import React from 'react';
import SceneHeader from '../components/SceneHeader';
import ActionBar from '../components/ActionBar';
import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';
import {
  Grid,
  withStyles,
  Hidden,
} from '@material-ui/core';
import '@fortawesome/fontawesome-free/css/all.min.css';

const styles = theme => ({
  outerSpacing: {
    padding: '50px 60px',
    [theme.breakpoints.only("sm")]: {
      padding: '30px 40px',
    },
    [theme.breakpoints.only("xs")]: {
      padding: '20px',
    },
  },
  innerSpacing: {
    padding: '0px 40px',
    [theme.breakpoints.down("sm")]: {
      padding: '0px',
    },
  }
});

let contacts = [
  {
    "id": "1",
    "name": "Joey Tribbiani",
    "about": "Actor",
    "email": "joeyt@friends.com",
    "phone": "+(069) 123-6547",
    "company": "Actor Acadamy",
    "address": "2738  Liberty Avenue, California"
  },
  {
    "id": "2",
    "name": "Rachel Green",
    "about": "Fashion Designer",
    "email": "greenrach@friends.com",
    "phone": "718-896-1555",
    "company": "Ralph Lauren",
    "address": "377  Abia Martin Drive, Bethpage, New York"
  },
  {
    "id": "3",
    "name": "Ross Geller",
    "about": "Paleontologist",
    "email": "rossaurus@friends.com",
    "phone": "",
    "company": "Dianosaur Museum",
    "address": "4437  Plainfield Avenue, HOPKINTON, Massachusetts"
  },
  {
    "id": "4",
    "name": "Phoebe Buffay",
    "about": "Masseuse",
    "email": "phebes@friends.com",
    "phone": "802-232-8909",
    "company": "",
    "address": ""
  },
  {
    "id": "5",
    "name": "Monica Geller",
    "about": "Chef",
    "email": "mon@friends.com",
    "phone": "",
    "company": "",
    "address": ""
  },
  {
    "id": "6",
    "name": "Chandler Bing",
    "about": "Copywriter",
    "email": "mrbing@friends.com",
    "phone": "",
    "company": "",
    "address": "4709  Roosevelt Road, Dodge City, Kansas"
  },
  {
    "id": "7",
    "name": "Gunther",
    "about": "Cafe Owner",
    "email": "gunther@friends.com",
    "phone": "330-443-9039",
    "company": "Central Perk",
    "address": ""
  },
  {
    "id": "8",
    "name": "Jill Green",
    "about": "Rachel's sister",
    "email": "jgreen@gmail.com",
    "phone": "",
    "company": "",
    "address": "2035  Nixon Avenue, Kingsport, Tennessee"
  },
  {
    "id": "9",
    "name": "Jack Geller",
    "about": "Ross' father",
    "email": "jackg@gmail.com",
    "phone": "908-617-5594",
    "company": "",
    "address": "3033  Patterson Road, SPANGLE, Washington"
  },
];

class Local extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: contacts,
      selectedContact: {},
      editable: false,
      isAdding: false,
      searchQuery: '',
    }
  }

  setSelectedContact = (id) => {
    const { data, isAdding, selectedContact, editable } = this.state;
    const stillAdding = isAdding && id === selectedContact.id;
    this.setState({
      selectedContact: stillAdding ? selectedContact : data.find(contact => contact.id === id),
      isAdding: stillAdding,
      editable: editable && id === selectedContact.id,
    });
  };

  deselectContact = () => {
    this.setState({
      selectedContact: {},
      editable: false,
    });
  }

  setEditable = (id) => {
    const { data, editable } = this.state;
    this.setState({
      editable: !editable,
      selectedContact: data.find(contact => contact.id === id),
      isAdding: false,
    });
  };

  updateContact = (updatedContact) => {
    var { selectedContact } = this.state;
    var index = contacts.findIndex(contact => contact.id === selectedContact.id);
    contacts[index] = Object.assign({}, contacts[index], updatedContact);
    this.setState({
      data: contacts,
      editable: false,
    });
  };

  addContact = () => {
    this.setState({
      editable: false,
      isAdding: true,
      selectedContact: { "id": contacts[contacts.length - 1].id + 1 },
    });
  }

  cancelAddContact = () => {
    this.setState({
      isAdding: false,
      selectedContact: {},
    });
  }

  saveContact = (newContact) => {
    const { selectedContact } = this.state;
    contacts.push({
      ...selectedContact,
      ...newContact,
    });

    this.setState({
      data: contacts,
      isAdding: false,
      searchQuery: '',
    });
  }

  checkContact = (id) => {
    var { data } = this.state;
    const index = data.findIndex(contact => contact.id === id);
    data[index].checked = !data[index].checked;

    this.setState({
      data: data,
    });
  }

  selectAll = () => {
    var { data } = this.state;

    data.forEach(contact => contact.checked = true);

    this.setState({
      data: data,
    });
  }

  deselectAll = () => {
    var { data } = this.state;

    data.forEach(contact => contact.checked = false);

    this.setState({
      data: data,
    });
  }

  deleteContact = () => {
    contacts = contacts.filter((contact) => !contact.checked);

    this.setState({
      data: contacts,
      searchQuery: '',
      editable: false,
      isAdding: false,
      selectedContact: {},
    });
  }

  searchContact = ({ target }) => {
    var { value } = target;

    const filteredData = contacts.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase()));

    this.setState({
      data: filteredData,
      searchQuery: value,
      editable: false,
      isAdding: false,
      selectedContact: {},
    });
  }

  render = () => {
    const { classes } = this.props;

    let { data, selectedContact, editable, isAdding, searchQuery } = this.state;

    var allSelected = data.length && data.every(contact => contact.checked);
    var someSelected = data.some(contact => contact.checked);

    return (
      <Grid container className={classes.outerSpacing} >
        <SceneHeader />
        <Grid container item md={12} className={classes.innerSpacing}>
          <ActionBar
            addContact={this.addContact}
            deleteContact={this.deleteContact}
            searchQuery={searchQuery}
            searchContact={this.searchContact}
            someSelected={someSelected}
          />
          <ContactList
            contacts={data}
            selectedContact={selectedContact}
            selectContact={this.setSelectedContact}
            editContact={this.setEditable}
            updateContact={this.updateContact}
            isEditing={editable}
            isAdding={isAdding}
            saveContact={this.saveContact}
            checkContact={this.checkContact}
            selectAll={this.selectAll}
            deselectAll={this.deselectAll}
            allSelected={allSelected}
            someSelected={someSelected}
            deselectContact={this.deselectContact}
            cancelAddContact={this.cancelAddContact}
          />
          <Hidden mdDown>
            <ContactForm
              selectedContact={data.find(contact => contact.id === selectedContact.id) || {}}
              editable={editable}
              editContact={this.setEditable}
              updateContact={this.updateContact}
              deselectContact={this.deselectContact}
            />
          </Hidden>
        </Grid>
      </Grid >
    );
  };
}

export default withStyles(styles)(Local);