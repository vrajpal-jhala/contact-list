import React from 'react';
import RecordListHeader from './RecordListHeader';
import RecordListBody from './RecordListBody';
import {
  Grid,
  makeStyles,
  Select,
  MenuItem,
} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  border: {
    boxShadow: '0px 0px 4px silver',
    height: 'min-content',
  },
  spacing: {
    padding: '10px 15px',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  select: {
    marginLeft: 5,
  },
}));

const RecordList = ({ totalRecords, pageLength, changePageLength, someSelected, allSelected, selectAll, deselectAll, listSchema, ...recordListBodyProps }) => {

  const classes = useStyle();

  return (
    <Grid item lg={6} xs={12} className={classes.border}>
      <div className={`${classes.spacing} ${classes.flex}`}>
        <span>Records: {totalRecords}</span>
        <span className={classes.flex}>
          Length:
          <Select
            value={pageLength}
            onChange={changePageLength}
            className={classes.select}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </span>
      </div>
      <RecordListHeader
        someSelected={someSelected}
        allSelected={allSelected}
        selectAll={selectAll}
        deselectAll={deselectAll}
        listSchema={listSchema}
      />
      <RecordListBody
        listSchema={listSchema}
        {...recordListBodyProps}
      />
    </Grid>
  );
};

export default RecordList;