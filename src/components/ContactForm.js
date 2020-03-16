import React from 'react';
import {
  withStyles,
  Grid,
  Box,
  Avatar,
  Input,
  Fab,
} from '@material-ui/core';
import {
  Check
} from '@material-ui/icons';

const styles = theme => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  formWrapper: {
    paddingLeft: '60px',
    [theme.breakpoints.down("md")]: {
      padding: '20px 0px',
    },
  },
  contactForm: {
    backgroundColor: '#f1f1f1',
    padding: '30px 40px',
    width: '100%',
    [theme.breakpoints.only("sm")]: {
      padding: '30px',
    },
    [theme.breakpoints.only("xs")]: {
      padding: '20px',
    },
  },
  formHeader: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    paddingBottom: 40,
    [theme.breakpoints.only("xs")]: {
      paddingBottom: 20,
    }
  },
  avatar: {
    height: '80px',
    width: '80px',
  },
  fallbackText: {
    fontSize: 28,
  },
  noBottomMargin: {
    marginBottom: 0,
  },
  saveBtn: {
    background: 'linear-gradient(to right, #fa8569, #ff4b6e)',
    color: '#ffffffbf',
  },
  formRow: {
    alignItems: "center",
    padding: '20px 0px',
    [theme.breakpoints.only("xs")]: {
      padding: '10px 0px',
    }
  },
});

class ContactForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      updatedContact: {}
    }
  }

  handleChange = (event) => {
    const { updatedContact } = this.state;
    const newContact = {
      ...updatedContact,
      [event.target.name]: event.target.value
    };
    this.setState({ updatedContact: newContact });
  }

  render = () => {
    const { classes, selectedContact, editable, updateContact } = this.props;
    const { avatar, name, about, email, company, phone, address } = selectedContact || {};

    const display = (value, input = false) => {
      return value !== undefined && value !== "" ? value : input ? '' : 'N/A';
    };

    return (
      <Grid item lg={6} xs={12}>
        <Grid item container md={12} className={classes.formWrapper}>
          <Box className={classes.contactForm}>
            <Box className={classes.formHeader}>
              <Avatar className={classes.avatar} src={avatar}>
                {display(name).split(" ").map((n) => n[0])}
              </Avatar>
              <h2 className={classes.noBottomMargin}>{display(name)}</h2>
              <small>{display(about)}</small>
            </Box>
            <Grid container>
              <Grid item container className={classes.formRow}>
                <Grid item xs={12} sm={3}>
                  Full Name:
              </Grid>
                <Grid item xs={12} sm={9}>
                  {
                    editable ?
                      <Input fullWidth defaultValue={display(name, true)} name="name" onChange={this.handleChange} /> :
                      display(name)
                  }
                </Grid>
              </Grid>
              {
                editable &&
                <Grid item container className={classes.formRow}>
                  <Grid item xs={12} sm={3}>
                    About:
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Input fullWidth defaultValue={display(about, true)} name="about" onChange={this.handleChange} />
                  </Grid>
                </Grid>
              }
              <Grid item container className={classes.formRow}>
                <Grid item xs={12} sm={3}>
                  Email:
              </Grid>
                <Grid item xs={12} sm={9}>
                  {
                    editable ?
                      <Input fullWidth defaultValue={display(email, true)} name="email" onChange={this.handleChange} /> :
                      display(email)
                  }
                </Grid>
              </Grid>
              <Grid item container className={classes.formRow}>
                <Grid item xs={12} sm={3}>
                  Phone:
              </Grid>
                <Grid item xs={12} sm={9}>
                  {
                    editable ?
                      <Input fullWidth defaultValue={display(phone, true)} name="phone" onChange={this.handleChange} /> :
                      display(phone)
                  }
                </Grid>
              </Grid>
              <Grid item container className={classes.formRow}>
                <Grid item xs={12} sm={3}>
                  Company:
              </Grid>
                <Grid item xs={12} sm={9}>
                  {
                    editable ?
                      <Input fullWidth defaultValue={display(company, true)} name="company" onChange={this.handleChange} /> :
                      display(company)
                  }
                </Grid>
              </Grid>
              <Grid item container className={classes.formRow}>
                <Grid item xs={12} sm={3}>
                  Address:
              </Grid>
                <Grid item xs={12} sm={9}>
                  {
                    editable ?
                      <Input fullWidth defaultValue={display(address, true)} name="address" onChange={this.handleChange} /> :
                      display(address)
                  }
                </Grid>
              </Grid>
              {
                editable &&
                <Grid item container justify="center">
                  <Fab variant="extended" className={classes.saveBtn} onClick={() => updateContact(this.state.updatedContact)}>
                    <Check className={classes.extendedIcon} />
                  Save
                </Fab>
                </Grid>
              }
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ContactForm);