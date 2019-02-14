import React from 'react';
import PropTypes from 'prop-types';

const EventDetailsForm = ({
  value,
  placeholder,
  onChange,
  showDelete,
  onDelete,
}) => {
  return (
    <div>
      <input
        className="event-title"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {showDelete && (
        <div className="btn btn-warn" onClick={onDelete}>
          Delete
        </div>
      )}
    </div>
  );
};

EventDetailsForm.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  showDelete: PropTypes.bool,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

EventDetailsForm.defaultProps = {
  value: '',
  placeholder: 'Event title',
  showDelete: false,
  onChange: () => {},
  onDelete: () => {},
};

export default EventDetailsForm;
