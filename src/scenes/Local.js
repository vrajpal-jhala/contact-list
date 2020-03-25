import React from "react";
import SceneHeader from "../components/SceneHeader";
import ActionBar from "../components/ActionBar";
import RecordList from "../components/RecordList";
import RecordForm from "../components/RecordForm";
import { Grid, Box, withStyles, Hidden } from "@material-ui/core";

const styles = theme => ({
  outerSpacing: {
    padding: "50px 60px",
    [theme.breakpoints.only("sm")]: {
      padding: "30px 40px"
    },
    [theme.breakpoints.only("xs")]: {
      padding: "20px"
    }
  },
  innerSpacing: {
    padding: "0px 40px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px"
    }
  }
});

let contacts = [
  {
    id: "1",
    name: "Joey Tribbiani",
    about: "Actor",
    email: "joeyt@friends.com",
    phone: "+(069) 123-6547",
    company: "Actor Acadamy",
    address: "2738  Liberty Avenue, California"
  },
  {
    id: "2",
    name: "Rachel Green",
    about: "Fashion Designer",
    email: "greenrach@friends.com",
    phone: "718-896-1555",
    company: "Ralph Lauren",
    address: "377  Abia Martin Drive, Bethpage, New York"
  },
  {
    id: "3",
    name: "Ross Geller",
    about: "Paleontologist",
    email: "rossaurus@friends.com",
    phone: "",
    company: "Dianosaur Museum",
    address: "4437  Plainfield Avenue, HOPKINTON, Massachusetts"
  },
  {
    id: "4",
    name: "Phoebe Buffay",
    about: "Masseuse",
    email: "phebes@friends.com",
    phone: "802-232-8909",
    company: "",
    address: ""
  },
  {
    id: "5",
    name: "Monica Geller",
    about: "Chef",
    email: "mon@friends.com",
    phone: "",
    company: "",
    address: ""
  },
  {
    id: "6",
    name: "Chandler Bing",
    about: "Copywriter",
    email: "mrbing@friends.com",
    phone: "",
    company: "",
    address: "4709  Roosevelt Road, Dodge City, Kansas"
  },
  {
    id: "7",
    name: "Gunther",
    about: "Cafe Owner",
    email: "gunther@friends.com",
    phone: "330-443-9039",
    company: "Central Perk",
    address: ""
  },
  {
    id: "8",
    name: "Jill Green",
    about: "Rachel's sister",
    email: "jgreen@gmail.com",
    phone: "",
    company: "",
    address: "2035  Nixon Avenue, Kingsport, Tennessee"
  },
  {
    id: "9",
    name: "Jack Geller",
    about: "Ross' father",
    email: "jackg@gmail.com",
    phone: "908-617-5594",
    company: "",
    address: "3033  Patterson Road, SPANGLE, Washington"
  }
];

const validationObj = (value, message) => {
  return { value, message };
}

const requiredValidation = () => {
  return validationObj(true, "This field is required");
}

const patternValidation = (fieldName, pattern) => {
  return validationObj(pattern, `Enter valid ${fieldName}`);
}

const minLengthValidation = (limit) => {
  return validationObj(limit, `Enter at least ${limit} characters`);
}

const maxLengthValidation = (limit) => {
  return validationObj(limit, `Enter no more than ${limit} characters`);
}

const validations = {
  name: {
    required: requiredValidation(),
    pattern: patternValidation("name", /[^\s]+/),
    minLength: minLengthValidation(2),
    maxLength: maxLengthValidation(40),
  },
  about: {
    required: requiredValidation(),
    pattern: patternValidation("about", /[^\s]+/),
    minLength: minLengthValidation(10),
    maxLength: maxLengthValidation(50),
  },
  email: {
    required: requiredValidation(),
    pattern: patternValidation("email", /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i),
    maxLength: maxLengthValidation(60),
  },
  phone: {
    required: requiredValidation(),
    pattern: patternValidation("phone", /[+][(](\d{1,5})[)][\s](\d{6,10})$/),
  },
  company: {
    required: requiredValidation(),
    pattern: patternValidation("name", /[^\s]+/),
    minLength: minLengthValidation(5),
    maxLength: maxLengthValidation(20)
  },
  address: {
    required: requiredValidation(),
    pattern: patternValidation("address", /[^\s]+/),
    minLength: minLengthValidation(10),
    maxLength: maxLengthValidation(100),
  },
};

