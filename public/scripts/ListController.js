angular.module('groceryApp', []);

angular.module('groceryApp').controller('ListController', ['$http', function($http) {

    var vm = this;


//Retrieve Full List
    function getList() {
        $http.get('/list/getList').then(function(res) {
            vm.fullList = res.data;
            console.log('This is the full list:', res);
        })
    }


//Add New Items
    vm.addNewItem = function(item, amount) {

        var sendData = {};

        sendData.name = item;
        sendData.qty = amount;

        $http.post('/list/addToList', sendData).then(handlePostSuccess, handleFailure)
    }

    function handlePostSuccess(res) {
        console.log(res);
        getList();
    }

    function handleFailure(res) {
        console.log('Post failed: ', res);
    }


//Update Items
    vm.updateItem = function(id, name, qty){
      console.log(id, name, qty);

      var sendData = {};

      sendData._id = id;
      sendData.name = name;
      sendData.qty = qty;

      $http.put('/list/updateList', sendData).then(handleUpdateSuccess, handleUpdateFailure);
    }

    function handleUpdateSuccess(res){
      console.log('Post success!', res);
      getList();
    }

    function handleUpdateFailure(res){
      console.log('Update failure.', res);
    }


//Remove Items
    vm.removeItem = function(id){
      console.log('clicked!!!!');
      $http.delete('/list/removeFromList/' + id).then(function(res) {
        console.log(res);
        getList();
      })
    }

    getList();

}])
