// app/app.js


// application    
var WOWW = Ember.Application.create({
	//rootElement: $('woww_app')
});

// models
WOWW.User = Ember.Object.extend({
	uid: null,     // int
});

WOWW.UserProfile = Ember.Object.extend({
	uid: null,      // int
	email: null,    // string
	username: null, // string
	//password: null, // string
	//avatar: null,   // string
	//key: null,       // string
	
	init: function(){
	  console.log(this.get('username'));
	}
});

WOWW.Contribution = Ember.Object.extend({
	cid: null,   // int
	uid: null,   // int
	amount: null // float
});

WOWW.Expense = Ember.Object.extend({
	eid: null,          // int
	title: null,        // string
	total_val: null,    // float
	owner: null,        // int uid
	createdate: null,   // date
	users: null,        // array[] User objects
	contributions: null // array[] Contribution objects
});

// controllers
WOWW.ExpenseController = Ember.ArrayProxy.extend({
	// @todo  add user function() to expense
	// @todo  add update function
	// @todo  list contributions with users
});

WOWW.Users = Ember.ArrayProxy.extend({

});

WOWW.MainApplicationController = Ember.ArrayController.create({
  uid: null,
  username: null,
  my_profile: null,

  init: function(){
    //console.log('main app controller');
    this.checkValidUser();
  },
  checkValidUser: function(){
    var uid = false;
    // @todo remove this
    this.set('username', 'bhill');
    
    // create a user data object that has just enough stuff to display
    // @todo will be an ajax request
    uid = TESTDATA.validateUser(this.get('username'));
    
    if(uid){
      this.set('uid', uid);
      this.setProfile();
    }
  },
  
  setProfile: function(){
    // @todo another ajax request
    var data = TESTDATA.getUserProfile(this.get('uid'));
    this.set('my_profile', WOWW.UserProfile.create(data));
  }
});

WOWW.MainController = Ember.ArrayController.create({
	content: [], // array[] Expenses
	uid: null,   // int

	loadExpenses: function(){
		// do the ajax request here based on the uid
		//console.log(this.get('uid'));
		var data = sample_expenses;
		//on success do this
		this.onSuccessLoadExpenses(data);
		// on failure do this
	},

	onSuccessLoadExpenses: function(data){
		var self = this; // needed here in forEach
		//console.log(data);
		this.set('content', []);
		data.forEach(function(item){
			//console.log(item);
			var i;
			var users = [];
			var expense = WOWW.Expense.create({});
				expense.set('eid', item.eid);
				expense.set('title', item.title);
				expense.set('total_val', item.amount);
				expense.set('owner', item.owner); 		// @todo make User object
				expense.set('createdate', new Date());  // @todo make real dates
				//console.log(item);
				for(i=0; i<item.users.length; i++){
					var user = WOWW.User.create();
						user.set('uid', item.users[i].uid);
					users[i] = user;
				}
				expense.set('users', users);               
 				expense.set('contributions', []);       // @todo make Contribution objects
			
			//console.log(expense);
			self.pushObject(expense);
		});
		//console.log(this.get('content'));
	}
});

// views
WOWW.MainApplicationView = Ember.View.extend({
  templateName: 'main_application_template'
});

WOWW.LoggedInUserView = Ember.View.extend({
  contentBinding: 'WOWW.MainApplicationController.checkValidUser',
});

WOWW.UserProfileView = Ember.View.extend({
  contentBinding: 'WOWW.MainApplicationController.my_profile',
  templateName: 'user_profile_template',
  
  //username: function(){
    //return this.get('username');
  //}.property('username'),
  
  init: function(){
    console.log(this);
  }
});

WOWW.MainControllerView = Ember.View.extend({
	loadExpensesBinding: 'WOW.MainController.loadExpenses'
});

WOWW.ExpenseView = Ember.View.extend({
	init: function(){
		//console.log(this);
		//console.log(this.get('content'));
	},
	
	amount_display: Ember.computed(function(){
	  return this.get('total_val') + '.00';
	}).property('total_val')
});

//APP LOGIC!

// this will need to be moved into some kind of login
(function() {
	//WOWW.MainController.set('uid', 1001);
	//WOWW.MainController.loadExpenses();
	//WOWW.MainApplicationView.create().append();
	//console.log('loaded...');
}());