class Local extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: contacts,
      selectedContact: undefined,
      editable: false,
      isAdding: false,
      searchQuery: ""
    };
  }

  setSelectedContact = id => {
    const { data, isAdding, selectedContact, editable } = this.state;
    const stillAdding = isAdding && selectedContact && id === selectedContact.id;
    this.setState({
      selectedContact: stillAdding
        ? selectedContact
        : data.find(contact => contact.id === id),
      isAdding: stillAdding,
      editable: editable && selectedContact && id === selectedContact.id
    });
  };

  deselectContact = () => {
    this.setState({
      selectedContact: undefined,
      editable: false
    });
  };

  setEditable = id => {
    const { data, editable } = this.state;
    this.setState({
      editable: !editable,
      selectedContact: data.find(contact => contact.id === id),
      isAdding: false
    });
  };

  updateContact = updatedContact => {
    var { selectedContact } = this.state;

    var emailExist = contacts.some(
      contact => contact.id !== updatedContact.id && contact.email === updatedContact.email
    );

    if (emailExist) {
      return { status: false, error: { field: 'email', message: 'Email already exists' } };
    } else {
      var index = contacts.findIndex(
        contact => contact.id === selectedContact.id
      );
      contacts[index] = Object.assign({}, contacts[index], updatedContact);
      this.setState({
        data: contacts,
        editable: false,
        selectedContact: contacts[index],
      });

      return { status: true, error: {} };
    }
  };

  addContact = () => {
    this.setState({
      editable: false,
      isAdding: true,
      searchQuery: "",
      selectedContact: { id: contacts[contacts.length - 1].id + 1 }
    });
  };

  cancelAddContact = () => {
    this.setState({
      isAdding: false,
      selectedContact: undefined
    });
  };

  saveContact = ({ name, email }) => {
    const { selectedContact } = this.state;

    var emailExist = contacts.some(contact => contact.email === email);

    if (emailExist) {
      return { status: false, error: { field: 'email', message: 'Email already exists' } };
    } else {
      contacts.push({
        ...selectedContact,
        name,
        email
      });

      this.setState({
        data: contacts,
        isAdding: false,
        selectedContact: contacts[contacts.length - 1],
        searchQuery: ""
      });

      return { status: true, error: {} };
    }
  };

  checkContact = id => {
    var { data } = this.state;
    const index = data.findIndex(contact => contact.id === id);
    data[index].checked = !data[index].checked;

    this.setState({
      data: data
    });
  };

  setChecked = (value) => {
    var { shows } = this.state;

    shows.forEach(show => (show.checked = value));

    this.setState({
      shows,
    });
  }

  selectAll = () => {
    this.setChecked(true);
  };

  deselectAll = () => {
    this.setChecked(false);
  };

  deleteContact = () => {
    contacts = contacts.filter(contact => !contact.checked);

    this.setState({
      data: contacts,
      searchQuery: "",
      editable: false,
      isAdding: false,
      selectedContact: undefined,
    });
  };

  searchContact = ({ target }) => {
    var { value } = target;

    const filteredData = contacts.filter(contact =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );

    this.setState({
      data: filteredData,
      searchQuery: value,
      editable: false,
      isAdding: false,
      selectedContact: undefined,
    });
  };

  render = () => {
    const { classes } = this.props;

    const { data, selectedContact, editable, isAdding, searchQuery } = this.state;

    const allSelected = data.length && data.every(contact => contact.checked);
    const someSelected = data.some(contact => contact.checked);

    const listSchema = {
      col1: { name: 'Name', key: 'name' },
      col2: { name: 'Email', key: 'email' },
    };

    const formSchema = {
      header: {
        heading: 'name',
        subHeading: 'about',
      },
      fields: [
        {
          label: 'Full Name',
          name: 'name',
          placeholder: 'John Doe',
          validations: validations.name,
        },
        {
          label: 'Email',
          name: 'email',
          placeholder: 'john@gmail.com',
          validations: validations.email,
        },
        {
          label: 'Phone',
          name: 'phone',
          placeholder: '+(99) 1234567890',
          validations: validations.phone,
        },
        {
          label: 'Company',
          name: 'company',
          placeholder: 'The Company',
          validations: validations.company,
        },
        {
          label: 'Address',
          name: 'address',
          placeholder: '13/B, Unknown, Nowhere',
          validations: validations.address,
        },
        {
          label: 'About',
          name: 'about',
          placeholder: 'Who is this?',
          validations: validations.about,
          onEdit: true,
        }
      ],
    };

    const miniFormSchema = {
      field1: formSchema.fields[0],
      field2: formSchema.fields[1],
    };

    delete miniFormSchema.field2.validations.required;

    return (
      <Grid container className={classes.outerSpacing}>
        <SceneHeader
          icon={
            <Box className={`fas fa-address-book fa-flip-horizontal headerIcon`} />
          }
          heading="Contacts"
          subHeading="Welcome to FirstCRM Contact page"
        />
        <Grid container item md={12} className={classes.innerSpacing}>
          <ActionBar
            recordType="contact"
            searchQuery={searchQuery}
            someSelected={someSelected}
            addRecord={this.addContact}
            deleteRecord={this.deleteContact}
            searchRecord={this.searchContact}
          />
          <RecordList
            records={data}
            selectedRecord={selectedContact}
            selectRecord={this.setSelectedContact}
            editRecord={this.setEditable}
            updateRecord={this.updateContact}
            isEditing={editable}
            isAdding={isAdding}
            saveRecord={this.saveContact}
            checkRecord={this.checkContact}
            selectAll={this.selectAll}
            deselectAll={this.deselectAll}
            allSelected={allSelected}
            someSelected={someSelected}
            deselectRecord={this.deselectContact}
            cancelAddRecord={this.cancelAddContact}
            listSchema={listSchema}
            addRecordFormSchema={miniFormSchema}
            updateRecordFormSchema={formSchema}
          />
          <Hidden mdDown>
            <RecordForm
              record={selectedContact}
              editable={editable}
              editRecord={this.setEditable}
              updateRecord={this.updateContact}
              goBack={this.deselectContact}
              formSchema={formSchema}
            />
          </Hidden>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(styles)(Local);
