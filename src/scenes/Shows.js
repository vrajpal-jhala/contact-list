import React from "react";
import axios from 'axios';
import SceneHeader from "../components/SceneHeader";
import ActionBar from "../components/ActionBar";
import RecordList from "../components/RecordList";
import RecordForm from "../components/RecordForm";
import { Grid, withStyles, Hidden } from "@material-ui/core";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
  language: {
    required: requiredValidation(),
    pattern: patternValidation("language", /[^\s]+/),
    minLength: minLengthValidation(3),
    maxLength: maxLengthValidation(10),
  },
  genre: {
    required: requiredValidation(),
    pattern: patternValidation("genre", /[^\s]+/),
    minLength: minLengthValidation(4),
    maxLength: maxLengthValidation(15),
  },
  nework: {
    required: requiredValidation(),
    pattern: patternValidation("network", /[^\s]+/),
    minLength: minLengthValidation(3),
    maxLength: maxLengthValidation(15),
  },
  summary: {
    required: requiredValidation(),
    pattern: patternValidation("summary", /[^\s]+/),
    minLength: minLengthValidation(10),
    maxLength: maxLengthValidation(500),
  },
};

class Shows extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      shows: [],
      selectedShow: undefined,
      editable: false,
      isAdding: false,
      searchQuery: "",
      totalPages: 0,
      currPage: 0,
    };
  }

  apiCall = (url, currPage, search) => {
    const perPage = 10;
    const start = currPage * perPage;
    const end = start + perPage;
    axios({
      method: 'GET',
      url,
      responseType: 'JSON'
    }).then(({ data }) => {
      const totalRecords = data.length;
      const totalPages = Math.floor(totalRecords / perPage) + (totalRecords % perPage && 1);
      var modifiedData = data.map((show) => {
        show = search ? show.show : show;
        const {
          id,
          name,
          language,
          genres = [''],
          summary
        } = show;

        const image = show.image || {};
        const { medium: avatar = '' } = image;
        const net = show.network || {};
        const { name: network = '' } = net;
        return { id, avatar, name, language, network, genre: genres.join('/'), summary };
      }).slice(start, end);

      this.setState({
        shows: modifiedData,
        totalPages,
        currPage
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  componentDidMount = () => {
    this.apiCall('http://api.tvmaze.com/shows?page=0', 0);
  }

  setPageNo = (event, pageNo) => {
    this.apiCall('http://api.tvmaze.com/shows?page=0', pageNo - 1);
  }

  setSelectedShow = (id) => {
    const { shows, isAdding, selectedShow, editable } = this.state;
    const stillAdding = isAdding && selectedShow && id === selectedShow.id;
    this.setState({
      selectedShow: stillAdding
        ? selectedShow
        : shows.find(show => show.id === id),
      isAdding: stillAdding,
      editable: editable && selectedShow && id === selectedShow.id
    });
  }

  deselectShow = () => {
    this.setState({
      selectedShow: undefined,
      editable: false
    });
  }

  setEditable = (id) => {
    const { shows, editable } = this.state;
    this.setState({
      editable: !editable,
      selectedShow: shows.find(show => show.id === id),
      isAdding: false
    });
  }

  updateShow = (updatedShow) => {
    var { shows, selectedShow } = this.state;

    var index = shows.findIndex(
      show => show.id === selectedShow.id
    );
    shows[index] = Object.assign({}, shows[index], updatedShow);
    this.setState({
      shows,
      editable: false,
      selectedShow: shows[index],
    });

    return { status: true, error: {} };
  }

  addShow = () => {
    const { shows } = this.state;

    this.setState({
      editable: false,
      isAdding: true,
      searchQuery: "",
      selectedShow: { id: shows[shows.length - 1].id + 1 }
    });
  }

  cancelAddShow = () => {
    this.setState({
      isAdding: false,
      selectedShow: undefined
    });
  }

  saveShow = (newShow) => {
    const { shows, selectedShow } = this.state;

    shows.push({
      ...selectedShow,
      ...newShow,
    });

    this.setState({
      shows: shows,
      isAdding: false,
      selectedShow: shows[shows.length - 1],
      searchQuery: "",
    });

    return { status: true, error: {} };
  }

  checkShow = (id) => {
    var { shows } = this.state;
    const index = shows.findIndex(show => show.id === id);
    shows[index].checked = !shows[index].checked;

    this.setState({
      shows
    });
  }

  setChecked = (value) => {
    var { shows } = this.state;

    shows.forEach(show => show.checked = value);

    this.setState({
      shows,
    });
  }

  selectAll = () => {
    this.setChecked(true);
  }

  deselectAll = () => {
    this.setChecked(false);
  }

  deleteShow = () => {
    var { shows } = this.state;
    shows = shows.filter(show => !show.checked);

    this.setState({
      shows: shows,
      editable: false,
      isAdding: false,
      selectedShow: undefined,
      searchQuery: "",
    });
  }

  searchShow = ({ target }) => {
    var { value } = target;

    if (value !== '')
      this.apiCall(`http://api.tvmaze.com/search/shows?q=${value}`, 0, true);
    else
      this.apiCall('http://api.tvmaze.com/shows/page?0', 0);

    this.setState({
      searchQuery: value,
      editable: false,
      isAdding: false,
      selectedShow: undefined,
    });
  }


  render = () => {
    const { classes } = this.props;

    const { shows, selectedShow, editable, isAdding, searchQuery, totalPages, currPage } = this.state;

    const allSelected = shows.length && shows.every(show => show.checked);;
    const someSelected = shows.some(show => show.checked);

    const listSchema = {
      col1: { name: 'Name', key: 'name' },
      col2: { name: 'Network', key: 'network' },
    };

    const formSchema = {
      header: {
        heading: 'name',
        subHeading: 'genre',
      },
      fields: [
        {
          label: 'Name',
          name: 'name',
          placeholder: 'Game of Thrones',
          inputProps: {
            maxLength: 40,
          },
          validations: validations.name,
        },
        {
          label: 'Language',
          name: 'language',
          placeholder: 'English',
          inputProps: {
            maxLength: 10,
          },
          validations: validations.language,
        },
        {
          label: 'Genre',
          name: 'genre',
          placeholder: 'Comedy',
          inputProps: {
            maxLength: 15,
          },
          validations: validations.genre,
          onEdit: true,
        },
        {
          label: 'Network',
          name: 'network',
          placeholder: 'Disney',
          inputProps: {
            maxLength: 15,
          },
          validations: validations.nework,
        },
        {
          label: 'Summary',
          name: 'summary',
          placeholder: 'What it\'s all about',
          inputProps: {
            maxLength: 500,
          },
          validations: validations.summary,
        },
      ],
    };

    const miniFormSchema = {
      field1: formSchema.fields[0],
      field2: formSchema.fields[3],
    };

    return (
      <Grid container className={classes.outerSpacing}>
        <SceneHeader
          icon="fas fa-tv"
          heading="TV Shows"
          subHeading="Welcome to TVMaze page"
        />
        <Grid container item md={12} className={classes.innerSpacing}>
          <ActionBar
            recordType="show"
            searchQuery={searchQuery}
            someSelected={someSelected}
            addRecord={this.addShow}
            deleteRecord={this.deleteShow}
            searchRecord={this.searchShow}
          />
          <RecordList
            totalPages={totalPages}
            currPage={currPage}
            changePage={this.setPageNo}
            records={shows}
            selectedRecord={selectedShow}
            selectRecord={this.setSelectedShow}
            editRecord={this.setEditable}
            updateRecord={this.updateShow}
            isEditing={editable}
            isAdding={isAdding}
            saveRecord={this.saveShow}
            checkRecord={this.checkShow}
            selectAll={this.selectAll}
            deselectAll={this.deselectAll}
            allSelected={allSelected}
            someSelected={someSelected}
            deselectRecord={this.deselectShow}
            cancelAddRecord={this.cancelAddShow}
            listSchema={listSchema}
            addRecordFormSchema={miniFormSchema}
            updateRecordFormSchema={formSchema}
          />
          <Hidden mdDown>
            <RecordForm
              record={selectedShow}
              editable={editable}
              editRecord={this.setEditable}
              updateRecord={this.updateShow}
              goBack={this.deselectShow}
              formSchema={formSchema}
            />
          </Hidden>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Shows);