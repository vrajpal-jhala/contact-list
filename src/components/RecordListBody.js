import React from 'react';
import {
  Hidden,
  makeStyles,
} from '@material-ui/core';
import RecordListItem from './RecordListItem';
import NewRecordListItem from './NewRecordListItem';
import RecordForm from './RecordForm';

const useStyle = makeStyles(theme => ({
  noContacts: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40vh'
  }
}));

const RecordListBody = ({ records, selectedRecord, selectRecord, editRecord, isEditing, updateRecord, isAdding, saveRecord, checkRecord, deselectRecord, cancelAddRecord, listSchema, addRecordFormSchema, updateRecordFormSchema }) => {

  const classes = useStyle();

  return (
    <>
      {
        records.length === 0 &&
        <h3 className={classes.noContacts}>
          No Records
        </h3>
      }

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

      {
        isAdding &&
        <NewRecordListItem
          saveRecord={saveRecord}
          cancelAddRecord={cancelAddRecord}
          formSchema={addRecordFormSchema}
        />
      }
    </>
  );
};

export default RecordListBody;