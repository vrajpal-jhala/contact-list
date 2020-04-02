import React from "react";
import prepareValidations from './Validations';
import SceneHeader from "../components/SceneHeader";
import ActionBar from "../components/ActionBar";
import RecordList from "../components/RecordList";
import RecordForm from "../components/RecordForm";
import { Grid, withStyles, Hidden } from "@material-ui/core";

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
    phone: "+(069) 1236547",
    company: "Actor Acadamy",
    address: "2738  Liberty Avenue, California"
  },
  {
    id: "2",
    name: "Rachel Green",
    about: "Fashion Designer",
    email: "greenrach@friends.com",
    phone: "+(91) 7188961555",
    company: "Ralph Lauren",
    address: "377  Abia Martin Drive, Bethpage, New York"
  },
  {
    id: "3",
    name: "Ross Geller",
    about: "Paleontologist",
    email: "rossaurus@friends.com",
    phone: "+(12) 4564554988",
    company: "Dianosaur Museum",
    address: "4437  Plainfield Avenue, HOPKINTON, Massachusetts"
  },
  {
    id: "4",
    name: "Phoebe Buffay",
    about: "Masseuse",
    email: "phebes@friends.com",
    phone: "+(6) 8022328909",
    company: "Parlor",
    address: "216, Some Place, Somewhere"
  },
  {
    id: "5",
    name: "Monica Geller",
    about: "Chef",
    email: "mon@friends.com",
    phone: "+(5) 456789",
    company: "Restaurant",
    address: "754, Some Appartment, New York"
  },
  {
    id: "6",
    name: "Chandler Bing",
    about: "Copywriter",
    email: "mrbing@friends.com",
    phone: "+(123) 8098009009",
    company: "Advertising",
    address: "4709  Roosevelt Road, Dodge City, Kansas"
  },
  {
    id: "7",
    name: "Gunther",
    about: "Cafe Owner",
    email: "gunther@friends.com",
    phone: "+(15) 3304439039",
    company: "Central Perk",
    address: "213/B, Gotham City, United States"
  },
  {
    id: "8",
    name: "Jill Green",
    about: "Rachel's sister",
    email: "jgreen@gmail.com",
    phone: "+(45) 79754698",
    company: "Shopping Mall",
    address: "2035  Nixon Avenue, Kingsport, Tennessee"
  },
  {
    id: "9",
    name: "Jack Geller",
    about: "Ross' father",
    email: "jackg@gmail.com",
    phone: "+(51) 9086175594",
    company: "",
    address: "3033  Patterson Road, SPANGLE, Washington"
  },
  {
    id: "10",
    name: "Jennis Hosenstein",
    about: "Chandler's ex",
    email: "jen@gmail.com",
    phone: "+(87) 24264578",
    company: "Some Company",
    address: "35  X Road, Zee, New York"
  },
  {
    id: "11",
    name: "Ben Geller",
    about: "Ross' son",
    email: "ben@yahoo.com",
    phone: "+(56) 654897981",
    company: "School",
    address: "30  Zee, Time Square, New York"
  }
];

const listSchema = {
  col1: { name: 'Name', key: 'name' },
  col2: { name: 'Email', key: 'email' },
};

let formSchema = {
  header: {
    heading: 'name',
    subHeading: 'about',
  },
  fields: [
    {
      label: 'Full Name',
      name: 'name',
      placeholder: 'John Doe',
      inputProps: {
        maxLength: 40,
      },
      validations: {
        required: true,
        pattern: /[^\s]+/,
        minLength: 2,
        maxLength: 40,
      },
    },
    {
      label: 'Email',
      name: 'email',
      placeholder: 'john@gmail.com',
      inputProps: {
        maxLength: 60,
      },
      validations: {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        maxLength: 60,
      },
    },
    {
      label: 'Phone',
      name: 'phone',
      placeholder: '+(99) 1234567890',
      inputProps: {
        maxLength: 19,
      },
      validations: {
        required: true,
        pattern: /[+][(](\d{1,5})[)][\s](\d{6,10})$/,
      },
    },
    {
      label: 'Company',
      name: 'company',
      placeholder: 'The Company',
      inputProps: {
        maxLength: 20,
      },
      validations: {
        required: true,
        pattern: /[^\s]+/,
        minLength: 5,
        maxLength: 20,
      },
    },
    {
      label: 'Address',
      name: 'address',
      placeholder: '13/B, Unknown, Nowhere',
      multiline: true,
      inputProps: {
        maxLength: 100,
      },
      validations: {
        required: true,
        pattern: /[^\s]+/,
        minLength: 10,
        maxLength: 100,
      },
    },
    {
      label: 'About',
      name: 'about',
      placeholder: 'Who is this?',
      multiline: true,
      inputProps: {
        maxLength: 50,
      },
      validations: {
        required: true,
        pattern: /[^\s]+/,
        minLength: 5,
        maxLength: 50,
      },
      onEdit: true,
    }
  ],
};

