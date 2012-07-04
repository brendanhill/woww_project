// app/testdata.js

var me = {uid: 1001};
var user1 = {uid: 0001};
var user2 = {uid: 0002};

var sample_users = [me, user1, user2];

var sample_expenses = [];
sample_expenses[0] = {eid: 001, title: 'Dinner', amount: 25.00, owner: 1001, users: [user1]};
sample_expenses[1] = {eid: 002, title: 'Gas', amount: 10.00, owner: 1001, users: [user1, user2]};
sample_expenses[2] = {eid: 003, title: 'Mattress', amount: 130.00, owner: 1001, users: []};
