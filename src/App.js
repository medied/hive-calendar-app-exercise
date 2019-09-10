import React from 'react';
import { hot } from 'react-hot-loader';
import axios from 'axios';
import moment from 'moment';
import FullCalendar from 'fullcalendar-reactwrapper';
import Modal from 'react-responsive-modal';

import EventDetailsForm from './EventDetailsForm';

// See the FullCalendar API for details on how to use it:
// https://fullcalendar.io/docs
// We're using fullcalendar-reactwrapper to wrap it in a React
// component.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      modalOpen: false,
      newEvent: false,
      openedEventTitle: '',
      openedEventId: '',
      isRecurring: false,
      recurringEventInfo: {},
    };

    this.fetchAndLoadEvents = this.fetchAndLoadEvents.bind(this);
    this.getDates = this.getDates.bind(this);
    this.handleRecurringEvents = this.handleRecurringEvents.bind(this);
    this.onEventDrop = this.onEventDrop.bind(this);
    this.onEventResize = this.onEventResize.bind(this);
    this.onEventClick = this.onEventClick.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onExitedModal = this.onExitedModal.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onRecurCheckboxChange = this.onRecurCheckboxChange.bind(this);
    this.onRecurIntervalChange = this.onRecurIntervalChange.bind(this);
    this.onRecurDaysChange = this.onRecurDaysChange.bind(this);
    this.onRecurStartChange = this.onRecurStartChange.bind(this);
    this.onRecurEndChange = this.onRecurEndChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  transformToFullcalendarEvent(event) {
    const start = new Date(event.start);
    const end = new Date(event.end);
    return {
      allDay: true,
      id: event._id,
      title: event.title,
      start,
      end,
    };
  }

  updateEventDates(event) {
    // start = midnight on day of in UTC
    // end = start + 24 hours - 1 second
    const momentStart = moment(event.start.toDate());
    let momentEnd = moment(event.start.toDate())
      .add(24, 'hours')
      .add(-1, 'seconds');
    // Use event.end if it's present. 1 day events
    // do not have event.end if they're coming from Fullcalendar.
    if (event.end) {
      momentEnd = event.end;
    }
    axios
      .put(`/api/events/${event.id}`, {
        start: momentStart.toDate(),
        end: momentEnd.toDate(),
      })
      .catch(error => {
        alert('Something went wrong! Check the console.');
        console.log(error);
      });
  }

  onEventDrop(event) {
    this.updateEventDates(event);
  }

  onEventResize(event) {
    this.updateEventDates(event);
  }

  onEventClick(event) {
    this.setState({
      modalOpen: true,
      openedEventTitle: event.title,
      openedEventId: event.id,
    });
  }

  onCloseModal() {
    // Update the event
    const {
      openedEventId,
      newEvent,
      isRecurring,
      recurringEventInfo,
    } = this.state;

    let { openedEventTitle } = this.state;
    if (openedEventTitle === '') openedEventTitle = '(No title)';

    if (isRecurring) {
      this.handleRecurringEvents(recurringEventInfo, openedEventTitle);
    } else if (newEvent && !isRecurring) {
      axios
        .post('/api/events', { ...newEvent, title: openedEventTitle })
        .then(({ data }) => {
          const { events } = this.state;
          events.push(this.transformToFullcalendarEvent(data));
          this.setState({ events });
        })
        .catch(error => {
          alert('Something went wrong! Check the console.');
          console.log(error);
        });
    } else {
      axios
        .put(`/api/events/${openedEventId}`, { title: openedEventTitle })
        .then(({ data: updatedEvent }) => {
          // Find the event in our events array and update it accordingly
          const { events } = this.state;
          const updatedEvents = events.map(_event => {
            if (_event.id === updatedEvent._id) {
              return this.transformToFullcalendarEvent(updatedEvent);
            }
            return _event;
          });
          this.setState({ events: updatedEvents });
        })
        .catch(error => {
          alert('Something went wrong! Check the console.');
          console.log(error);
        });
    }
    // Close modal
    this.setState({
      modalOpen: false,
    });
  }

  onExitedModal() {
    // Reset state on animation end? Who put this here??
    this.setState({
      openedEventId: '',
      openedEventTitle: '',
      newEvent: false,
    });
  }

  onTitleChange(event) {
    this.setState({ openedEventTitle: event.currentTarget.value });
  }

  onRecurCheckboxChange(event) {
    this.setState({ isRecurring: event.currentTarget.checked });
  }

  onRecurIntervalChange(event) {
    const { recurringEventInfo } = this.state;
    const recurInterval = event.currentTarget.value;

    this.setState({
      recurringEventInfo: { ...recurringEventInfo, interval: recurInterval },
    });
  }

  onRecurDaysChange(event) {
    const { recurringEventInfo } = this.state;
    const days = {
      sun: 0,
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
      sat: 6,
    };
    const daySelected = event.currentTarget;
    let _daysOfWeek;

    recurringEventInfo.daysOfWeek
      ? (_daysOfWeek = recurringEventInfo.daysOfWeek)
      : (_daysOfWeek = []);

    if (daySelected.checked) {
      _daysOfWeek.push(days[daySelected.name]);
    } else {
      _daysOfWeek = _daysOfWeek.filter(day => day !== days[daySelected.name]);
    }

    _daysOfWeek.sort();

    this.setState({
      recurringEventInfo: { ...recurringEventInfo, daysOfWeek: _daysOfWeek },
    });
  }

  onRecurStartChange(event) {
    const { recurringEventInfo } = this.state;
    const startDate = event.currentTarget.value;

    this.setState({
      recurringEventInfo: { ...recurringEventInfo, startDate: startDate },
    });
  }

  onRecurEndChange(event) {
    const { recurringEventInfo } = this.state;
    const endDate = event.currentTarget.value;

    this.setState({
      recurringEventInfo: { ...recurringEventInfo, endDate: endDate },
    });
  }

  onDelete() {
    const { openedEventId } = this.state;
    axios.delete(`/api/events/${openedEventId}`).then(() => {
      this.fetchAndLoadEvents();
    });
    // Close modal
    this.setState({
      modalOpen: false,
    });
  }

  onDayClick(clickedDate) {
    // clicked date = midnight on day of in UTC
    // start = clicked date
    // end = start + 24 hours - 1 second
    const momentStart = moment(clickedDate.toDate());
    const momentEnd = moment(clickedDate.toDate())
      .add(24, 'hours')
      .add(-1, 'seconds');
    const newEvent = {
      title: 'New event',
      start: momentStart.toDate(),
      end: momentEnd.toDate(),
    };
    this.setState({
      newEvent,
      modalOpen: true,
    });
  }

  fetchAndLoadEvents() {
    return axios
      .get('/api/events')
      .then(({ data }) => {
        const newEvents = data.map(this.transformToFullcalendarEvent);
        this.setState({ events: newEvents });
      })
      .catch(error => {
        alert('Something went wrong! Check the console.');
        console.log(error);
      });
  }

  getDates(interval, daysOfWeek, startDate, endDate) {
    let dates = [];
    let currentDate = moment(startDate);
    let daysCounter = 0;

    while (currentDate <= moment(endDate)) {
      if (daysOfWeek.includes(currentDate.day())) {
        dates.push(moment(currentDate).toDate());
      }
      daysCounter += 1;
      if (daysCounter === 7 && interval > 1) {
        currentDate = moment(currentDate).add(interval - 1, 'weeks');
        daysCounter = 0;
      } else {
        currentDate = moment(currentDate).add(1, 'days');
      }
    }

    return dates;
  }

  handleRecurringEvents(recurringEventInfo, openedEventTitle) {
    const interval = recurringEventInfo.interval;
    const daysOfWeek = recurringEventInfo.daysOfWeek;
    const startDate = recurringEventInfo.startDate;
    const endDate = recurringEventInfo.endDate;

    const recurDates = this.getDates(interval, daysOfWeek, startDate, endDate);

    recurDates.forEach(date => {
      // apply same individual event process for each within the range
      const momentStart = moment(date);
      const momentEnd = moment(date)
        .add(24, 'hours')
        .add(-1, 'seconds');
      const recurringEvent = {
        title: openedEventTitle,
        start: momentStart.toDate(),
        end: momentEnd.toDate(),
      };

      axios
        .post('/api/events', recurringEvent)
        .then(({ data }) => {
          const { events } = this.state;
          events.push(this.transformToFullcalendarEvent(data));
          this.setState({ events });
          this.setState({ recurringEventInfo: {} });
        })
        .catch(error => {
          alert(
            'Something went wrong with recurring dates! Check the console.'
          );
          console.log(error);
        });
    });
  }

  componentDidMount() {
    this.fetchAndLoadEvents();
  }
  render() {
    const {
      events,
      modalOpen,
      openedEventTitle,
      newEvent,
      isRecurring,
    } = this.state;
    return (
      <div>
        <FullCalendar
          editable={true}
          timezone="UTC"
          events={events}
          eventDrop={this.onEventDrop}
          eventResize={this.onEventResize}
          eventClick={this.onEventClick}
          dayClick={this.onDayClick}
        />
        <Modal
          open={modalOpen}
          onClose={this.onCloseModal}
          onExited={this.onExitedModal}
          center
          closeIconSize={14}
          classNames={{ modal: 'event-modal', closeIcon: 'modal-close' }}
        >
          <h5>{newEvent ? 'New Event' : 'Edit Event'}</h5>
          <EventDetailsForm
            value={openedEventTitle}
            showDelete={!newEvent}
            isRecurring={isRecurring}
            onChange={this.onTitleChange}
            onDelete={this.onDelete}
            onCheckboxChange={this.onRecurCheckboxChange}
            onRecurIntervalChange={this.onRecurIntervalChange}
            onRecurDaysChange={this.onRecurDaysChange}
            onRecurStartChange={this.onRecurStartChange}
            onRecurEndChange={this.onRecurEndChange}
          />
        </Modal>
      </div>
    );
  }
}

export default hot(module)(App);
