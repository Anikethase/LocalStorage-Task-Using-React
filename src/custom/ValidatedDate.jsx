import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi';
import moment from 'moment';
import { TextField } from '@material-ui/core';

class ValidatedDate extends Component {
  render() {
    const {
      value,
      onChange,
      onValidation,
      required,
      showValid,
      validationDisabled,
      ...other
    } = this.props;

    const VALIDATION = {
      OFF: 0,
      ALL: 1,
      DIRTY: 2,
      INVALIDATE_EMPTY: 4
    };

    const FORMAT_DATE_UNIXTS = 'X';
    const FORMAT_DATE_YYYMMDD = 'YYYY-MM-DD';

    // eslint-disable-next-line prefer-const
    let { validation, schema, ...otherProps } = other;
    let valid = true;
    let messages = [];
    let joiError = null;
    if (validation === true) {
      validation = VALIDATION.ALL;
    } else if (validation === false) {
      validation = VALIDATION.OFF;
    }

    if (
      !validationDisabled &&
      (validation & VALIDATION.ALL || (validation & VALIDATION.DIRTY && this.isDirty))
    ) {
      if (!moment(value, FORMAT_DATE_UNIXTS, true).isValid()) {
        valid = false;
        messages = ['Should be a valid date'];
        joiError = new Error('Should be a valid date');
      } else {
        if (!schema || !Joi.isSchema(schema)) {
          schema = Joi.date();
        }
        schema = schema.messages({
          'any.required': 'Cannot be empty',
          'string.empty': 'Cannot be empty',
          'date.base': 'Should be a valid date',
          'date.greater': 'Cannot be greater than {#limit}',
          'date.less': 'Cannot be less than {#limit}',
          'date.max': 'Cannot be greater than {#limit}',
          'date.min': 'Cannot be less than {#limit}',
        });
        if (required) {
          schema = schema.required();
        }
        if (validation & VALIDATION.INVALIDATE_EMPTY) {
          schema = schema.required();
        }
        if (schema._flags.presence === 'required' && !value) {
          // TO HANDLE value === 0
          valid = false;
          messages = ['Cannot be empty'];
          joiError = new Error('Cannot be empty');
        } else {
          const dateValue = moment(value, FORMAT_DATE_UNIXTS).format(FORMAT_DATE_YYYMMDD);
          const { error } = schema.validate(dateValue);
          if (error) {
            valid = false;
            messages = error.details.map((d) => d.message);
            joiError = error;
          }
        }
      }
      onValidation(valid, messages, joiError);
    } else {
      valid = true;
      messages = [];
    }

    return (
      <>
        <TextField
          error={!!validation && !valid}
          helperText={messages[0]}
          type="date"
          {...otherProps}
          onChange={(e, ...params) => {
            if (!this.isDirty) {
              this.isDirty = true;
            }
            onChange(Math.floor(new Date(e.target.value) / 1000), ...params);
          }}
          InputProps={{ inputProps: { min: '1970-01-01' } }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          required={required}
          value={
            value === 0 || !value
              ? null
              : moment(value, FORMAT_DATE_UNIXTS).format(FORMAT_DATE_YYYMMDD)
          }
        />
      </>
    );
  }
}
ValidatedDate.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  validation: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  schema: PropTypes.instanceOf(Joi.constructor),
  onChange: PropTypes.func,
  onValidation: PropTypes.func,
  validationDisabled: PropTypes.bool,
  showValid: PropTypes.bool,
  required: PropTypes.bool,
};
ValidatedDate.defaultProps = {
  value: null,
  validation: false,
  schema: undefined,
  onChange: () => 'onChange STUB',
  onValidation: () => 'onValidation STUB',
  validationDisabled: false,
  showValid: false,
  required: false,
};

export default ValidatedDate;
