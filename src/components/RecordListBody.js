import React from 'react';
import ListItemLoader from './ListItemLoader';
import {
  Hidden,
  Grid,
  makeStyles,
} from '@material-ui/core';
import {
  Pagination
} from '@material-ui/lab';
import RecordListItem from './RecordListItem';
import NewRecordListItem from './NewRecordListItem';
import RecordForm from './RecordForm';

const useStyle = makeStyles(theme => ({
  noContacts: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40vh'
  },
  scroll: {
    height: 500,
    overflowY: 'auto',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    padding: 10,
  },
  dividerMargin: {
    marginBottom: 20,
  }
}));

function RecordListBody({ loading, totalPages, currPage, changePage, records, selectedRecord, selectRecord, editRecord, isEditing, updateRecord, isAdding, saveRecord, checkRecord, deselectRecord, cancelAddRecord, listSchema, addRecordFormSchema, updateRecordFormSchema }) {

  const classes = useStyle();

  return (
    <>
      {
        records.length === 0 && !isAdding && !loading &&
        <h3 className={classes.noContacts}>
          No Records
        </h3>
      }

      {
        isAdding &&
        <NewRecordListItem
          saveRecord={saveRecord}
          cancelAddRecord={cancelAddRecord}
          formSchema={addRecordFormSchema}
        />
      }

      {
        loading ? <ListItemLoader /> :
          <Grid container className={classes.scroll}>
            {
              records.map((record, index) => {
                const isSelected = selectedRecord && record.id === selectedRecord.id;
                return (
                  <React.Fragment key={(record && record.id) || index}>
                    <RecordListItem
                      record={record}
                      isSelected={isSelected}
                      selectRecord={selectRecord}
                      checkRecord={checkRecord}
                      listSchema={listSchema}
                    />
                    {
                      isSelected &&
                      <Hidden lgUp>
                        <RecordForm
                          record={record}
                          editable={isEditing}
                          editRecord={editRecord}
                          updateRecord={updateRecord}
                          goBack={deselectRecord}
                          formSchema={updateRecordFormSchema}
                        />
                      </Hidden>
                    }
                  </React.Fragment>
                );
              })
            }
          </Grid>
      }

      {
        records.length > 0 &&
        <Pagination
          showFirstButton
          showLastButton
          count={totalPages}
          page={currPage + 1}
          color="primary"
          shape="rounded"
          onChange={changePage}
          classes={{ root: classes.pagination }}
        />
      }
    </>
  );
};

RecordListBody.defaultProps = {
  totalPages: 0,
  currPage: 0,
  changePage: () => { },
}

export default RecordListBody;