import React, {
  useState
} from 'react';
import { useForm } from 'react-hook-form';
import clsx from "clsx";
import {
  Grid,
  Checkbox,
  Box,
  Avatar,
  IconButton,
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
  },
}));

const ContactListItem = ({ contact, selectContact, active, editContact, isNewContact, saveContact, checkContact }) => {
  const classes = useStyle();

  const { register, handleSubmit, errors } = useForm();

  const { id, avatar, name, email, company, checked } = contact;

  const [newContactName, setNewContactName] = useState('');

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

  const onSave = () => {
    saveContact(newContactName);
  }

  return (
    <Grid container
      alignItems="center"
      name="contactItem"
      className={clsx(classes.contact, active && 'active')}
      onClick={() => selectContact(id)}
    >
      <Grid item md={1} xs={2} sm={2}>
        <Checkbox
          onClick={(event) => { checkContact(id); event.stopPropagation(); }}
          color="primary"
          checked={checked || false}
          disabled={isNewContact}
        />
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
                        name="name"
                        error={errors.name !== undefined ? true : false}
                        inputRef={register({
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
                        })}
                        placeholder="John Doe"
                        defaultValue={newContactName}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => setNewContactName(event.target.value)}
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
              {
                isNewContact ?
                  '' :
                  email
              }
            </small>
          </Box>
        </Box>
      </Grid>
      <Hidden smDown>
        <Grid item md={5}>
          <h4 className={classes.noMargin}>
            {
              isNewContact ?
                '' :
                company
            }
          </h4>
        </Grid>
      </Hidden>
      <Hidden xsDown>
        <Grid item md={1} sm={1}>
          {
            isNewContact ?
              <IconButton size="small" className={classes.editBtn} onClick={handleSubmit(onSave)}>
                <Check />
              </IconButton> :
              <IconButton size="small" className={classes.editBtn} onClick={(event) => { editContact(id); event.stopPropagation() }}>
                <Edit />
              </IconButton>
          }
        </Grid>
      </Hidden>
    </Grid >
  );
};

export default ContactListItem;