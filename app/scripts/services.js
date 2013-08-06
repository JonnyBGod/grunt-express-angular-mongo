/* user Service */

define(['app'], function (app) {
    app.factory('user', ['$rootScope', function($rootScope) {
        return {
            auth: {
                id: USER.id,
            },

            logUser: function () {
                
            }
        };
    }]).run([
        'socket', 'user',
        function(socket, user) {
            socket.on('userData', function(data) {
                console.log(data);
            });
        }
    ]);
});