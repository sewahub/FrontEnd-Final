import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, modules, ...rest }) => {
  const classes = useStyles();
  const [selectedModuleIds, setSelectedModuleIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedModuleIds;

    if (event.target.checked) {
      newSelectedModuleIds = modules.map((module) => module.ids);
    } else {
      newSelectedModuleIds = [];
    }

    setSelectedModuleIds(newSelectedModuleIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedModuleIds.indexOf(id);
    let newSelectedModuleIds = [];

    if (selectedIndex === -1) {
      newSelectedModuleIds = newSelectedModuleIds.concat(selectedModuleIds, id);
    } else if (selectedIndex === 0) {
      newSelectedModuleIds = newSelectedModuleIds.concat(selectedModuleIds.slice(1));
    } else if (selectedIndex === selectedModuleIds.length - 1) {
      newSelectedModuleIds = newSelectedModuleIds.concat(selectedModuleIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedModuleIds = newSelectedModuleIds.concat(
        selectedModuleIds.slice(0, selectedIndex),
        selectedModuleIds.slice(selectedIndex + 1)
      );
    }

    setSelectedModuleIds(newSelectedModuleIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedModuleIds.length === modules.length}
                    color="primary"
                    indeterminate={
                      selectedModuleIds.length > 0
                      && selectedModuleIds.length < modules.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {modules.slice(0, limit).map((module) => (
                <TableRow
                  hover
                  key={module.ids}
                  selected={selectedModuleIds.indexOf(module.ids) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedModuleIds.indexOf(module.ids) !== -1}
                      onChange={(event) => handleSelectOne(event, module.ids)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {module.moduleName}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={modules.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  modules: PropTypes.array.isRequired,
  selectItem: PropTypes.func,
  currentId: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  selectedItems: PropTypes.array,
  selectAllItems: PropTypes.func
};

export default Results;
