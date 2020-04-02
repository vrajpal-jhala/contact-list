import React from 'react';
import clsx from "clsx";
import {
  Grid,
  Checkbox,
  Box,
  Avatar,
  makeStyles,
  Hidden,
  Typography,
  Tooltip,
} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  record: {
    margin: '5px 0px',
    padding: '0px 10px',
    height: 'max-content',
    '&:hover,&.selected': {
      backgroundColor: '#e8ecef',
      cursor: 'pointer',
    }
  },
  infoCol: {
    display: 'flex',
    alignItems: 'center',
  },
  avatarWrapper: {
    padding: '10px 10px 10px 0px',
  },
  avatar: {
    height: '50px',
    width: '50px',
  },
  infoBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const RecordListItem = ({ record, isSelected, selectRecord, checkRecord, listSchema }) => {
  const classes = useStyle();

  const { id, avatar, checked } = record;

  const { col1, col2 } = listSchema;

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
    <Grid item container
      alignItems="center"
      className={clsx(classes.record, isSelected && 'selected')}
      onClick={() => selectRecord(id)}
    >
      <Grid item md={1} xs={2} sm={2}>
        <Tooltip arrow title="Selecte Item">
          <Checkbox
            onClick={(event) => { checkRecord(id); event.stopPropagation(); }}
            color="primary"
            checked={checked || false}
          />
        </Tooltip>
      </Grid>
      <Grid item md={5} xs={10} sm={9}>
        <Box className={classes.infoCol}>
          <Box className={classes.avatarWrapper}>
            <Tooltip arrow title="Avatar">
              <Avatar
                src={avatar}
                className={classes.avatar}
                style={{
                  backgroundColor: stringToColour(record[col1.key] + record[col2.key])
                }}
              >
                {record[col1.key].split(" ").map((n) => n[0])}
              </Avatar>
            </Tooltip>
          </Box>
          <Box className={classes.infoBody} minWidth={0}>
            <Typography noWrap variant="subtitle1">
              <Tooltip arrow title={col1.name}>
                <b>{record[col1.key]}</b>
              </Tooltip>
            </Typography>
            <Hidden mdUp>
              <Typography noWrap>
                <Tooltip arrow title={col2.name}>
                  <small>{record[col2.key]}</small>
                </Tooltip>
              </Typography>
            </Hidden>
          </Box>
        </Box>
      </Grid>
      <Hidden smDown>
        <Grid item md={6} zeroMinWidth>
          <Typography noWrap variant="subtitle1">
            <Tooltip arrow title={col2.name}><b>{record[col2.key]}</b></Tooltip>
          </Typography>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default RecordListItem;