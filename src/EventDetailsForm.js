import React from 'react';
import PropTypes from 'prop-types';

const EventDetailsForm = ({
  value,
  placeholder,
  isRecurring,
  onChange,
  showDelete,
  onDelete,
  onCheckboxChange,
  onRecurIntervalChange,
  onRecurDaysChange,
  onRecurStartChange,
  onRecurEndChange,
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
      <div>
        <label>
          Is the event recurring?
          <input
            className="event-recurring"
            type="checkbox"
            onChange={onCheckboxChange}
          />
        </label>
      </div>
      {isRecurring ? (
        <RecurringDetailsForm
          onRecurIntervalChange={onRecurIntervalChange}
          onRecurDaysChange={onRecurDaysChange}
          onRecurStartChange={onRecurStartChange}
          onRecurEndChange={onRecurEndChange}
        />
      ) : null}
      {showDelete && (
        <div className="btn btn-warn" onClick={onDelete}>
          Delete
        </div>
      )}
    </div>
  );
};

const RecurringDetailsForm = ({
  onRecurIntervalChange,
  onRecurDaysChange,
  onRecurStartChange,
  onRecurEndChange,
}) => {
  return (
    <div>
      <div>
        <label>
          Interval:
          <input
            className="event-recurring-interval"
            type="number"
            onChange={onRecurIntervalChange}
            min="1"
            max="10"
          />
        </label>
      </div>
      <div>
        <span>Days to repeat</span>
        <div>
          <label>
            Sun
            <input
              className="event-recurring-week-days"
              name="sun"
              onChange={onRecurDaysChange}
              type="checkbox"
            />
          </label>
          <label>
            Mon
            <input
              className="event-recurring-week-days"
              name="mon"
              onChange={onRecurDaysChange}
              type="checkbox"
            />
          </label>
          <label>
            Tue
            <input
              className="event-recurring-week-days"
              name="tue"
              onChange={onRecurDaysChange}
              type="checkbox"
            />
          </label>
          <label>
            Wed
            <input
              className="event-recurring-week-days"
              name="wed"
              onChange={onRecurDaysChange}
              type="checkbox"
            />
          </label>
          <label>
            Thu
            <input
              className="event-recurring-week-days"
              name="thu"
              onChange={onRecurDaysChange}
              type="checkbox"
            />
          </label>
          <label>
            Fri
            <input
              className="event-recurring-week-days"
              name="fri"
              onChange={onRecurDaysChange}
              type="checkbox"
            />
          </label>
          <label>
            Sat
            <input
              className="event-recurring-week-days"
              name="sat"
              onChange={onRecurDaysChange}
              type="checkbox"
            />
          </label>
        </div>
      </div>
      <div>
        <label>
          Start date
          <input
            className="event-recurring-start"
            type="date"
            onChange={onRecurStartChange}
          />
        </label>
      </div>
      <div>
        <label>
          End date
          <input
            className="event-recurring-end"
            type="date"
            onChange={onRecurEndChange}
          />
        </label>
      </div>
    </div>
  );
};

EventDetailsForm.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  showDelete: PropTypes.bool,
  isRecurring: PropTypes.bool,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  onCheckboxChange: PropTypes.func,
  onRecurIntervalChange: PropTypes.func,
  onRecurDaysChange: PropTypes.func,
  onRecurStartChange: PropTypes.func,
  onRecurEndChange: PropTypes.func,
};

EventDetailsForm.defaultProps = {
  value: '',
  placeholder: 'Event title',
  showDelete: false,
  isRecurring: false,
  onChange: () => {},
  onDelete: () => {},
  onCheckboxChange: () => {},
  onRecurIntervalChange: () => {},
  onRecurDaysChange: () => {},
  onRecurStartChange: () => {},
  onRecurEndChange: () => {},
};

RecurringDetailsForm.propTypes = {
  onRecurIntervalChange: PropTypes.func,
  onRecurDaysChange: PropTypes.func,
  onRecurStartChange: PropTypes.func,
  onRecurEndChange: PropTypes.func,
};

export default EventDetailsForm;
