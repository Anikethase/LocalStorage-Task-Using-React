import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import classnames from 'classnames';
import Joi from 'joi';

class ValidInput extends Component {
  render() {
    const {
      value,
      onChange,
      onValidation,
      placeholder,
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

    // eslint-disable-next-line prefer-const
    let { validation, schema, ...otherProps } = other;
    let valid = true;
    let messages = [];
    let joiError = null;
    const style = {};
    if (validation === true) {
      validation = VALIDATION.ALL;
    } else if (validation === false) {
      validation = VALIDATION.OFF;
    }
    if (
      !validationDisabled &&
      (validation & VALIDATION.ALL || (validation & VALIDATION.DIRTY && this.isDirty))
    ) {
      if (!schema || !schema.isJoi) {
        schema = Joi.alternatives([
          Joi.string().error((errors) => {
            errors.forEach((err) => {
              // eslint-disable-next-line no-param-reassign
              err.message = 'Cannot contain illegal characters';
            });
            return errors;
          }),
          Joi.string().email(),
          Joi.string().uri(),
          Joi.number(),
          Joi.boolean(),
        ]);
      }
      if (!schema._getLabel()) {
        schema = schema.label(placeholder);
      }
      if (validation & VALIDATION.INVALIDATE_EMPTY) {
        schema = schema.required();
      }
      const { error } = schema.validate(value);
      if (error) {
        valid = false;
        messages = error.details.map((d) => d.message);
        joiError = error;
        style.borderColor = 'red';
      } else if (showValid) {
        style.borderColor = 'green';
      }
      onValidation(valid, messages, joiError);
    } else {
      valid = true;
      messages = [];
    }

    return (
      <>
        <Input
          {...otherProps}
          onChange={(...params) => {
            if (!this.isDirty) {
              this.isDirty = true;
            }
            onChange(...params);
          }}
          placeholder={placeholder}
          value={value}
          style={style}
        />
        <p
          className={classnames({
            'invalid-feedback': validation && !valid,
            'valid-feedback': validation && showValid && valid,
          })}
          style={
            (validation && !valid) || (validation && showValid && valid)
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          {messages[0]}
        </p>
      </>
    );
  }
}
ValidInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  validation: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  schema: PropTypes.instanceOf(Joi.constructor),
  onChange: PropTypes.func,
  onValidation: PropTypes.func,
  validationDisabled: PropTypes.bool,
  showValid: PropTypes.bool,
  placeholder: PropTypes.string,
};
ValidInput.defaultProps = {
  value: undefined,
  validation: false,
  schema: undefined,
  onChange: () => 'onChange STUB',
  onValidation: () => 'onValidation STUB',
  validationDisabled: false,
  showValid: false,
  placeholder: 'Value',
};
export default ValidInput;
