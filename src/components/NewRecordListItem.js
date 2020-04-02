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
  Tooltip,
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
  fieldPadding: {
    padding: '0px 5px',
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
    boxShadow: "1px 1px 2px grey",
    '&:hover': {
      color: '#000',
      background: 'linear-gradient(to right, #e1e1e1, #b7b7b7)',
    },
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
    boxShadow: "1px 1px 2px grey",
    '&:hover': {
      color: '#fff',
      background: 'linear-gradient(to right, #ff6641, #ff2a53)',
    },
  }
}));

const InputField = ({ input, validate }) => {
  const classes = useStyle();
  const { field, handleKeyDown, autoFocus } = input;
  const { label, name, placeholder, inputProps, validations } = field;
  const { error, register, errors } = validate;

  const resError = error.field === name,
    helperText = (errors[name] && errors[name].message) || (resError && error.message) || ' ';
  const hasError = errors[name] !== undefined || resError;
  return (
    <Box className={classes.fieldPadding}>
      <InputLabel error={hasError}>{label}</InputLabel>
      <Tooltip arrow title={label} disableFocusListener={true}>
        <Input
          autoFocus={autoFocus}
          name={name}
          inputProps={inputProps}
          placeholder={placeholder}
          error={hasError}
          inputRef={register(validations)}
          onKeyDown={(event) => handleKeyDown(event)}
          onClick={event => event.stopPropagation()}
        />
      </Tooltip>
      <FormHelperText error={hasError}>
        {helperText}
      </FormHelperText>
    </Box>
  )
};

const NewRecordListItem = ({ saveRecord, cancelAddRecord, formSchema }) => {

  const classes = useStyle();

  const { field1, field2 } = formSchema;

  const { register, handleSubmit, errors } = useForm();

  const [error, setError] = useState({});

  const handleKeyDown = ({ target, key }) => {
    const { name, maxLength, value } = target;
    const { field } = error;

    if (field !== name) {
      const excessiveInput = key.length === 1 && value.length === maxLength;
      if (excessiveInput) {
        setError({ field: name, message: `This field can't accept more than ${maxLength} characters` });

        setTimeout(() => {
          setError({});
        }, 2000);
      }
    }
  }

  const onSave = data => {
    Object.keys(data).forEach(k => data[k] = typeof data[k] == 'string' ? data[k].trim() : data[k]);
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
            <InputField input={{ field: field1, handleKeyDown, autoFocus: true }} validate={{ errors, error, register }} />
            <Hidden smUp>
              <InputField input={{ field: field2, handleKeyDown }} validate={{ errors, error, register }} />
            </Hidden>
          </Box>
        </Grid>
        <Hidden only="xs">
          <Grid item sm={5}>
            <InputField input={{ field: field2, handleKeyDown }} validate={{ errors, error, register }} />
          </Grid>
        </Hidden>
        <Grid item xs={4} sm={2} container justify="flex-end">
          <Tooltip arrow title="Save">
            <Button type="submit" className={classes.saveBtn}>
              <Check />
            </Button>
          </Tooltip>
          <Tooltip arrow title="Cancel">
            <Button
              className={classes.closeBtn}
              onClick={() => cancelAddRecord()}
            >
              <Close />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewRecordListItem;
