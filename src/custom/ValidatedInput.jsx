import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi';
import { TextField } from '@material-ui/core';

class ValidatedInput extends Component {
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
    
    const REGEXP_ILLEGALCHARS = new RegExp('.*(<\\w*?>|\\||~|`|\\^).*');

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
      if (!schema || !Joi.isSchema(schema)) {
        schema = Joi.alternatives(
          Joi.boolean(),
          Joi.number(),
          Joi.string().email({ tlds: { allow: false } }),
          Joi.string().uri(),
          Joi.string().regex(REGEXP_ILLEGALCHARS, { invert: true })
        );
      } else if (schema.type === 'string') {
        schema = schema.regex(REGEXP_ILLEGALCHARS, { invert: true });
      }
      schema = schema.messages({
        'alternatives.any': 'Please check',
        'any.required': 'Cannot be empty',
        'string.empty': 'Cannot be empty',
        'string.base': 'Should be a valid string',
        'string.email': 'Should be a valid email',
        'string.pattern.base': 'Cannot contain illegal characters',
        'string.pattern.invert.base': 'Cannot contain illegal characters',
        'string.lowercase': 'Cannot contain uppercase letters',
        'string.uri': 'Should be a valid URI',
        'string.length': 'Should be of length {#limit}',
        'string.max': 'Cannot exceed a length of {#limit}',
        'string.min': 'Cannot have length smaller than {#limit}',
        'string.domain': 'Should be a valid domain',
        'string.hostname': 'Should be a valid hostname',
        'string.ip': 'Should be a valid IP address',
        'string.hex': 'Should be a valid hex number',
        'boolean.base': 'Should be valid selection',
        'number.base': 'Should be a number',
        'number.integer': 'Should be an integer',
        'number.greater': 'Cannot be less than {#limit}',
        'number.less': 'Cannot be greater than {#limit}',
        'number.max': 'Cannot be greater than {#limit}',
        'number.min': 'Cannot be less than {#limit}',
        'number.positive': 'Should be a positive number',
        'number.negative': 'Should be a negative number',
      });
      if (required) {
        schema = schema.required();
      }
      if (validation & VALIDATION.INVALIDATE_EMPTY) {
        schema = schema.required();
      }

      const { error } = schema.validate(value);
      if (error) {
        valid = false;
        messages = error.details.map((d) => d.message);
        joiError = error;
      }
      onValidation(valid, messages, joiError);
    } else {
      valid = true;
      messages = [];
    }

    return (
      <>
        <TextField
          variant="outlined"
          error={!!validation && !valid}
          helperText={messages[0]}
          {...otherProps}
          onChange={(...params) => {
            if (!this.isDirty) {
              this.isDirty = true;
            }
            onChange(...params);
          }}
          required={required}
          value={value}
        />
      </>
    );
  }
}
ValidatedInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  validation: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  schema: PropTypes.instanceOf(Joi.constructor),
  onChange: PropTypes.func,
  onValidation: PropTypes.func,
  validationDisabled: PropTypes.bool,
  showValid: PropTypes.bool,
  required: PropTypes.bool,
};
ValidatedInput.defaultProps = {
  value: undefined,
  validation: false,
  schema: undefined,
  onChange: () => 'onChange STUB',
  onValidation: () => 'onValidation STUB',
  validationDisabled: false,
  showValid: false,
  required: false,
};

export default ValidatedInput;