formSchema.fields = prepareValidations(formSchema.fields);

const miniFormSchema = {
  field1: formSchema.fields[0],
  field2: formSchema.fields[1],
};

delete miniFormSchema.field2.validations.required;

class Local extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      selectedContact: undefined,
      editable: false,
      isAdding: false,
      searchQuery: "",
      currPage: 0,
      pageLength: 10,
      loading: true,
    };
  }

  getPage = (contacts) => {
    const { currPage, pageLength } = this.state;
    const start = currPage * pageLength;
    const end = start + pageLength;

    return contacts.slice(start, end);
  }

  findTotalPages = (totalRecords) => {
    const { pageLength } = this.state;
    return Math.floor(totalRecords / pageLength) + (totalRecords % pageLength && 1);
  }

  listAPICall = () => {
    setTimeout(() => {
      const totalPages = this.findTotalPages(contacts.length);

      this.setState({
        data: contacts,
        totalPages,
        currPage: 0,
        loading: false,
      });
    }, 1000);
  }

  componentDidMount = () => {
    this.listAPICall();
  }

  setPageNo = (event, pageNo) => {
    this.setState({
      currPage: pageNo - 1,
      selectedContact: undefined,
    });
  }

  changePageLength = ({ target }) => {
    const { value } = target;
    this.setState({
      pageLength: value,
    });
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

    var emailExist = contacts.some(contact => contact.email !== '' && contact.email === email);

    if (emailExist) {
      return { status: false, error: { field: 'email', message: 'Email already exists' } };
    } else {
      contacts.push({
        ...selectedContact,
        name,
        email
      });

      const totalPages = this.findTotalPages(contacts.length);

      this.setState({
        data: contacts,
        isAdding: false,
        selectedContact: contacts[contacts.length - 1],
        searchQuery: "",
        currPage: totalPages - 1,
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
    var { data } = this.state;

    data.forEach(contact => (contact.checked = value));

    this.setState({
      data,
    });
  }

  selectAll = () => {
    this.setChecked(true);
  };

  deselectAll = () => {
    this.setChecked(false);
  };

  deleteContact = () => {
    const { currPage } = this.state;
    contacts = contacts.filter(contact => !contact.checked);

    const totalPages = this.findTotalPages(contacts.length);

    this.setState({
      data: contacts,
      searchQuery: "",
      editable: false,
      isAdding: false,
      selectedContact: undefined,
      currPage: currPage >= (totalPages - 1) ? currPage - 1 >= 0 ? currPage - 1 : 0 : currPage,
    });
  };

  searchContact = (value) => {
    this.setState({
      currPage: 0,
      searchQuery: value,
      editable: false,
      isAdding: false,
      selectedPokemon: undefined,
    });
  };

  render = () => {
    const { classes, handleFullDrawerToggle } = this.props;

    const { data, selectedContact, editable, isAdding, searchQuery, currPage, pageLength, loading } = this.state;

    const allSelected = data.length && data.every(contact => contact.checked);
    const someSelected = data.some(contact => contact.checked);

    const filteredData = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalRecords = filteredData.length;
    const totalPages = this.findTotalPages(totalRecords);
    const pageData = this.getPage(filteredData);

    return (
      <>
        <SceneHeader
          handleFullDrawerToggle={handleFullDrawerToggle}
          icon="fas fa-address-book fa-flip-horizontal"
          heading="Contacts"
          subHeading="Welcome to FirstCRM Contact page"
        />
        <Grid container className={classes.outerSpacing}>
          <Grid container item md={12} className={classes.innerSpacing}>
            <ActionBar
              recordType="contact"
              searchLimit={{ maxLength: 40 }}
              searchValue={searchQuery}
              totalRecords={totalRecords}
              someSelected={someSelected}
              addRecord={this.addContact}
              deleteRecord={this.deleteContact}
              searchRecord={this.searchContact}
            />
            <RecordList
              loading={loading}
              pageLength={pageLength}
              changePageLength={this.changePageLength}
              totalRecords={totalRecords}
              totalPages={totalPages}
              currPage={currPage}
              changePage={this.setPageNo}
              records={pageData}
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
            {
              selectedContact &&
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
            }
          </Grid>
        </Grid>
      </>
    );
  };
}

export default withStyles(styles)(Local);
