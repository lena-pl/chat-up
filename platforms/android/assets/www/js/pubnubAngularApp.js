PubNub.init({
    subscribe_key: 'sub-c-a45e89d0-5683-11e5-81b5-02ee2ddab7fe',
    publish_key: 'pub-c-2d7fcefe-0650-43eb-a861-e13418949bb1',
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