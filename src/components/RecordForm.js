import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  makeStyles,
  Grid,
  Box,
  Avatar,
  Button,
  Input,
  Fab,
  FormHelperText,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { Check, Edit, Close, ArrowBack, Delete } from "@material-ui/icons";

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
    backgroundColor: "#f1f1f1",
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
  overlayEdit: {
    position: 'absolute',
    zIndex: 1,
    borderRadius: '50%',
    cursor: "pointer",
    height: 80,
    width: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    color: '#ffffffbf',
    opacity: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    '&:hover': {
      opacity: 1,
    },
  },
  fallbackText: {
    fontSize: 28
  },
  marginTop: {
    marginTop: 20
  },
  saveBtn: {
    background: "linear-gradient(to right, #fa8569, #ff4b6e)",
    color: "#ffffffbf"
  },
  formRow: {
    alignItems: "baseline",
    padding: "10px 0px",
    [theme.breakpoints.only("xs")]: {
      padding: "10px 0px"
    }
  },
  editBtn: {
    background: "linear-gradient(to right, #fa8569, #ff4b6e)",
    color: "#ffffffbf",
    position: "absolute",
    right: 30,
    [theme.breakpoints.only("xs")]: {
      right: 20
    }
  },
  removeBtn: {
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    right: 0,
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
  },
  cancelBtn: {
    background: "linear-gradient(to right, #ffffff, #e8ecef)",
    position: "absolute",
    color: "#000000fb",
    right: 30,
    [theme.breakpoints.only("xs")]: {
      right: 20
    }
  },
  backBtn: {
    background: "linear-gradient(to right, #ffffff, #e8ecef)",
    position: "absolute",
    color: "#000000fb",
    left: 30,
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
  const { label, name, placeholder, inputProps, validations } = field || {};
  const { error, errors, register } = validate;
  const resError = error.field === name,
    helperText = (errors[name] && errors[name].message) || (resError && error.message) || ' ';

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
            <Tooltip title={label}>
              <Input
                fullWidth
                name={name}
                inputProps={inputProps}
                placeholder={placeholder}
                error={errors[name] !== undefined || resError}
                inputRef={register(validations)}
                defaultValue={display(name, record, editable)}
                onKeyDown={(event) => handleKeyDown(event)}
              />
            </Tooltip>
          ) || display(name, record, false)
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
  }

  const handleUpload = ({ target }) => {
    const { files } = target;
    var blob = URL.createObjectURL(files[0]);
    setSelectedFile(blob);
  }

  const onSubmit = data => {
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
                <Tooltip title="Back">
                  <Fab
                    size="small"
                    className={classes.backBtn}
                    onClick={() => handleAction(goBack)}
                  >
                    <ArrowBack />
                  </Fab>
                </Tooltip>
                <Tooltip title={editable ? "Cancel" : "Edit"}>
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
                    onChange={handleUpload}
                  />
                  {
                    (avatar || selectedFile) &&
                    <Tooltip title="Remove">
                      <Button
                        className={classes.removeBtn}
                        onClick={() => setSelectedFile(undefined)}
                      >
                        <Delete />
                      </Button>
                    </Tooltip>
                  }
                  <label htmlFor="contained-button-file">
                    <Tooltip title="Change">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        className={classes.overlayEdit}
                      >
                        <Edit />
                      </Box>
                    </Tooltip>
                  </label>
                </>
              }
              <Avatar
                className={classes.avatar}
                src={selectedFile || display("avatar", record)}
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
                  <Tooltip title="Save">
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
