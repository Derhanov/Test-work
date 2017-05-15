// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('starter', ['ionic', 'ngCordova']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('MyController', function($scope, $ionicModal, $cordovaCamera, $cordovaVibration) {

    $ionicModal.fromTemplateUrl('templates/modal-template.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    var onBatteryClick = function(){
        $scope.title = "It's a battery title";
        $scope.body = "It's a battery body";
    };
    var onVibroClick = function(){
        $scope.title = "Vibration";
        $scope.body = "It's a vibration body";
        $cordovaVibration.vibrate(3000);
    };

    var onCameraClick = function(){
        $scope.title = "It's a camera title";
        $scope.body = "It's a camera body";

    };

    $scope.takePicture = function () {
        var options = {
            quality: 80,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true,
            correctOrientation: true
        };


        $cordovaCamera.getPicture(options).then(function (imageData) {
            // var image = document.getElementById('myImage');
            $scope.ImgUrl = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            console.log('Error')
        });
    };

    var bindings = {'battery': onBatteryClick, 'camera': onCameraClick, 'vibro': onVibroClick };

    $scope.openModal = function(type) {
        bindings[type]();
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
});

app.controller("BatCtrl", function($scope, $rootScope, $ionicPlatform, $cordovaBatteryStatus) {
    $ionicPlatform.ready(function() {
        $rootScope.$on("$cordovaBatteryStatus:status", function(event, args) {
            if(args.isPlugged) {
                alert("Charging -> " + args.level + "%");
            } else {
                alert("Battery -> " + args.level + "%");
            }
        });
    });
});

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);
// Cordova is ready
function onDeviceReady() {
    var element = document.getElementById('deviceProperties');
    var btnDev = document.querySelector('.device');
    var pInfo = document.querySelector('.deviceProperties');
    btnDev.addEventListener("click", function () {
        event.preventDefault();
        pInfo.classList.toggle("deviceProperties_show");
    });
    element.innerHTML =
        'Device Cordova: '  + device.cordova  + '<br />' +
        'Device Platform: ' + device.platform + '<br />' +
        'Device UUID: '     + device.uuid     + '<br />' +
        'Device Version: '  + device.version  + '<br />' +
        'Device Manufactured: ' + device.manufacturer + '<br />';
}

