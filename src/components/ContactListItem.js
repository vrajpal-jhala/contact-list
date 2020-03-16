import React, {
  useState
} from 'react';
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

const ContactListItem = ({ index, contact, selectContact, active, editContact, isEditing, isNewContact }) => {
  const classes = useStyle();

  const { avatar, name, email, company } = contact;

  const [newContact, setNewContact] = useState({});

  return (
    <Grid container alignItems="center" className={clsx(classes.contact, active && 'active')} onClick={() => { selectContact(index); isEditing && editContact(false); }}>
      <Grid item md={1} xs={2} sm={2}>
        <Checkbox
          color="primary"
        />
      </Grid>
      <Grid item md={5} xs={10} sm={9}>
        <Box className={classes.basicInfo}>
          <Box className={classes.avatarWrapper}>
            <Avatar
              src={avatar}
              className={classes.contactAvatar}
              style={{
                backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16) + 'bf'
              }} >
              {name.split(" ").map((n) => n[0])}
            </Avatar>
          </Box>
          <Box className={classes.contactName}>
            <h3 className={classes.noMargin}>
              {
                isNewContact ?
                  <Input placeholder="John Doe" /> :
                  name
              }
            </h3>
            <small>
              {
                isNewContact ?
                  <Input fullWidth placeholder="abc@xyz.com" style={{ fontSize: 12 }} /> :
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
                <Input placeholder="company" /> :
                company
            }
          </h4>
        </Grid>
      </Hidden>
      <Hidden xsDown>
        <Grid item md={1} sm={1}>
          {
            isNewContact ?
              <IconButton size="small" className={classes.editBtn}>
                <Check />
              </IconButton> :
              <IconButton size="small" className={classes.editBtn} onClick={() => editContact(true)}>
                <Edit />
              </IconButton>
          }
        </Grid>
      </Hidden>
    </Grid >
  );
};

export default ContactListItem;