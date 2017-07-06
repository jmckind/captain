//
// Attendee Service and Controller
//

function AttendeeManager($http) {
  this.API_URL = 'http://localhost:4778/v1/attendees';

  this.list = function() {
    return $http.get(this.API_URL);
  };

  this.add = function(attendee) {
    return $http.post(this.API_URL, attendee);
  };

  this.get = function(id) {
    return $http.get(this.API_URL + '/' + id);
  };

  this.update = function(attendee) {
    return $http.put(this.API_URL + '/' + attendee.id, attendee);
  };

  this.remove = function(id) {
    return $http.delete(this.API_URL + '/' + id);
  };
}

function AttendeeController($scope, AttendeeManager) {
  var ctrl = this;

  ctrl.attendees = [];

  ctrl.updateAttendees = function() {
    AttendeeManager.list()
      .then(function (response) {
        ctrl.attendees = response.data.attendees;
      }, function (error) {
        console.log('Unable to retrieve attendees: ' + error.message);
      });
  };

  ctrl.preview = function(id) {
    AttendeeManager.get(id)
      .then(function (response) {
        ctrl.detail = response.data.attendee;
        $('#detailModal').modal({});
      }, function (error) {
        console.log('Unable to retrieve attendee: ' + error.message);
      });
  };

  ctrl.add = function() {
    ctrl.editAttendee = {
      first_name: '',
      last_name: '',
      email_address: ''
    };

    $('#editModal').modal({
      keyboard: false
    });
  };

  ctrl.edit = function(id) {
    AttendeeManager.get(id)
      .then(function (response) {
        ctrl.editAttendee = response.data.attendee;
        $('#editModal').modal({
          keyboard: false
        });
      }, function (error) {
        console.log('Unable to retrieve attendee: ' + error.message);
      });
  };

  ctrl.save = function() {
    if (ctrl.editAttendee.id !== undefined) {
      AttendeeManager.update(ctrl.editAttendee)
        .then(function (response) {
          ctrl.updateAttendees();
          $('#editModal').modal('hide');
        }, function (error) {
          console.log('Unable to update attendee: ' + error.message);
        });
    } else {
      AttendeeManager.add(ctrl.editAttendee)
        .then(function (response) {
          ctrl.updateAttendees();
          $('#editModal').modal('hide');
        }, function (error) {
          console.log('Unable to add attendee: ' + error.message);
        });
    }
  };

  ctrl.delete = function(id) {
    if (confirm('Are you sure?')) {
      AttendeeManager.remove(id)
        .then(function (response) {
          ctrl.updateAttendees();
        }, function (error) {
          console.log('Unable to remove attendee: ' + error.message);
        });
    }
  };
}

angular.module('captainApp').component('attendeeController', {
  templateUrl: '../attendee.html',
  controller: AttendeeController
});

angular.module('captainApp').service('AttendeeManager', AttendeeManager);
