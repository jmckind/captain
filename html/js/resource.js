//
// Resource Service and Controller
//

function ResourceManager($http) {
  this.API_URL = 'http://localhost:4778/v1/resources';

  this.list = function() {
    return $http.get(this.API_URL);
  };

  this.listTypes = function() {
    return [
      'Plain Text',
      'Markdown',
      'Link'
    ];
  };

  this.add = function(resource) {
    return $http.post(this.API_URL, resource);
  };

  this.get = function(id) {
    return $http.get(this.API_URL + '/' + id);
  };

  this.update = function(resource) {
    return $http.put(this.API_URL + '/' + resource.id, resource);
  };

  this.remove = function(id) {
    return $http.delete(this.API_URL + '/' + id);
  };
}

function ResourceController($scope, $sce, ResourceManager) {
  var ctrl = this;

  ctrl.resources = [];
  ctrl.resourceTypes = [];

  ctrl.updateResources = function() {
    ResourceManager.list()
      .then(function (response) {
        ctrl.resources = response.data.resources;
      }, function (error) {
        console.log('Unable to retrieve resources: ' + error.message);
      });

    ctrl.resourceTypes = ResourceManager.listTypes();
  };

  ctrl.renderSafeContent = function(resource) {
    var result = resource.content;
    if (resource.type.toLowerCase() === 'markdown') {
      result = markdown.toHTML(resource.content);
    } else if (resource.type.toLowerCase() === 'link') {
      result = '<a href="' + resource.content + '" target="_blank">' + resource.content + '</a>';
    } else if (resource.type.toLowerCase() === 'plain text') {
      result = '<pre><code>' + resource.content + '</code></pre>';
    }
    return $sce.trustAsHtml(result);
  };

  ctrl.preview = function(id) {
    ResourceManager.get(id)
      .then(function (response) {
        ctrl.detail = response.data.resource;
        ctrl.detail.content = ctrl.renderSafeContent(ctrl.detail);
        $('#detailModal').modal({});
      }, function (error) {
        console.log('Unable to retrieve resource: ' + error.message);
      });
  };

  ctrl.add = function() {
    ctrl.editResource = {
      name: '',
      content: '',
      type: 'Plain Text',
      active: true
    };

    $('#editModal').modal({
      keyboard: false
    });
  };

  ctrl.edit = function(id) {
    ResourceManager.get(id)
      .then(function (response) {
        ctrl.editResource = response.data.resource;
        $('#editModal').modal({
          keyboard: false
        });
      }, function (error) {
        console.log('Unable to retrieve resource: ' + error.message);
      });
  };

  ctrl.save = function() {
    if (ctrl.editResource.id !== undefined) {
      ResourceManager.update(ctrl.editResource)
        .then(function (response) {
          ctrl.updateResources();
          $('#editModal').modal('hide');
        }, function (error) {
          console.log('Unable to update resource: ' + error.message);
        });
    } else {
      ResourceManager.add(ctrl.editResource)
        .then(function (response) {
          ctrl.updateResources();
          $('#editModal').modal('hide');
        }, function (error) {
          console.log('Unable to add resource: ' + error.message);
        });
    }
  };

  ctrl.delete = function(id) {
    if (confirm('Are you sure?')) {
      ResourceManager.remove(id)
        .then(function (response) {
          ctrl.updateResources();
        }, function (error) {
          console.log('Unable to remove resource: ' + error.message);
        });
    }
  };
}

angular.module('captainApp').component('resourceController', {
  templateUrl: '../resource.html',
  controller: ResourceController
});

angular.module('captainApp').service('ResourceManager', ResourceManager);
