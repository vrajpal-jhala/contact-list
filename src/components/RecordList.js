import React from 'react';
import RecordListHeader from './RecordListHeader';
import RecordListBody from './RecordListBody';
import {
  Grid,
} from '@material-ui/core';

const RecordList = ({ records, selectedRecord, selectRecord, editRecord, isEditing, updateRecord, saveRecord, isAdding, checkRecord, someSelected, allSelected, selectAll, deselectAll, deselectRecord, cancelAddRecord, listSchema, addRecordFormSchema, updateRecordFormSchema }) => {

  return (
    <Grid item lg={6} xs={12}>
      <RecordListHeader
        someSelected={someSelected}
        allSelected={allSelected}
        selectAll={selectAll}
        deselectAll={deselectAll}
        listSchema={listSchema}
      />
      <RecordListBody
        records={records}
        selectedRecord={selectedRecord}
        selectRecord={selectRecord}
        editRecord={editRecord}
        isEditing={isEditing}
        updateRecord={updateRecord}
        isAdding={isAdding}
        saveRecord={saveRecord}
        checkRecord={checkRecord}
        deselectRecord={deselectRecord}
        cancelAddRecord={cancelAddRecord}
        listSchema={listSchema}
        addRecordFormSchema={addRecordFormSchema}
        updateRecordFormSchema={updateRecordFormSchema}
      />
    </Grid>
  );
};

export default RecordList;