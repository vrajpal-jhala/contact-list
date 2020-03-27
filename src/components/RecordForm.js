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
} from "@material-ui/core";
import { Check, Edit, Close, ArrowBack } from "@material-ui/icons";

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
  const { field, editable, record } = input;
  const { label, name, placeholder, validations } = field || {};
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
            <Input
              fullWidth
              name={name}
              inputProps={field.inputProps}
              placeholder={placeholder}
              error={errors[name] !== undefined || resError}
              inputRef={register(validations)}
              defaultValue={display(name, record, editable)}
            />
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
  }, [avatar, reset]);

  const onSubmit = data => {
    var { status, error } = updateRecord({ ...data, id, avatar: selectedFile });
    if (!status) setError(error);
  };

  const handleAction = (func) => {
    func(id);
    setError({});
  }

  const handleUpload = ({ target }) => {
    const { files } = target;
    var blob = URL.createObjectURL(files[0]);
    setSelectedFile(blob);
  }

  return (
    <Grid item lg={6} xs={12}>
      <Grid item container wrap="nowrap" md={12} className={classes.formWrapper}>
        <Box className={classes.recordForm}>
          {
            record && (
              <>
                <Fab
                  size="small"
                  className={classes.backBtn}
                  onClick={() => handleAction(goBack)}
                >
                  <ArrowBack />
                </Fab>
                <Fab
                  size="small"
                  className={editable ? classes.cancelBtn : classes.editBtn}
                  onClick={() => handleAction(editRecord)}
                >
                  {editable ? <Close /> : <Edit />}
                </Fab>
              </>
            )
          }
          <Box className={classes.formHeader}>
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
                <label htmlFor="contained-button-file">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    className={classes.overlayEdit}
                  >
                    <Edit />
                  </Box>
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
            <Typography component="h2" variant="h5" className={classes.marginTop}><b>{display(heading, record)}</b></Typography>
            <small>{display(subHeading, record)}</small>
          </Box>
          <Grid container>
            {
              fields.map(({onEdit, ...field}) => 
                <FormRow 
                  key={field.name} 
                  input={{ field, record, editable }} 
                  validate={{ error, errors, register }}
                  hidden={onEdit && !editable} 
                />
              )
            }

            {
              editable &&
              (
                <Grid item container justify="center">
                  <Fab
                    variant="extended"
                    className={classes.saveBtn}
                    onClick={handleSubmit(onSubmit)}
                  >
                    <Check className={classes.extendedIcon} />
                  Save
                  </Fab>
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
