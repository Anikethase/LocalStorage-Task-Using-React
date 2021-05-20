import React from 'react';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {
 
  makeStyles,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Table } from 'reactstrap';

const useStyles = makeStyles({
  table: {
    maxWidth: 500,
  },
});

function createOrderData(orderNo, customerName, purchaseDate, totalAmount) {
  return { orderNo, customerName, purchaseDate, totalAmount };
}

function createItemsData(itemName, itemQuantity, itemPrice, orderNo) {
  return { itemName, itemQuantity, itemPrice, orderNo };
}

function Assignment4({ onValidation, validation, validate }) {
  const classes = useStyles();

 let xyz = {};
 let items = {};
//  let items = JSON.parse(localStorage.getItem('items0'));
//  console.log(items[0].itemName);
//  const itemsData = [
//   createItemsData(items[0].itemName, items[0].quantity, items[0].totalPrice, items[0].orderNo),
//   createItemsData(items[1].itemName, items[1].quantity, items[1].totalPrice, items[1].orderNo),
//  ];

  const orderData = [];
  const itemsData = [];
  let j = 0;

  for ( let i = 0, len = localStorage.length; i < len; ++i ) {
    console.log( localStorage.getItem( localStorage.key( i ) ) );
  }

  for(let i=0; i<localStorage.length/2; i+=1){    
    xyz = JSON.parse(localStorage.getItem('order'+i));
    console.log('After local Storage', xyz);
    orderData[i] = createOrderData(xyz.orderNo, xyz.customerName, xyz.purchaseDate, xyz.totalAmount);
     
    items = JSON.parse(localStorage.getItem('items'+i));
    for(let k = 0; k<items.length; k+=1){
      console.log('After local Storage', items[k]);
      itemsData[j++] = createItemsData(items[k].itemName, items[k].quantity, items[k].totalPrice, items[k].orderNo);
    }
    
  }

  return (
    <>
    <Grid item container style={{paddingTop: 10, paddingLeft: 200, paddingRight:100 }}>
      <Grid>
        <Typography
          variant="h5"
          style={{paddingTop: 100 }}
        >
          Order List
        </Typography>
      </Grid>     
    </Grid>
    <Grid style={{paddingLeft: 150, paddingRight:500 }}>
      <hr style={{ height: '3px', background: '#232741', borderRadius: '5px' }} />
    </Grid>

  <Grid container style={{ marginTop: 10, paddingLeft: 300 }} direction="row" spacing={8}>
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order No</TableCell>
            <TableCell align="right">Customer Name</TableCell>
            <TableCell align="right">Purchase Date</TableCell>
            <TableCell align="right">Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData.map((row) => (
            <TableRow key={row.orderNo}>
              <TableCell component="th" scope="row">
                {row.orderNo}
              </TableCell>
              <TableCell align="right">{row.customerName}</TableCell>
              <TableCell align="right">{row.purchaseDate}</TableCell>
              <TableCell align="right">{row.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Grid>

  <Grid item container style={{paddingTop: 10, paddingLeft: 200, paddingRight:100 }}>
    <Grid>
      <Typography
        variant="h5"
        style={{paddingTop: 100 }}
      >
        Item List
      </Typography>
    </Grid>     
  </Grid>
  <Grid style={{paddingLeft: 150, paddingRight:500 }}>
    <hr style={{ height: '3px', background: '#232741', borderRadius: '5px' }} />
  </Grid>

    <Grid container style={{ marginTop: 10, paddingLeft: 300 }} direction="row" spacing={8}>
      <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell align="right">Item Quantity</TableCell>
            <TableCell align="right">Item Price</TableCell>
            <TableCell align="right">Order No</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemsData.map((row) => (
            <TableRow key={row.itemName}>
              <TableCell component="th" scope="row">
                {row.itemName}
              </TableCell>
              <TableCell align="right">{row.itemQuantity}</TableCell>
              <TableCell align="right">{row.itemPrice}</TableCell>
              <TableCell align="right">{row.orderNo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Grid>
    </>
  );
}

Assignment4.propTypes = {
  validate: PropTypes.func.isRequired,
  validation: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  onValidation: PropTypes.func.isRequired,
};

export default Assignment4;