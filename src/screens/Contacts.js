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
      inputProps: {
        maxLength: 50,
      },
      validations: {
        required: true,
        pattern: /[^\s]+/,
        minLength: 10,
        maxLength: 50,
      },
      onEdit: true,
    }
  ],
};

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
      totalPages: 0,
      currPage: 0,
      loading: true,
    };
  }

  getPage = () => {
    const { data, currPage } = this.state;
    const perPage = 10;
    const start = currPage * perPage;
    const end = start + perPage;

    return data.slice(start, end);
  }

  findTotalPages = (totalRecords) => {
    const perPage = 10;
    return Math.floor(totalRecords / perPage) + (totalRecords % perPage && 1);
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

  searchAPICall = (value) => {
    setTimeout(() => {
      const filteredData = contacts.filter(contact =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      const totalPages = this.findTotalPages(filteredData.length);

      this.setState({
        data: filteredData,
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

      const totalPages = this.findTotalPages(contacts.length);

      this.setState({
        data: contacts,
        isAdding: false,
        selectedContact: contacts[contacts.length - 1],
        searchQuery: "",
        totalPages,
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
      totalPages,
      currPage: currPage >= (totalPages - 1) ? currPage - 1 >= 0 ? currPage - 1 : 0 : currPage,
    });
  };

  searchContact = (value) => {
    this.searchAPICall(value);

    this.setState({
      loading: true,
      searchQuery: value,
      editable: false,
      isAdding: false,
      selectedContact: undefined,
    });
  };

  render = () => {
    const { classes } = this.props;

    const { data, selectedContact, editable, isAdding, searchQuery, totalPages, currPage, loading } = this.state;

    const allSelected = data.length && data.every(contact => contact.checked);
    const someSelected = data.some(contact => contact.checked);

    formSchema.fields = prepareValidations(formSchema.fields);

    const pageData = this.getPage();

    return (
      <Grid container className={classes.outerSpacing}>
        <SceneHeader
          icon="fas fa-address-book fa-flip-horizontal"
          heading="Contacts"
          subHeading="Welcome to FirstCRM Contact page"
        />
        <Grid container item md={12} className={classes.innerSpacing}>
          <ActionBar
            recordType="contact"
            searchLimit={{ maxLength: 40 }}
            searchValue={searchQuery}
            someSelected={someSelected}
            addRecord={this.addContact}
            deleteRecord={this.deleteContact}
            searchRecord={this.searchContact}
          />
          <RecordList
            loading={loading}
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
