import React from 'react';
import { useForm } from 'react-hook-form';
import clsx from "clsx";
import {
  Grid,
  Box,
  Button,
  makeStyles,
  Hidden,
  Input,
  FormHelperText,
} from '@material-ui/core';
import {
  Check,
  Close
} from '@material-ui/icons';

const useStyle = makeStyles(theme => ({
  contact: {
    margin: '10px 0px',
    padding: '18px 20px',
    '&:hover,&.active': {
      backgroundColor: '#e8ecef',
      cursor: 'pointer',
    }
  },
  contactName: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  noMargin: {
    margin: 0,
  },
  saveBtn: {
    background: 'linear-gradient(to right, #ffffff, #e8ecef)',
    color: '#000000bf',
    padding: 0,
    margin: '0px 2px',
    maxWidth: 30,
    minWidth: 30,
    maxHeight: 30,
    minHeight: 30,
    borderRadius: '50%',
    boxShadow: '1px 1px 2px grey',
  },
  closeBtn: {
    background: 'linear-gradient(to right, #fa8569, #ff4b6e)',
    color: '#ffffffbf',
    padding: 0,
    margin: '0px 2px',
    maxWidth: 30,
    minWidth: 30,
    maxHeight: 30,
    minHeight: 30,
    borderRadius: '50%',
    boxShadow: '1px 1px 2px grey',
  },
}));

const NewContactListItem = ({ saveContact, cancelAddContact }) => {
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
        message: "Enter at least 2 characters",
      },
      maxLength: {
        value: 40,
        message: "Enter no more than 40 characters",
      },
    },
    email: {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Enter valid email"
      },
      maxLength: {
        value: 60,
        message: "Enter no more than 60 characters",
      },
    },
  };

  const onSave = (data) => { saveContact(data); }

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Grid container
        alignItems="center"
        name="contactItem"
        className={clsx(classes.contact, 'active')}
      >
        <Grid item xs={8} sm={8} md={5}>
          <Box className={classes.basicInfo}>
            <Box className={classes.contactName}>
              <h3 className={classes.noMargin}>
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
              </h3>
              <small>
                <Hidden mdUp>
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
                </Hidden>
              </small>
            </Box>
          </Box>
        </Grid>
        <Hidden smDown>
          <Grid item md={5}>
            <h4 className={classes.noMargin}>
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
            </h4>
          </Grid>
        </Hidden>
        <Grid item xs={4} md={2} container justify="flex-end">
          <Button type="submit" className={classes.saveBtn}>
            <Check />
          </Button>
          <Button className={classes.closeBtn} onClick={() => cancelAddContact()}>
            <Close />
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewContactListItem;