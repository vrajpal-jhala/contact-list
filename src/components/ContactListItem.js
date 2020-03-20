import React from 'react';
import clsx from "clsx";
import {
  Grid,
  Checkbox,
  Box,
  Avatar,
  Button,
  makeStyles,
  Hidden,
} from '@material-ui/core';
import {
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
}));

const ContactListItem = ({ contact, selectContact, active, isNewContact, checkContact }) => {
  const classes = useStyle();

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

  return (
    <Grid container
      alignItems="center"
      name="contactItem"
      className={clsx(classes.contact, active && 'active')}
      onClick={() => selectContact(id)}
    >
      <Grid item md={1} xs={2} sm={2}>
        {isNewContact ?
          <Button type="submit" className={classes.editBtn}>
            <Check />
          </Button> :
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
              {name.split(" ").map((n) => n[0])}
            </Avatar>
          </Box>
          <Box className={classes.contactName}>
            <h3 className={classes.noMargin}>
              {name}
            </h3>
            <small>
              <Hidden mdUp>
                {email}
              </Hidden>
            </small>
          </Box>
        </Box>
      </Grid>
      <Hidden smDown>
        <Grid item md={6}>
          <h4 className={classes.noMargin}>
            {email}
          </h4>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default ContactListItem;