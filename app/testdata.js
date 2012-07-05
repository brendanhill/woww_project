// app/testdata.js

var TESTDATA = {}
var me = {uid: 1001, username: 'bhill', email: 'bhill@woww.com'};
var user1 = {uid: 0001, username: 'someone', email: 'fake@email.com'};
var user2 = {uid: 0002, username: 'nobody', email: 'noone@nowhere.com'};

TESTDATA.sample_users = [me, user1, user2];

TESTDATA.validateUser = function(username){
  var i;
  for(i=0; i<TESTDATA.sample_users.length; i++){
    if(TESTDATA.sample_users[i].username === username){
      return TESTDATA.sample_users[i].uid;
    }else{
      return false;
    }
  }
}

TESTDATA.getUserProfile = function(uid){
  var i;
  for(i=0; i<TESTDATA.sample_users.length; i++){
    if(TESTDATA.sample_users[i].uid === uid){
      return TESTDATA.sample_users[i];
    }
  }
}

var sample_expenses = [];
sample_expenses[0] = {eid: 001, title: 'Dinner', amount: 25.00, owner: 1001, users: [user1]};
sample_expenses[1] = {eid: 002, title: 'Gas', amount: 10.00, owner: 1001, users: [user1, user2]};
sample_expenses[2] = {eid: 003, title: 'Mattress', amount: 130.00, owner: 1001, users: []};
