import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  makeStyles,
  Grid,
  Box,
  Avatar,
  Input,
  Fab,
  FormHelperText,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { Check, Edit, Close, ArrowBack, Delete } from "@material-ui/icons";
import ReactHtmlParser from 'react-html-parser';

const useStyle = makeStyles(theme => ({
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  formWrapper: {
    paddingLeft: "60px",
    [theme.breakpoints.down("md")]: {
      padding: "20px 0px"
    }
  },
  recordForm: {
    backgroundColor: "#ddd",
    padding: "30px 40px",
    width: "100%",
    position: "relative",
    [theme.breakpoints.only("sm")]: {
      padding: "30px"
    },
    [theme.breakpoints.only("xs")]: {
      padding: "20px"
    }
  },
  formHeader: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
    paddingBottom: 40,
    [theme.breakpoints.only("xs")]: {
      paddingBottom: 20
    }
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    height: "80px",
    width: "80px",
  },
  marginTop: {
    marginTop: 20
  },
  saveBtn: {
    background: "linear-gradient(to right, #fa8569, #ff4b6e)",
    color: "#ffffffbf",
    marginTop: 20,
    '&:hover': {
      color: '#fff',
      background: 'linear-gradient(to right, #ff6641, #ff2a53)',
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: 15,
    },
  },
  formRow: {
    alignItems: "baseline",
    padding: "10px",
    margin: '5px',
    backgroundColor: '#ffffffbf',
  },
  editBtn: {
    background: "linear-gradient(to right, #fa8569, #ff4b6e)",
    color: "#ffffffbf",
    position: "absolute",
    right: 30,
    '&:hover': {
      color: '#fff',
      background: 'linear-gradient(to right, #ff6641, #ff2a53)',
    },
    [theme.breakpoints.only("xs")]: {
      right: 20
    }
  },
  avatarBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: "absolute",
    zIndex: 2,
    right: 0,
    background: "linear-gradient(to right, #fa8569, #ff4b6e)",
    color: "#ffffffbf",
    padding: 0,
    margin: "0px 2px",
    height: 30,
    width: 30,
    borderRadius: "50%",
    boxShadow: "1px 1px 2px grey",
    '&:hover': {
      color: '#fff',
      background: 'linear-gradient(to right, #ff6641, #ff2a53)',
    },
  },
  cancelBtn: {
    background: "linear-gradient(to right, #ffffff, #e8ecef)",
    position: "absolute",
    color: "#000000fb",
    right: 30,
    '&:hover': {
      color: '#000',
      background: 'linear-gradient(to right, #e1e1e1, #b7b7b7)',
    },
    [theme.breakpoints.only("xs")]: {
      right: 20
    }
  },
  backBtn: {
    background: "linear-gradient(to right, #ffffff, #e8ecef)",
    position: "absolute",
    color: "#000000fb",
    left: 30,
    '&:hover': {
      color: '#000',
      background: 'linear-gradient(to right, #e1e1e1, #b7b7b7)',
    },
    [theme.breakpoints.only("xs")]: {
      left: 20
    }
  }
}));

const display = (field, record, input = false) => {
  if (record === undefined)
    return "N/A";

  if (input)
    return record[field];

  if (!record[field] || record[field] === "")
    return "N/A";

  return record[field];
};

const FormRow = ({ input, validate, hidden }) => {
  const classes = useStyle();
  const { field, editable, record, handleKeyDown } = input;
  const { label, name, placeholder, multiline, inputProps, validations } = field || {};
  const { error, errors, register } = validate;
  const resError = error.field === name,
    helperText = (errors[name] && errors[name].message) || (resError && error.message) || '';

  return (
    !hidden &&
    <Grid item container className={classes.formRow}>
      <Grid item xs={12} sm={3}>
        {label}:
      </Grid>
      <Grid item xs={12} sm={9}>
        {
          (
            editable &&
            <Tooltip arrow title={label} disableFocusListener={true}>
              <Input
                fullWidth
                multiline={multiline}
                name={name}
                inputProps={inputProps}
                placeholder={placeholder}
                error={errors[name] !== undefined || resError}
                inputRef={register(validations)}
                defaultValue={display(name, record, editable)}
                onKeyDown={(event) => handleKeyDown(event)}
              />
            </Tooltip>
          ) || ReactHtmlParser(display(name, record, false))
        }
        <FormHelperText error>
          {helperText}
        </FormHelperText>
      </Grid>
    </Grid>
  );
}

