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

TESTDATA.sample_expenses = [];
TESTDATA.sample_expenses[0] = {eid: 001, title: 'Dinner', amount: 25.00, owner: 1001, users: [1001, 0001]};
TESTDATA.sample_expenses[1] = {eid: 002, title: 'Gas', amount: 10.00, owner: 1001, users: [1001, 0001, 0002]};
TESTDATA.sample_expenses[2] = {eid: 003, title: 'Mattress', amount: 130.00, owner: 1001, users: [0001]};


TESTDATA.contributions = [];
TESTDATA.contributions[0] = {eid: 001, owner: 1001, amount: 7.00, date: new Date()};


TESTDATA.getUserExpenses = function(uid){
  var i = 0,
      j = 0,
      ret = [];

  for (i; i < TESTDATA.sample_expenses.length; i += 1) {
    for (j; j < TESTDATA.sample_expenses[i].users.length; j += 1) {
      if (TESTDATA.sample_expenses[i].users[j] === uid) {
        ret[i] = TESTDATA.sample_expenses[i];
        break;
      }
    }
  }
  return ret;
}

TESTDATA.getSharedUsersByEid = function (eid) {
  var i = 0
      ret = [];

  for (i; i < TESTDATA.sample_expenses.length; i += 1) {
    if (TESTDATA.sample_expenses[i].eid === eid) {
      ret = TESTDATA.sample_expenses[i].users;
    }
  }
  return ret
}

TESTDATA.getContributionsByEid = function (eid) {
  var i = 0
      ret = [];

  for (i; i < TESTDATA.contributions.length; i += 1) {
    if (TESTDATA.contributions[i].eid === eid) {
      ret[i] = TESTDATA.contributions[i];
    }
  }
  return ret
}