var angular = require('angular');
require('angular-google-analytics');

var app = angular.module('issuetrack', [
  'angular-google-analytics'
]);

// Set analytics account
app.config([ 'AnalyticsProvider', function(AnalyticsProvider) {
  'use strict';
  AnalyticsProvider.setAccount('UA-66903454-1');
}]);

app.controller('SignupController', [ 'Analytics', function(Analytics) {
  'use strict';

  this.submitted = false;

  this.submit = function() {
    Analytics.trackEvent('Landing', 'Signup', this.email);
    this.submitted = true;
  };

}]);
