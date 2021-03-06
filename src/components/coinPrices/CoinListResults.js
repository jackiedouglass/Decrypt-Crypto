import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const CoinListResults = ({ coins, coinList, setCoinId, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(0);

  const handleSelectOne = (event, id, coinInfo) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(id);
      const coinSearchId = id
        .replace('USD', 'btc')
        .toLowerCase()
        .replace('/', '');
      setCoinId({ id: coinSearchId, coinInfo });
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
      setCoinId({ id: 'first', coinInfo });
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
      setCoinId({ id: 'first', coinInfo });
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
      setCoinId({ id: 'first', coinInfo });
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Coin Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Current Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coinList
                .slice(page * limit, page * limit + limit)
                .map((customer, i) => (
                  <TableRow
                    hover
                    key={customer.key}
                    selected={
                      selectedCustomerIds.indexOf(customer.label) !== -1
                    }
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          selectedCustomerIds.indexOf(customer.label) !== -1
                        }
                        onChange={(event) =>
                          handleSelectOne(event, customer.label, customer)
                        }
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {customer.label}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>${customer.currentPrice}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={coinList.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[50, 100, 250]}
      />
    </Card>
  );
};

CoinListResults.propTypes = {
  coins: PropTypes.array.isRequired
};

export default CoinListResults;
