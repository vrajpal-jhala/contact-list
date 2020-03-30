import React from "react";
import prepareValidations from './Validations';
import axios from 'axios';
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

let tempShows = [];

const listSchema = {
  col1: { name: 'Name', key: 'name' },
  col2: { name: 'Network', key: 'network' },
};

let formSchema = {
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
      validations: {
        required: true,
        pattern: /[^\s]+/,
        minLength: 2,
        maxLength: 40,
      },
    },
    {
      label: 'Language',
      name: 'language',
      placeholder: 'English',
      inputProps: {
        maxLength: 10,
      },
      validations: {
        required: true,
        pattern: /[^\s]+/,
        minLength: 3,
        maxLength: 10,
      },
    },
    {
      label: 'Genre',
      name: 'genre',
      placeholder: 'Comedy',
      inputProps: {
        maxLength: 15,
      },
      validations: {
        required: true,
        pattern: /[^\s]+/,
        minLength: 4,
        maxLength: 15,
      },
      onEdit: true,
    },
    {
      label: 'Network',
      name: 'network',
      placeholder: 'Disney',
      inputProps: {
        maxLength: 15,
      },
      validations: {
        required: true,
        pattern: /[^\s]+/,
        minLength: 3,
        maxLength: 15,
      },
    },
    {
      label: 'Summary',
      name: 'summary',
      placeholder: 'What it\'s all about',
      inputProps: {
        maxLength: 500,
      },
      validations: {
        required: true,
        pattern: /[^\s]+/,
        minLength: 1,
        maxLength: 500,
      },
    },
  ],
};

const miniFormSchema = {
  field1: formSchema.fields[0],
  field2: formSchema.fields[3],
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

  getPage = () => {
    const { shows, currPage } = this.state;
    const perPage = 10;
    const start = currPage * perPage;
    const end = start + perPage;

    return shows.slice(start, end);
  }

  findTotalPages = (totalRecords) => {
    const perPage = 10;
    return Math.floor(totalRecords / perPage) + (totalRecords % perPage && 1);
  }

  apiCall = (url, search) => {
    axios({
      method: 'GET',
      url,
      responseType: 'JSON'
    }).then(({ data }) => {
      const totalPages = this.findTotalPages(data.length);
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
      });

      this.setState({
        shows: modifiedData,
        totalPages,
        currPage: 0,
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  componentDidMount = () => {
    this.apiCall('https://api.tvmaze.com/shows?page=0');
  }

  setPageNo = (event, pageNo) => {
    this.setState({
      currPage: pageNo - 1,
      selectedShow: undefined,
    })
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

    const totalPages = this.findTotalPages(shows.length);

    this.setState({
      shows: shows,
      isAdding: false,
      selectedShow: shows[shows.length - 1],
      searchQuery: "",
      totalPages,
      currPage: totalPages - 1,
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
    var { shows, currPage } = this.state;
    shows = shows.filter(show => !show.checked);

    const totalPages = this.findTotalPages(shows.length);

    this.setState({
      shows: shows,
      editable: false,
      isAdding: false,
      selectedShow: undefined,
      searchQuery: "",
      totalPages,
      currPage: currPage >= (totalPages - 1) ? currPage - 1 >= 0 ? currPage - 1 : 0 : currPage,
    });
  }

  searchShow = (value) => {
    const { shows } = this.state;

    if (value !== '') {
      if (tempShows.length === 0) {
        tempShows = shows;
      }

      this.apiCall(`https://api.tvmaze.com/search/shows?q=${value}`, true);
    } else {
      const totalPages = this.findTotalPages(tempShows.length);
      this.setState({
        shows: tempShows,
        totalPages,
        currPage: 0,
      });
    }

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

    formSchema.fields = prepareValidations(formSchema.fields);

    const pageData = this.getPage();

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
            searchLimit={{ maxLength: 20 }}
            searchValue={searchQuery}
            someSelected={someSelected}
            addRecord={this.addShow}
            deleteRecord={this.deleteShow}
            searchRecord={this.searchShow}
          />
          <RecordList
            totalPages={totalPages}
            currPage={currPage}
            changePage={this.setPageNo}
            records={pageData}
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