import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Grid,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { green, grey } from '@material-ui/core/colors';
import { useToasts } from 'react-toast-notifications';
import { connect } from 'react-redux';
import * as actions from 'src/redux/actions/organization/module';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
  },
  exportButton: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
  }
}));

const Toolbar = ({
  className,
  form,
  onInputChange,
  currentId,
  create,
  update,
  setSelectedItem,
  ...rest
}) => {
  const classes = useStyles();

  const { addToast } = useToasts();

  const onChange = (e) => {
    onInputChange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      addToast('Submitted successfully', { appearance: 'success' });
    };

    if (form.moduleName !== '') {
      if (currentId === 0 || currentId === undefined) create(form, onSuccess);
      else update(currentId, form, onSuccess);

      onInputChange('');
      setSelectedItem([]);
    }
  };
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button variant="contained" className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            value={form.moduleName}
            onChange={onChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon
                    fontSize="small"
                    color="action"
                  >
                    <AddCircleIcon />
                  </SvgIcon>
                </InputAdornment>
              )
            }}
            placeholder="Add module"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  moduleName: PropTypes.string,
  moduleList: PropTypes.array,
  onInputChange: PropTypes.func,
  form: PropTypes.object,
  create: PropTypes.func,
  update: PropTypes.func,
  currentId: PropTypes.any,
  setSelectedItem: PropTypes.func
};

const mapStateToProps = (state) => ({
  moduleList: state.modules.list,
  form: state.modules.form
});

const mapActionToProps = {
  create: actions.create,
  update: actions.update,
  onInputChange: actions.onInputChange
};

export default connect(mapStateToProps, mapActionToProps)(Toolbar);
