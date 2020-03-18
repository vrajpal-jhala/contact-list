import React, {
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import {
  makeStyles,
  Grid,
  Box,
  Avatar,
  Input,
  Fab,
  IconButton,
  Hidden,
  FormHelperText,
} from '@material-ui/core';
import {
  Check,
  Edit,
} from '@material-ui/icons';

const useStyle = makeStyles(theme => ({
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
    position: 'relative',
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
    alignItems: "baseline",
    padding: '20px 0px',
    [theme.breakpoints.only("xs")]: {
      padding: '10px 0px',
    }
  },
  editBtn: {
    background: 'linear-gradient(to right, #fa8569, #ff4b6e)',
    color: '#ffffffbf',
    position: 'absolute',
    right: 20
  }
}));

const ContactForm = ({ selectedContact, editable, updateContact, editContact }) => {

  const classes = useStyle();

  const { id, avatar, name, about } = selectedContact || {};

  const { register, handleSubmit, errors } = useForm();

  const [updatedContact, setUpdatedContact] = useState(selectedContact);

  const onSubmit = data => { console.log(data) }

  const handleChange = (event) => {
    setUpdatedContact({
      ...updatedContact,
      [event.target.name]: event.target.value
    });
  }

  const display = (field, input = false) => {
    return field === undefined || selectedContact === undefined ? (input ? '' : 'N/A') : selectedContact[field];
  };

  return (
    <Grid item lg={6} xs={12}>
      <Grid item container md={12} className={classes.formWrapper}>
        <Box className={classes.contactForm}>
          <Hidden smUp>
            <IconButton size="small" className={classes.editBtn} onClick={() => editContact(id)}>
              <Edit />
            </IconButton>
          </Hidden>
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
                <Input
                  fullWidth
                  disabled={!editable}
                  disableUnderline={!editable}
                  error={errors.name !== undefined ? true : false}
                  inputRef={register({ required: { value: true, message: "This field is required" } })}
                  value={display("name", editable)}
                  name="name"
                  onChange={(event) => handleChange(event)}
                />
                <FormHelperText error>{errors.name ? errors.name.message : ' '}</FormHelperText>
              </Grid>
            </Grid>
            {
              editable &&
              <Grid item container className={classes.formRow}>
                <Grid item xs={12} sm={3}>
                  About:
                  </Grid>
                <Grid item xs={12} sm={9}>
                  <Input
                    fullWidth
                    disabled={!editable}
                    disableUnderline={!editable}
                    error={errors.about !== undefined ? true : false}
                    inputRef={register({ required: { value: true, message: "This field is required" } })}
                    value={display("about", editable)}
                    name="about"
                    onChange={(event) => handleChange(event)}
                  />
                  <FormHelperText error>{errors.about ? errors.about.message : ' '}</FormHelperText>
                </Grid>
              </Grid>
            }
            <Grid item container className={classes.formRow}>
              <Grid item xs={12} sm={3}>
                Email:
              </Grid>
              <Grid item xs={12} sm={9}>
                <Input
                  fullWidth
                  disabled={!editable}
                  disableUnderline={!editable}
                  error={errors.email !== undefined ? true : false}
                  inputRef={register({ required: { value: true, message: "This field is required" } })}
                  value={display("email", editable)}
                  name="email"
                  onChange={(event) => handleChange(event)}
                />
                <FormHelperText error>{errors.email ? errors.email.message : ' '}</FormHelperText>
              </Grid>
            </Grid>
            <Grid item container className={classes.formRow}>
              <Grid item xs={12} sm={3}>
                Phone:
              </Grid>
              <Grid item xs={12} sm={9}>
                <Input
                  fullWidth
                  disabled={!editable}
                  disableUnderline={!editable}
                  error={errors.phone !== undefined ? true : false}
                  inputRef={register({ required: { value: true, message: "This field is required" } })}
                  value={display("phone", editable)}
                  name="phone"
                  onChange={(event) => handleChange(event)}
                />
                <FormHelperText error>{errors.phone ? errors.phone.message : ' '}</FormHelperText>
              </Grid>
            </Grid>
            <Grid item container className={classes.formRow}>
              <Grid item xs={12} sm={3}>
                Company:
              </Grid>
              <Grid item xs={12} sm={9}>
                <Input
                  fullWidth
                  disabled={!editable}
                  disableUnderline={!editable}
                  error={errors.company !== undefined ? true : false}
                  inputRef={register({ required: { value: true, message: "This field is required" } })}
                  value={display("company", editable)}
                  name="company"
                  onChange={(event) => handleChange(event)}
                />
                <FormHelperText error>{errors.company ? errors.company.message : ' '}</FormHelperText>
              </Grid>
            </Grid>
            <Grid item container className={classes.formRow}>
              <Grid item xs={12} sm={3}>
                Address:
              </Grid>
              <Grid item xs={12} sm={9}>
                <Input
                  fullWidth
                  disabled={!editable}
                  disableUnderline={!editable}
                  error={errors.address !== undefined ? true : false}
                  inputRef={register({ required: { value: true, message: "This field is required" } })}
                  value={display("address", editable)}
                  name="address"
                  onChange={(event) => handleChange(event)}
                />
                <FormHelperText error>{errors.address ? errors.address.message : ' '}</FormHelperText>
              </Grid>
            </Grid>
            {
              editable &&
              <Grid item container justify="center">
                <Fab variant="extended" className={classes.saveBtn} onClick={handleSubmit(onSubmit)}>
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

export default ContactForm;