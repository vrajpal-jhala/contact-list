import React from 'react';
import SceneHeader from '../components/SceneHeader';
import ActionBar from '../components/ActionBar';
import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';
import {
  Grid,
  withStyles,
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

const data = [
  {
    "name": "Joey Tribbiani",
    "about": "Actor",
    "email": "joeyt@friends.com",
    "phone": "+(069) 123-6547",
    "company": "Actor Acadamy",
    "address": "2738  Liberty Avenue, California"
  },
  {
    "name": "Rachel Green",
    "about": "Fashion Designer",
    "email": "greenrach@friends.com",
    "phone": "718-896-1555",
    "company": "ZARA",
    "address": "377  Abia Martin Drive, Bethpage, New York"
  },
  {
    "name": "Ross Geller",
    "about": "Paleontologist",
    "email": "rossaurus@friends.com",
    "phone": "",
    "company": "Dianosaur Museum",
    "address": "4437  Plainfield Avenue, HOPKINTON, Massachusetts"
  },
  {
    "name": "Phoebe Buffay",
    "about": "Masseuse",
    "email": "phebes@friends.com",
    "phone": "802-232-8909",
    "company": "",
    "address": ""
  },
  {
    "name": "Monica Geller",
    "about": "Chef",
    "email": "mon@friends.com",
    "phone": "",
    "company": "",
    "address": ""
  },
  {
    "name": "Chandler Bing",
    "about": "Copywriter",
    "email": "mrbing@friends.com",
    "phone": "",
    "company": "",
    "address": "4709  Roosevelt Road, Dodge City, Kansas"
  },
  {
    "name": "Gunther",
    "about": "Cafe Owner",
    "email": "gunther@friends.com",
    "phone": "330-443-9039",
    "company": "Central Perk",
    "address": ""
  },
  {
    "name": "Jill Green",
    "about": "Rachel's sister",
    "email": "jgreen@gmail.com",
    "phone": "",
    "company": "",
    "address": "2035  Nixon Avenue, Kingsport, Tennessee"
  },
  {
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
      data: data,
      selectedContact: null,
      editable: false,
    }
  }

  setSelectedContact = (contact) => {
    this.setState({
      selectedContact: contact,
    });
  };

  setEditable = (editable) => {
    this.setState({
      editable: editable,
    });
  };

  updateContact = (updatedContact) => {
    var { data, selectedContact } = this.state;
    data[selectedContact] = Object.assign({}, data[selectedContact], updatedContact);
    this.setState({
      data: data,
      editable: false,
    });
  };

  render = () => {
    const { classes } = this.props;

    const { data, selectedContact, editable } = this.state;

    return (
      <Grid container className={classes.outerSpacing} >
        <SceneHeader />
        <Grid container item md={12} className={classes.innerSpacing}>
          <ActionBar />
          <ContactList
            contacts={data}
            selectedContact={selectedContact}
            selectContact={this.setSelectedContact}
            editContact={this.setEditable}
            isEditing={editable}
          />
          <ContactForm selectedContact={data[selectedContact]} editable={editable} updateContact={this.updateContact} />
        </Grid>
      </Grid >
    );
  };
}

export default withStyles(styles)(Local);