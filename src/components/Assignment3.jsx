import React, {useState} from 'react';

import { ValidInput, ValidatedInput, ValidatedDate } from '../custom';
import PropTypes from 'prop-types';
import Joi from 'joi';
import Grid from '@material-ui/core/Grid';
import {
  Button,
  Typography,
} from '@material-ui/core';
import { Col, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';

let count = -1;


function Assignment3({ onValidation, validation, validate }) {

  const [order, setOrder] = useState({
     orderNo: 0,
    customerName: '',
    purchaseDate: 0,
    totalAmount: 0,
  });
 
 const [requirements, setRequirements] = useState([{ itemName: '', quantity: 0, pricePerUnit: 0, totalPrice: 0, orderNo:0 }]);

 const _save = (count) => {
  localStorage.setItem('order'+count, JSON.stringify(order));
  localStorage.setItem('items'+count, JSON.stringify(requirements));

  for ( let i = 0, len = localStorage.length; i < len; ++i ) {
    console.log( localStorage.getItem( localStorage.key( i ) ) );
  }

  // for(let i=0; i<localStorage.length/2; i+=1){    
  //   xyz = JSON.parse(localStorage.getItem('order'+i));
  //   console.log('After local Storage', xyz);
    
  //   // var KeyName = window.localStorage.key(i);
  //   // console.log('Key', KeyName);
  //   // var valueName = window.localStorage.value(i);
  //   // console.log('Key', valueName);
  //   // itemsQ = JSON.parse(localStorage.getItem('items'+i));
  //   // console.log('After local Storage', itemsQ);
  //   orderData = [
  //     createOrderData(xyz.orderNo, xyz.customerName, xyz.purchaseDate, xyz.totalAmount)
  //    ];
  // }
 }

 const addItemRequirements = () => {
    const itemReq = {
      itemName: '',
      quantity: 0,
      pricePerUnit: 0,
      totalPrice: 0,
    };
    requirements.push(itemReq);
    setRequirements([...requirements]);
  };

  const deleteItemRequirements = (idx) => {
    requirements.splice(idx, 1);
    setRequirements([...requirements]);
  };

  const handleItemRequirementValueChange = (idx, value) => {
    requirements[idx].itemName = value;
    setRequirements([...requirements]);
  };

  const handleItemRequirementQuantityChange = (idx, value) => {
    requirements[idx].quantity = value;
    setRequirements([...requirements]);
  };

  const handleItemRequirementPriceQuantityChange = (idx, value) => {
    requirements[idx].pricePerUnit = value;
    setRequirements([...requirements]);
  };

  const handleItemRequirementPriceChange = (idx, value, value1) => {
    requirements[idx].totalPrice = value;
    requirements[idx].orderNo = value1;
    setRequirements([...requirements]);
  };

  return (
    <>
    <Grid item container style={{paddingTop: 10, paddingLeft: 200, paddingRight:100 }}>
      <Grid>
        <Typography
          variant="h5"
          style={{paddingTop: 100 }}
        >
          Enter Orders
        </Typography>
      </Grid>     
    </Grid>
    <Grid style={{paddingLeft: 150, paddingRight:500 }}>
    <hr style={{ height: '3px', background: '#232741', borderRadius: '5px' }} />
    </Grid>

    <Grid container id="create-order" style={{ marginTop: 15 }} direction="row" spacing={3}>
        <Grid item style={{ marginLeft: 200 }} xs={12} sm={2}>
          <ValidatedInput
            required
            style={{ verticalAlign: 'unset' }}
            id="orderNo"
            name="ORDERNO"
            label="Order No"
            value={order.orderNo}
            
            onChange={(e) =>
              setOrder({...order, orderNo: e.target.value})
              
            }
            onValidation={onValidation}
            validation={validation}
            schema={Joi.string().pattern(/^[a-zA-Z\s]*$/)}
          />
        </Grid>

        <Grid item style={{ marginLeft: 250 }} xs={12} sm={2}>
          <ValidatedDate
            required
            id="purchaseDate"
            name="PUCHASEDATE"
            label="Purchase Date"
            value={order.purchaseDate}
            onChange={(v) =>
              setOrder({...order, purchaseDate: v})
            }
            onValidation={onValidation}
            validation={validation}     
          />
        </Grid>
    </Grid>

    <Grid container id="create-order" style={{ marginTop: 15 }} direction="row" spacing={3}>
        <Grid item style={{ marginLeft: 200 }} xs={12} sm={2}>
          <ValidatedInput
            required
            style={{ verticalAlign: 'unset' }}
            id="customerName"
            name="CUSTOMERNAME"
            label="Customer Name"
            value={order.customerName}       
            onChange={(e) =>
              setOrder({...order, customerName: e.target.value})
            }
            onValidation={onValidation}
            validation={validation}
            schema={Joi.string().pattern(/^[a-zA-Z\s]*$/)}
          />
        </Grid>

        <Grid item style={{ marginLeft: 250 }} xs={12} sm={2}>
          <ValidatedInput
            required
            id="totalAmount"
            name="TOTALAMOUNT"
            label="Total Amount"
            value={order.totalAmount}
            onChange={(e) =>
              setOrder({...order, totalAmount: e.target.value})
            }
            onValidation={onValidation}
            validation={validation}   
            schema={Joi.number().min(0)}
          />
        </Grid>
    </Grid>

    <Grid item container style={{marginTop: 5, paddingLeft: 200, paddingRight:100 }}>
      <Grid>
        <Typography
          variant="h5"
          style={{paddingTop: 100 }}
        >
          Add Items
        </Typography>
      </Grid>     
    </Grid>
    <Grid style={{paddingLeft: 150, paddingRight:500 }}>
    <hr style={{ height: '3px', background: '#232741', borderRadius: '5px' }} />
    </Grid>
    
    <Grid item container style={{paddingTop: 30, paddingLeft: 200, paddingRight:100 }}>
      <Typography style={{paddingLeft: 30 }} >Item Name</Typography>
      <Typography style={{paddingLeft: 200 }} >Quantity</Typography>
      <Typography style={{paddingLeft: 150 }} >Price Per Quantity</Typography>
      <Typography style={{paddingLeft: 100 }} >Total Price</Typography>
    </Grid>

    {requirements && requirements.length > 0
      ? requirements.map((o, idx) => {
      return (
        <Grid item container style={{paddingTop: 30, paddingLeft: 200, paddingRight:100 }}>
          <Col xs="12" sm="6" lg="2">
            <FormGroup>         
              <ValidInput
              required
                name={`requirements[${idx}].itemName`}
                placeholder="Item"
                value={o.itemName}
                onChange={(e) => {
                  handleItemRequirementValueChange(idx, e.target.value);
                }}
                onValidation={onValidation}
                validation={validation}
                schema={Joi.string().pattern(/^[a-zA-Z\s]*$/)}
              />
            </FormGroup>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <FormGroup>
              <ValidInput
              required
                name={`requirements[${idx}].quantity`}
                type="number"
                value={o.quantity}
                placeholder="Quantity"
                onChange={(e) => {
                  handleItemRequirementQuantityChange(
                    idx,
                    parseInt(e.target.value, 10)
                  );
                }}
              />
            </FormGroup>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <FormGroup>  
              <ValidInput
              required
                name={`requirements[${idx}].pricePerQuantity`}
                type="number"
                value={o.pricePerQuantity}
                placeholder="Price Per Quantity"
                onChange={(e) => {
                  handleItemRequirementPriceQuantityChange(
                    idx,
                    parseInt(e.target.value, 10)
                  );
                }}
              />
            </FormGroup>
          </Col>
          <Col xs="12" sm="6" lg="3">
            <FormGroup>  
              <ValidInput
              required
                name={`requirements[${idx}].totalPrice`}
                type="number"
                value={o.totalPrice}
                placeholder="Total Price"
                onChange={(e) => {
                  handleItemRequirementPriceChange(
                    idx,
                    parseInt(e.target.value, 10),
                    parseInt(order.orderNo, 10)
                  );
                }}
              />
            </FormGroup> 
          </Col>
          <Col sm="1" style={{paddingLeft: 10}}>
            <Button
              color="success"
              onClick={() => {
                addItemRequirements();
              }}
            >
              Add Items
            </Button>
            </Col>     
          {idx > 0 ? (
            <Col sm="1">
              <Button
                color="danger"
                size="sm"
                onClick={() => {
                  deleteItemRequirements(idx);
                }}
              >
                Remove
              </Button>
            </Col>
          ) : null}
       </Grid>
        
      );
    })
  : null}

    <Grid container style={{ marginTop: 15 }} direction="row" spacing={6}>
      <Grid  item  style={{ paddingLeft: 550 }}>
        <Button
          color="primary"
          size="medium"
          variant="contained"
          onClick={() => {   
            count= count +1;
            _save(count);
          }}
        >
        Save
        </Button>
      </Grid>

      <Grid  item  style={{ paddingLeft: 100 }}>
      <Link to={`/`}>
        <Button variant="contained" color="primary">
         Reset
        </Button>
      </Link>
      </Grid>
    </Grid>

    <Grid container style={{ paddingLeft: 100, marginTop: 25 }} direction="row" spacing={6}>
    <Link to={`/assignment4`}>
        <Button variant="contained">
         Show Tables
        </Button>
      </Link>
    </Grid>
    </>
  );
}

Assignment3.propTypes = {
  validate: PropTypes.func.isRequired,
  validation: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  onValidation: PropTypes.func.isRequired,
};

export default Assignment3;