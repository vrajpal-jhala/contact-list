import React from "react";
import { InMemoryCache, ApolloClient, gql, HttpLink } from 'apollo-boost';
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
  class: {
    required: requiredValidation(),
    pattern: patternValidation("class", /[^\s]+/),
    minLength: minLengthValidation(4),
    maxLength: maxLengthValidation(20),
  },
  types: {
    required: requiredValidation(),
    pattern: patternValidation("types", /[^\s]+/),
    minLength: minLengthValidation(4),
    maxLength: maxLengthValidation(30),
  },
  maxCP: {
    required: requiredValidation(),
    pattern: patternValidation("max CP", /[^\s]+/),
  },
  maxHP: {
    required: requiredValidation(),
    pattern: patternValidation("max HP", /[^\s]+/),
  },
  evolutions: {
    pattern: patternValidation("evolutions", /[^\s]+/),
    minLength: minLengthValidation(4),
    maxLength: maxLengthValidation(40),
  },
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

  listAPICall = (currPage) => {
    const perPage = 10;
    const start = currPage * perPage;
    const end = start + perPage;
    this.client.query({
      query: gql`${this.listQuery()}`,
    }).then(({ data }) => {
      var { pokemons } = data;
      const totalRecords = pokemons.length;
      const totalPages = Math.floor(totalRecords / perPage) + (totalRecords % perPage && 1);
      pokemons = pokemons.map((pokemon) =>
        this.prepareObj(pokemon)
      ).slice(start, end);

      this.setState({
        pokedex: pokemons,
        totalPages,
        currPage,
      });
    }).catch(error =>
      console.error(error)
    );
  }

  searchAPICall = (query, currPage) => {
    this.client.query({
      query: gql`${this.searchQuery(query)}`,
    }).then(({ data }) => {
      var { pokemon } = data;
      const totalPages = 1;
      const pokemons = (pokemon && [this.prepareObj(pokemon)]) || [];

      this.setState({
        pokedex: pokemons,
        totalPages,
        currPage,
      });
    }).catch(error =>
      console.error(error)
    );
  }

  componentDidMount = () => {
    this.listAPICall(0);
  }

  setPageNo = (event, pageNo) => {
    this.listAPICall(pageNo - 1);
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

    this.setState({
      pokedex: pokedex,
      isAdding: false,
      selectedPokemon: pokedex[pokedex.length - 1],
      searchQuery: "",
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
    var { pokedex } = this.state;
    pokedex = pokedex.filter(pokemon => !pokemon.checked);

    this.setState({
      pokedex: pokedex,
      editable: false,
      isAdding: false,
      selectedPokemon: undefined,
      searchQuery: "",
    });
  }

  searchPokemon = ({ target }) => {
    var { value } = target;

    value === '' ? this.listAPICall(0) : this.searchAPICall(value, 0);

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

    const listSchema = {
      col1: { name: 'Name', key: 'name' },
      col2: { name: 'Class', key: 'class' },
    };

    const formSchema = {
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
          validations: validations.name,
        },
        {
          label: 'Class',
          name: 'class',
          placeholder: 'Seed',
          inputProps: {
            maxLength: 20,
          },
          validations: validations.class,
        },
        {
          label: 'Types',
          name: 'types',
          placeholder: 'Water',
          inputProps: {
            maxLength: 30,
          },
          validations: validations.types,
          onEdit: true,
        },
        {
          label: 'Max CP',
          name: 'maxCP',
          placeholder: '12',
          validations: validations.maxCP,
        },
        {
          label: 'Max HP',
          name: 'maxHP',
          placeholder: '1234',
          validations: validations.maxHP,
        },
        {
          label: 'Evolutions',
          name: 'evolutions',
          placeholder: 'Pichu > Pikachu > Raichu',
          inputProps: {
            maxLength: 40,
          },
          validations: validations.evolutions,
        },
      ],
    };

    const miniFormSchema = {
      field1: formSchema.fields[0],
      field2: formSchema.fields[1],
    };

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
            searchQuery={searchQuery}
            someSelected={someSelected}
            addRecord={this.addPokemon}
            deleteRecord={this.deletePokemon}
            searchRecord={this.searchPokemon}
          />
          <RecordList
            totalPages={totalPages}
            currPage={currPage}
            changePage={this.setPageNo}
            records={pokedex}
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