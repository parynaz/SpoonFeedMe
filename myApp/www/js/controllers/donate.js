angular.module('SpoonReadMe.controllers')

.controller('DonateCtrl', function($scope, PaypalService) {


$scope.buttonPay = function(){

var value1 = "_s-xclick";
var value2 = "ANHC628KKRFR8";


var pageContent = '<html><head></head><body><form id="loginForm" action="https://www.paypal.com/cgi-bin/webscr" method="post">' +
'<input type="hidden" name="cmd" value="' + value1 + '">' +
'<input type="hidden" name="hosted_button_id" value="' + value2 + '">' +
'</form> <script type="text/javascript">document.getElementById("loginForm").submit();</script></body></html>';
var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);

var browserRef = window.cordova.InAppBrowser.open(
    pageContentUrl ,
    "_blank",
    "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
);
};

});



