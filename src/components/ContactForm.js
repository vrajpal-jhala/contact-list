import React from 'react';
import { useForm } from 'react-hook-form';
import {
  makeStyles,
  Grid,
  Box,
  Avatar,
  Input,
  Fab,
  FormHelperText,
} from '@material-ui/core';
import {
  Check,
  Edit,
  Close,
  ArrowBack,
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
    padding: '10px 0px',
    [theme.breakpoints.only("xs")]: {
      padding: '10px 0px',
    }
  },
  editBtn: {
    background: 'linear-gradient(to right, #fa8569, #ff4b6e)',
    color: '#ffffffbf',
    position: 'absolute',
    right: 30,
    [theme.breakpoints.only("xs")]: {
      right: 20,
    }
  },
  cancelBtn: {
    background: 'linear-gradient(to right, #ffffff, #e8ecef)',
    position: 'absolute',
    color: '#000000fb',
    right: 30,
    [theme.breakpoints.only("xs")]: {
      right: 20,
    }
  },
  backBtn: {
    background: 'linear-gradient(to right, #ffffff, #e8ecef)',
    position: 'absolute',
    color: '#000000fb',
    left: 30,
    [theme.breakpoints.only("xs")]: {
      left: 20,
    }
  }
}));

const ContactForm = ({ selectedContact, editable, updateContact, editContact, deselectContact }) => {

  const classes = useStyle();

  const stringToColour = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }

    return colour + 'bf';
  }

  const { register, handleSubmit, errors } = useForm();

  const validations = {
    name: {
      required: {
        value: true,
        message: "This field is required"
      },
      pattern: {
        value: /[^\s]+/,
        message: "Enter valid name"
      },
      minLength: {
        value: 2,
        message: "Enter at least 2 characters",
      },
      maxLength: {
        value: 40,
        message: "Enter no more than 40 characters",
      },
    },
    about: {
      required: {
        value: true,
        message: "This field is required"
      },
      pattern: {
        value: /[^\s]+/,
        message: "Enter valid about"
      },
      minLength: {
        value: 10,
        message: "Enter at least 10 characters",
      },
      maxLength: {
        value: 50,
        message: "Enter no more than 50 characters",
      },
    },
    email: {
      required: {
        value: true,
        message: "This field is required"
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Invalid email address"
      },
      maxLength: {
        value: 60,
        message: "Enter no more than 60 characters",
      },
    },
    phone: {
      required: {
        value: true,
        message: "This field is required"
      },
      pattern: {
        value: /[+][(](\d{1,5})[)][\s](\d{6,10})$/,
        message: "Enter valid phone"
      },
    },
    company: {
      required: {
        value: true,
        message: "This field is required"
      },
      pattern: {
        value: /[^\s]+/,
        message: "Enter valid company name"
      },
      minLength: {
        value: 5,
        message: "Enter at least 5 characters",
      },
      maxLength: {
        value: 40,
        message: "Enter no more than 40 characters",
      },
    },
    address: {
      required: {
        value: true,
        message: "This field is required"
      },
      pattern: {
        value: /[^\s]+/,
        message: "Enter valid address"
      },
      minLength: {
        value: 10,
        message: "Enter  at least 10 characters",
      },
      maxLength: {
        value: 100,
        message: "Enter no more than 100 characters",
      },
    },
  };

  const onSubmit = (data) => { updateContact(data) }

  const display = (field, input = false) => {
    return input ? selectedContact[field] : selectedContact[field] === '' || selectedContact[field] === undefined ? 'N/A' : selectedContact[field];
  };

  return (
    <Grid item lg={6} xs={12}>
      <Grid item container md={12} className={classes.formWrapper}>
        <Box className={classes.contactForm}>
          {
            selectedContact.id > 0 &&
            <>
              <Fab size="small" className={classes.backBtn} onClick={() => deselectContact(selectedContact.id)}>
                <ArrowBack />
              </Fab>
              <Fab size="small" className={editable ? classes.cancelBtn : classes.editBtn} onClick={() => editContact(selectedContact.id)}>
                {
                  editable ? <Close /> : <Edit />
                }
              </Fab>
            </>
          }
          <Box className={classes.formHeader}>
            <Avatar
              className={classes.avatar}
              src={selectedContact.avatar}
              style={{
                backgroundColor: stringToColour(display("name") + display("email"))
              }}
            >
              {display("name").split(" ").map((n) => n[0])}
            </Avatar>
            <h2 className={classes.noBottomMargin}>{display("name")}</h2>
            <small>{display("about")}</small>
          </Box>
          <Grid container>
            <Grid item container className={classes.formRow}>
              <Grid item xs={12} sm={3}>
                Full Name:
              </Grid>
              <Grid item xs={12} sm={9}>
                {
                  editable ?
                    <Input
                      fullWidth
                      error={errors.name !== undefined}
                      inputRef={register(validations.name)}
                      defaultValue={display("name", editable)}
                      name="name"
                    /> :
                    display("name", false)
                }
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
                  {
                    editable ?
                      <Input
                        fullWidth
                        disabled={!editable}
                        disableUnderline={!editable}
                        error={errors.about !== undefined}
                        inputRef={register(validations.about)}
                        defaultValue={display("about", editable)}
                        name="about"
                      /> :
                      display("about", false)
                  }
                  <FormHelperText error>{errors.about ? errors.about.message : ' '}</FormHelperText>
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
                    <Input
                      fullWidth
                      disabled={!editable}
                      disableUnderline={!editable}
                      error={errors.email !== undefined}
                      inputRef={register(validations.email)}
                      defaultValue={display("email", editable)}
                      name="email"
                    /> :
                    display("email", false)
                }
                <FormHelperText error>{errors.email ? errors.email.message : ' '}</FormHelperText>
              </Grid>
            </Grid>
            <Grid item container className={classes.formRow}>
              <Grid item xs={12} sm={3}>
                Phone:
              </Grid>
              <Grid item xs={12} sm={9}>
                {
                  editable ?
                    <Input
                      fullWidth
                      disabled={!editable}
                      disableUnderline={!editable}
                      error={errors.phone !== undefined}
                      inputRef={register(validations.phone)}
                      defaultValue={display("phone", editable)}
                      name="phone"
                    /> :
                    display("phone", false)
                }
                <FormHelperText error>{errors.phone ? errors.phone.message : ' '}</FormHelperText>
              </Grid>
            </Grid>
            <Grid item container className={classes.formRow}>
              <Grid item xs={12} sm={3}>
                Company:
              </Grid>
              <Grid item xs={12} sm={9}>
                {
                  editable ?
                    <Input
                      fullWidth
                      disabled={!editable}
                      disableUnderline={!editable}
                      error={errors.company !== undefined}
                      inputRef={register(validations.company)}
                      defaultValue={display("company", editable)}
                      name="company"
                    /> :
                    display("company", false)
                }
                <FormHelperText error>{errors.company ? errors.company.message : ' '}</FormHelperText>
              </Grid>
            </Grid>
            <Grid item container className={classes.formRow}>
              <Grid item xs={12} sm={3}>
                Address:
              </Grid>
              <Grid item xs={12} sm={9}>
                {
                  editable ?
                    <Input
                      fullWidth
                      disabled={!editable}
                      disableUnderline={!editable}
                      error={errors.address !== undefined}
                      inputRef={register(validations.address)}
                      defaultValue={display("address", editable)}
                      name="address"
                    /> :
                    display("address", false)
                }
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