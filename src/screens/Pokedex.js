import React from "react";
import prepareValidations from './Validations';
import { InMemoryCache, ApolloClient, gql, HttpLink } from 'apollo-boost';
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

const listSchema = {
  col1: { name: 'Name', key: 'name' },
  col2: { name: 'Class', key: 'class' },
};

let formSchema = {
  header: {
    heading: 'name',
    subHeading: 'types',
  },
  fields: [
    {
      label: 'Name',
      name: 'name',
      placeholder: 'Pikachu',
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
      label: 'Class',
      name: 'class',
      placeholder: 'Seed',
      inputProps: {
        maxLength: 20,
      },
      validations: {
        required: true,
        pattern: /[^\s]+/,
        minLength: 4,
        maxLength: 20,
      },
    },
    {
      label: 'Types',
      name: 'types',
      placeholder: 'Water',
      inputProps: {
        maxLength: 30,
      },
      validations: {
        required: true,
        pattern: /[^\s]+/,
        minLength: 4,
        maxLength: 30,
      },
      onEdit: true,
    },
    {
      label: 'Max CP',
      name: 'maxCP',
      placeholder: '12',
      inputProps: {
        maxLength: 4,
      },
      validations: {
        required: true,
        pattern: /[^\s]+/,
      },
    },
    {
      label: 'Max HP',
      name: 'maxHP',
      placeholder: '1234',
      inputProps: {
        maxLength: 4,
      },
      validations: {
        required: true,
        pattern: /[^\s]+/,
      },
    },
    {
      label: 'Evolutions',
      name: 'evolutions',
      placeholder: 'Pichu > Pikachu > Raichu',
      inputProps: {
        maxLength: 40,
      },
      validations: {
        pattern: /[^\s]+/,
        minLength: 4,
        maxLength: 40,
      },
    },
  ],
};

const miniFormSchema = {
  field1: formSchema.fields[0],
  field2: formSchema.fields[1],
};