const RecordForm = ({ record, editable, editRecord, updateRecord, goBack, formSchema }) => {

  const classes = useStyle();

  const stringToColour = str => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = "#";
    for (i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }

    return colour + "bf";
  };

  var { register, handleSubmit, errors, reset } = useForm();

  const [error, setError] = useState({});

  const { id, avatar } = record || {};

  const [selectedFile, setSelectedFile] = useState(undefined);

  const { header: { heading, subHeading }, fields } = formSchema;

  useEffect(() => {
    reset();
    setError({});
    setSelectedFile(avatar);
  }, [record, avatar, reset]);

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

  const handleAction = (func) => {
    func(id);
    setError({});
    setSelectedFile(undefined);
  }

  const handleUpload = ({ target }) => {
    const { files } = target;
    var blob = URL.createObjectURL(files[0]);
    setSelectedFile(blob);
  }

  const handleRemove = (event, removing) => {
    event.target.value = null;
    setSelectedFile(undefined);

    if (removing)
      event.preventDefault();
  }

  const onSubmit = data => {
    Object.keys(data).forEach(k => data[k] = typeof data[k] == 'string' ? data[k].trim() : data[k]);
    var { status, error } = updateRecord({ ...data, id, avatar: selectedFile });
    if (!status) setError(error);
  };

  return (
    <Grid item lg={6} xs={12}>
      <Grid item container wrap="nowrap" md={12} className={classes.formWrapper}>
        <Box className={classes.recordForm}>
          {
            record && (
              <>
                <Tooltip arrow title="Back">
                  <Fab
                    size="small"
                    className={classes.backBtn}
                    onClick={() => handleAction(goBack)}
                  >
                    <ArrowBack />
                  </Fab>
                </Tooltip>
                <Tooltip arrow title={editable ? "Cancel" : "Edit"}>
                  <Fab
                    size="small"
                    className={editable ? classes.cancelBtn : classes.editBtn}
                    onClick={() => handleAction(editRecord)}
                  >
                    {editable ? <Close /> : <Edit />}
                  </Fab>
                </Tooltip>
              </>
            )
          }
          <Box className={classes.formHeader}>
            <Box className={classes.avatarWrapper}>
              {
                editable &&
                <>
                  <input
                    hidden
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onClick={(event) => handleRemove(event, avatar || selectedFile)}
                    onChange={handleUpload}
                  />
                  <label htmlFor="contained-button-file" className={classes.avatarBtn}>
                    <Tooltip arrow title={(avatar || selectedFile) ? 'Remove' : 'Change'}>
                      {(avatar || selectedFile) ? <Delete /> : <Edit />}
                    </Tooltip>
                  </label>
                </>
              }
              <Avatar
                className={classes.avatar}
                src={selectedFile ? selectedFile : display("avatar", record)}
                style={{
                  backgroundColor: stringToColour(
                    display(fields[0].name, record) + display(fields[1].name, record, true)
                  )
                }}
              >
                {
                  display(fields[0].name, record).split(" ").map(n => n[0])
                }
              </Avatar>
            </Box>
            <Typography component="h2" variant="h5" className={classes.marginTop}><b>{display(heading, record)}</b></Typography>
            <small>{display(subHeading, record)}</small>
          </Box>
          <Grid container>
            {
              fields.map(({ onEdit, ...field }) =>
                <FormRow
                  key={field.name}
                  input={{ field, record, editable, handleKeyDown }}
                  validate={{ error, errors, register }}
                  hidden={onEdit && !editable}
                />
              )
            }

            {
              editable &&
              (
                <Grid item container justify="center">
                  <Tooltip arrow title="Save">
                    <Fab
                      variant="extended"
                      className={classes.saveBtn}
                      onClick={handleSubmit(onSubmit)}
                    >
                      <Check className={classes.extendedIcon} />
                  Save
                  </Fab>
                  </Tooltip>
                </Grid>
              )
            }
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RecordForm;
