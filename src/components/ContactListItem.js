import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import clsx from "clsx";
import {
  Grid,
  Checkbox,
  Box,
  Avatar,
  IconButton,
  Button,
  makeStyles,
  Hidden,
  Input,
  FormHelperText,
} from '@material-ui/core';
import {
  Edit,
  Check,
} from '@material-ui/icons';

const useStyle = makeStyles(theme => ({
  contact: {
    margin: '10px 0px',
    padding: '0px 10px',
    '&:hover,&.active': {
      backgroundColor: '#e8ecef',
      cursor: 'pointer',
    }
  },
  basicInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  avatarWrapper: {
    padding: '10px 10px 10px 0px',
  },
  contactAvatar: {
    height: '50px',
    width: '50px',
  },
  contactName: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  noMargin: {
    margin: 0,
  },
  editBtn: {
    background: 'linear-gradient(to right, #fa8569, #ff4b6e)',
    color: '#ffffffbf',
    padding: 0,
    maxWidth: 30,
    minWidth: 30,
    maxHeight: 30,
    minHeight: 30,
    boxShadow: '1px 1px 2px grey',
  },
}));

const ContactListItem = ({ contact, selectContact, active, editContact, isNewContact, saveContact, checkContact }) => {
  const classes = useStyle();

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
        message: "Enter valid name",
      },
      maxLength: {
        value: 40,
        message: "Enter valid name",
      },
    },
    email: {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Enter valid email"
      },
      minLength: {
        value: 2,
        message: "Enter valid email",
      },
      maxLength: {
        value: 40,
        message: "Enter valid email",
      },
    },
  };

  const { id, avatar, name, email, checked } = contact;

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

  const onSave = (data) => { saveContact(data); }

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Grid container
        alignItems="center"
        name="contactItem"
        className={clsx(classes.contact, active && 'active')}
        onClick={() => selectContact(id)}
      >
        <Grid item md={1} xs={2} sm={2}>
          {isNewContact ?
            <Hidden smUp>
              <Button type="submit" className={classes.editBtn}>
                <Check />
              </Button>
            </Hidden> :
            <Checkbox
              onClick={(event) => { checkContact(id); event.stopPropagation(); }}
              color="primary"
              checked={checked || false}
            />
          }
        </Grid>
        <Grid item md={5} xs={10} sm={9}>
          <Box className={classes.basicInfo}>
            <Box className={classes.avatarWrapper}>
              <Avatar
                src={avatar}
                className={classes.contactAvatar}
                style={{
                  backgroundColor: stringToColour(name + email)
                }} >
                {
                  isNewContact ?
                    '' :
                    name.split(" ").map((n) => n[0])
                }
              </Avatar>
            </Box>
            <Box className={classes.contactName}>
              <h3 className={classes.noMargin}>
                {
                  isNewContact ?
                    (
                      <>
                        <Input
                          autoFocus
                          name="name"
                          error={errors.name !== undefined ? true : false}
                          inputRef={register(validations.name)}
                          placeholder="John Doe"
                          onClick={(event) => event.stopPropagation()}
                        />
                        <FormHelperText error>
                          {errors.name ? errors.name.message : ''}
                        </FormHelperText>
                      </>
                    ) :
                    name
                }
              </h3>
              <small>
                <Hidden mdUp>
                  {
                    isNewContact ?
                      (
                        <>
                          <Input
                            fullWidth
                            style={{ fontSize: 10 }}
                            name="email"
                            error={errors.email !== undefined ? true : false}
                            inputRef={register(validations.email)}
                            placeholder="john@gmail.com"
                            onClick={(event) => event.stopPropagation()}
                          />
                          <FormHelperText error>
                            {errors.email ? errors.email.message : ''}
                          </FormHelperText>
                        </>
                      ) :
                      email
                  }
                </Hidden>
              </small>
            </Box>
          </Box>
        </Grid>
        <Hidden smDown>
          <Grid item md={5}>
            <h4 className={classes.noMargin}>
              {
                isNewContact ?
                  <>
                    <Input
                      name="email"
                      error={errors.email !== undefined ? true : false}
                      inputRef={register(validations.email)}
                      placeholder="john@gmail.com"
                      onClick={(event) => event.stopPropagation()}
                    />
                    <FormHelperText error>
                      {errors.email ? errors.email.message : ''}
                    </FormHelperText>
                  </> :
                  email
              }
            </h4>
          </Grid>
        </Hidden>
        <Hidden xsDown>
          <Grid item md={1} sm={1}>
            {
              isNewContact ?
                <Button type="submit" className={classes.editBtn}>
                  <Check />
                </Button> :
                <IconButton size="small" className={classes.editBtn} onClick={(event) => { editContact(id); event.stopPropagation() }}>
                  <Edit />
                </IconButton>
            }
          </Grid>
        </Hidden>
      </Grid>
    </form>
  );
};

ContactListItem.propTypes = {
  selectContact: PropTypes.func,
  editContact: PropTypes.func,
  isEditing: PropTypes.bool,
}

ContactListItem.defaultProps = {
  selectContact: () => { },
  editContact: () => { },
  isEditing: false,
}

export default ContactListItem;