class Pokedex extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pokedex: [],
      selectedShow: undefined,
      editable: false,
      isAdding: false,
      searchQuery: "",
      totalPages: 0,
      currPage: 0,
    };

    const cache = new InMemoryCache();
    const link = new HttpLink({
      uri: 'https://graphql-pokemon.now.sh/'
    });

    this.client = new ApolloClient({
      link,
      cache,
    });
  }

  listQuery = () => {
    return `
      query allPokemons{
        pokemons(first:151) {
          id
          image
          name
          classification
          types
          maxCP
          maxHP
          evolutions {
            name
          }
        }
      }`;
  }

  searchQuery = (value) => {
    return `
      query searchPokemon{
        pokemon(name: "${value}") {
          id
          image
          name
          classification
          types
          maxCP
          maxHP
          evolutions {
            name
          }
        }
      }`;
  }

  getPage = () => {
    const { pokedex, currPage } = this.state;
    const perPage = 10;
    const start = currPage * perPage;
    const end = start + perPage;

    return pokedex.slice(start, end);
  }

  findTotalPages = (totalRecords) => {
    const perPage = 10;
    return Math.floor(totalRecords / perPage) + (totalRecords % perPage && 1);
  }

  prepareObj = (pokemon) => {
    var {
      id,
      image: avatar,
      name,
      classification,
      types = [],
      maxCP,
      maxHP,
      evolutions,
    } = pokemon;

    types = types.join('/');
    evolutions = evolutions || [];
    evolutions = evolutions.map(({ name }) => name).join(' > ');
    return { id, avatar, name, class: classification, types, maxCP, maxHP, evolutions };
  }

  listAPICall = () => {
    this.client.query({
      query: gql`${this.listQuery()}`,
    }).then(({ data }) => {
      var { pokemons } = data;
      const totalPages = this.findTotalPages(pokemons.length);

      pokemons = pokemons.map((pokemon) =>
        this.prepareObj(pokemon)
      );

      this.setState({
        pokedex: pokemons,
        totalPages,
        currPage: 0,
      });
    }).catch(error =>
      console.error(error)
    );
  }

  searchAPICall = (query) => {
    this.client.query({
      query: gql`${this.searchQuery(query)}`,
    }).then(({ data }) => {
      var { pokemon } = data;
      const pokemons = (pokemon && [this.prepareObj(pokemon)]) || [];
      const totalPages = this.findTotalPages(pokemons.length);

      this.setState({
        pokedex: pokemons,
        totalPages,
        currPage: 0,
      });
    }).catch(error =>
      console.error(error)
    );
  }

  componentDidMount = () => {
    this.listAPICall();
  }

  setPageNo = (event, pageNo) => {
    this.setState({
      currPage: pageNo - 1,
      selectedPokemon: undefined,
    });
  }

  setSelectedPokemon = (id) => {
    const { pokedex, isAdding, selectedPokemon, editable } = this.state;
    const stillAdding = isAdding && selectedPokemon && id === selectedPokemon.id;
    this.setState({
      selectedPokemon: stillAdding
        ? selectedPokemon
        : pokedex.find(pokemon => pokemon.id === id),
      isAdding: stillAdding,
      editable: editable && selectedPokemon && id === selectedPokemon.id
    });
  }

  deselectPokemon = () => {
    this.setState({
      selectedPokemon: undefined,
      editable: false
    });
  }

  setEditable = (id) => {
    const { pokedex, editable } = this.state;
    this.setState({
      editable: !editable,
      selectedPokemon: pokedex.find(pokemon => pokemon.id === id),
      isAdding: false
    });
  }

  updatePokemon = (updatedPokemon) => {
    var { pokedex, selectedPokemon } = this.state;

    var index = pokedex.findIndex(
      pokemon => pokemon.id === selectedPokemon.id
    );
    pokedex[index] = Object.assign({}, pokedex[index], updatedPokemon);
    this.setState({
      pokedex,
      editable: false,
      selectedPokemon: pokedex[index],
    });

    return { status: true, error: {} };
  }

  addPokemon = () => {
    const { pokedex } = this.state;

    this.setState({
      editable: false,
      isAdding: true,
      searchQuery: "",
      selectedPokemon: { id: pokedex[pokedex.length - 1].id + 1 }
    });
  }

  cancelAddPokemon = () => {
    this.setState({
      isAdding: false,
      selectedPokemon: undefined
    });
  }

  savePokemon = (newPokemon) => {
    const { pokedex, selectedPokemon } = this.state;

    pokedex.push({
      ...selectedPokemon,
      ...newPokemon,
    });

    const totalPages = this.findTotalPages(pokedex.length);

    this.setState({
      pokedex: pokedex,
      isAdding: false,
      selectedPokemon: pokedex[pokedex.length - 1],
      searchQuery: "",
      totalPages,
      currPage: totalPages - 1,
    });

    return { status: true, error: {} };
  }

  checkPokemon = (id) => {
    var { pokedex } = this.state;
    const index = pokedex.findIndex(pokemon => pokemon.id === id);
    pokedex[index].checked = !pokedex[index].checked;

    this.setState({
      pokedex
    });
  }

  setChecked = (value) => {
    var { pokedex } = this.state;

    pokedex.forEach(pokemon => pokemon.checked = value);

    this.setState({
      pokedex,
    });
  }

  selectAll = () => {
    this.setChecked(true);
  }

  deselectAll = () => {
    this.setChecked(false);
  }

  deletePokemon = () => {
    var { pokedex, currPage } = this.state;
    pokedex = pokedex.filter(pokemon => !pokemon.checked);

    const totalPages = this.findTotalPages(pokedex.length);

    this.setState({
      pokedex: pokedex,
      editable: false,
      isAdding: false,
      selectedPokemon: undefined,
      searchQuery: "",
      totalPages,
      currPage: currPage >= (totalPages - 1) ? currPage - 1 >= 0 ? currPage - 1 : 0 : currPage,
    });
  }

  searchPokemon = (value) => {
    value === '' ? this.listAPICall() : this.searchAPICall(value);

    this.setState({
      searchQuery: value,
      editable: false,
      isAdding: false,
      selectedPokemon: undefined,
    });
  }

  render = () => {
    const { classes } = this.props;

    const { pokedex, selectedPokemon, editable, isAdding, searchQuery, totalPages, currPage } = this.state;

    const allSelected = pokedex.length && pokedex.every(pokemon => pokemon.checked);;
    const someSelected = pokedex.some(pokemon => pokemon.checked);

    formSchema.fields = prepareValidations(formSchema.fields);

    const pageData = this.getPage();

    return (
      <Grid container className={classes.outerSpacing}>
        <SceneHeader
          icon="icon-pokeball"
          heading="Pokedex"
          subHeading="Welcome to Pokedex page"
        />
        <Grid container item md={12} className={classes.innerSpacing}>
          <ActionBar
            recordType="pokemon"
            searchLimit={{ maxLength: 20 }}
            searchValue={searchQuery}
            someSelected={someSelected}
            addRecord={this.addPokemon}
            deleteRecord={this.deletePokemon}
            searchRecord={this.searchPokemon}
          />
          <RecordList
            totalPages={totalPages}
            currPage={currPage}
            changePage={this.setPageNo}
            records={pageData}
            selectedRecord={selectedPokemon}
            selectRecord={this.setSelectedPokemon}
            editRecord={this.setEditable}
            updateRecord={this.updatePokemon}
            isEditing={editable}
            isAdding={isAdding}
            saveRecord={this.savePokemon}
            checkRecord={this.checkPokemon}
            selectAll={this.selectAll}
            deselectAll={this.deselectAll}
            allSelected={allSelected}
            someSelected={someSelected}
            deselectRecord={this.deselectPokemon}
            cancelAddRecord={this.cancelAddPokemon}
            listSchema={listSchema}
            addRecordFormSchema={miniFormSchema}
            updateRecordFormSchema={formSchema}
          />
          <Hidden mdDown>
            <RecordForm
              record={selectedPokemon}
              editable={editable}
              editRecord={this.setEditable}
              updateRecord={this.updatePokemon}
              goBack={this.deselectPokemon}
              formSchema={formSchema}
            />
          </Hidden>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Pokedex);