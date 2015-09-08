PubNub.init({
    subscribe_key: 'pubnub subscribe key here',
    publish_key: 'pubnub publish key here',
    uuid:$scope.userId
});

PubNub.ngSubscribe({ channel: $scope.channel });

$rootScope.$on(PubNub.ngMsgEv($scope.channel), function(ngEvent, payload) {
    scope.$apply(function() {
        $scope.messages.push(payload.message);
    });
});

$rootScope.$on(PubNub.ngPrsEv($scope.channel), function(ngEvent, payload) {
    $scope.$apply(function() {
        $scope.users = PubNub.ngListPresence($scope.channel);
    });
});

PubNub.ngHereNow({
    channel: $scope.channel
});
PubNub.ngHistory({
    channel: $scope.channel,
    count: 500
});

$scope.publish = function() {
    PubNub.ngPublish({
        channel: $scope.channel,
        message: "[" + $scope.userId + "] " + $scope.newMessage
    });
    $scope.newMessage = '';
};