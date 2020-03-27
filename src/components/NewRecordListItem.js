import React, { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import {
  Grid,
  Box,
  Button,
  makeStyles,
  Hidden,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";

const useStyle = makeStyles(theme => ({
  record: {
    margin: "10px 0px",
    padding: "18px 20px",
    "&:hover,&.selected": {
      backgroundColor: "#e8ecef",
      cursor: "pointer"
    }
  },
  recordName: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  saveBtn: {
    background: "linear-gradient(to right, #ffffff, #e8ecef)",
    color: "#000000bf",
    padding: 0,
    margin: "0px 2px",
    maxWidth: 30,
    minWidth: 30,
    maxHeight: 30,
    minHeight: 30,
    borderRadius: "50%",
    boxShadow: "1px 1px 2px grey"
  },
  closeBtn: {
    background: "linear-gradient(to right, #fa8569, #ff4b6e)",
    color: "#ffffffbf",
    padding: 0,
    margin: "0px 2px",
    maxWidth: 30,
    minWidth: 30,
    maxHeight: 30,
    minHeight: 30,
    borderRadius: "50%",
    boxShadow: "1px 1px 2px grey"
  }
}));

const InputField = ({ field, error, register, errors, autoFocus }) => {
  const { label, name, placeholder } = field;
  const resError = error.field === name,
    helperText = (errors[name] && errors[name].message) || (resError && error.message) || ' ';
  const hasError = errors[name] !== undefined || resError;
  return (
    <>
      <InputLabel error={hasError}>{label}</InputLabel>
      <Input
        autoFocus={autoFocus}
        name={name}
        placeholder={placeholder}
        error={hasError}
        inputRef={register(field.validations)}
        onClick={event => event.stopPropagation()}
      />
      <FormHelperText error={hasError}>
        {helperText}
      </FormHelperText>
    </>
  )
};

const NewRecordListItem = ({ saveRecord, cancelAddRecord, formSchema }) => {

  const classes = useStyle();

  const { field1, field2 } = formSchema;

  const { register, handleSubmit, errors } = useForm();

  const [error, setError] = useState({});

  const onSave = data => {
    const { status, error } = saveRecord(data);
    if (!status) setError(error);
  };

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Grid
        container
        alignItems="center"
        className={clsx(classes.record, "selected")}
      >
        <Grid item xs={8} sm={5}>
          <Box className={classes.recordName}>
            <InputField field={field1} errors={errors} error={error} register={register} autoFocus />
            <Hidden smUp>
              <InputField field={field2} errors={errors} error={error} register={register} />
            </Hidden>
          </Box>
        </Grid>
        <Hidden only="xs">
          <Grid item sm={5}>
            <InputField field={field2} errors={errors} error={error} register={register} />
          </Grid>
        </Hidden>
        <Grid item xs={4} sm={2} container justify="flex-end">
          <Button type="submit" className={classes.saveBtn}>
            <Check />
          </Button>
          <Button
            className={classes.closeBtn}
            onClick={() => cancelAddRecord()}
          >
            <Close />
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewRecordListItem;
