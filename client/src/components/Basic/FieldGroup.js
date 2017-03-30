import React, { PropTypes } from 'react';
import {FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';

const FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
};

FieldGroup.propTypes={
  id: PropTypes.string,
  label: PropTypes.string,
  help: PropTypes.string
};

export default FieldGroup;