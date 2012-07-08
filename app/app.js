// app/app.js


// application    
var WOWW = Ember.Application.create({});

// models
WOWW.User = Ember.Object.extend({
	uid: null,     // int
	username: '',  // string
	email: "",     //string

	// auto populate the rest of the user data once the uid has been set
	uid_update: function () {
		// and yet another ajax request
		var my_info = TESTDATA.getUserProfile(this.get('uid'));
		this.set('username', my_info.username);
		this.set('email', my_info.email);
	}.observes('uid')
});

// @todo this will be removed soon
WOWW.UserProfile = Ember.Object.extend({
	uid: null,      // int
	email: null,    // string
	username: null, // string
	//password: null, // string
	//avatar: null,   // string
	//key: null,       // string
	
	//init: function(){
	  //console.log(this.get('username'));
	//}
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
	users: Ember.ArrayController.create(),
	contributions: Ember.ArrayController.create(),

	loadMyUsers: function () {
		var i = 0,
			shared_users = null;

		this.users.set('content', []);
		shared_users = TESTDATA.getSharedUsersByEid(this.get('eid'));
		for (i; i < shared_users.length; i +=1) {
			if (Object.prototype.toString.call(shared_users) === '[object Array]') { // lets not assemble an empty object
				if (shared_users[i] !== this.get('owner').get('uid')) { // leave the owner out
					var user = WOWW.User.create();
					user.set('uid', shared_users[i]);
					this.users.pushObject(user);
				}
			}
		}
	},

	loadMyContributions: function () {
		var i = 0
			contribs = null;

		this.contributions.set('content', []);
		contribs = TESTDATA.getContributionsByEid(this.get('eid'));
		for (i; i < contribs.length; i +=1) {
			if (typeof(contribs[i]) === 'object') { // lets not assemble an empty object
				this.contributions.pushObject(WOWW.Contribution.create(contribs[i]));
			}
		}
	}
});

// controllers
WOWW.ExpenseController = Ember.ArrayProxy.extend({
	// @todo  add user function() to expense
	// @todo  add update function
	// @todo  list contributions with users
});

WOWW.Users = Ember.ArrayProxy.extend({});

WOWW.MainApplicationController = Ember.ArrayController.create({
	uid: null,
	my_username: null,
	my_profile: null,
	my_expenses: [],

	init: function () {
		//console.log('main app controller');
		this.checkValidUser();	
	},

	checkValidUser: function () {
		var uid = false;
		// @todo remove this
		this.set('username', 'bhill');

		// create a user data object that has just enough stuff to display
		// @todo will be an ajax request
		uid = TESTDATA.validateUser(this.get('username'));

		if (uid) {
	  		this.set('uid', uid);
	  		this.setProfile();
		}
	},
  
	setProfile: function () {
		// @todo another ajax request
		var data = TESTDATA.getUserProfile(this.get('uid'));
		this.set('my_profile', WOWW.UserProfile.create(data));

		this.loadMyExpenses();
	},

	loadMyExpenses: function () {
			// @todo another ajax request
			var data = TESTDATA.getUserExpenses(this.get('uid')),
				i = 0;

		for (i; i < data.length; i +=1) {
			var expense = WOWW.Expense.create({}),
				owner = WOWW.User.create();

			owner.set('uid', data[i].owner);

			expense.set('owner', owner);
			expense.set('eid', data[i].eid);
			expense.set('title', data[i].title);
			expense.set('total_val', data[i].amount);
			expense.set('createdate', new Date());  // @todo make real dates

			expense.loadMyUsers();

			expense.loadMyContributions();

			this.get('my_expenses').pushObject(expense);
		}
		//console.log(this.get('my_expenses'));
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
  templateName: 'user_profile_template'
});

WOWW.MainControllerView = Ember.View.extend({
	loadExpensesBinding: 'WOW.MainController.loadExpenses'
});

WOWW.AllExpensesView = Ember.View.extend({
	contentBinding: 'WOWW.MainApplicationController.my_expenses'
});

WOWW.ExpenseView = Ember.View.extend({
	// @todo each expense will have click options to view details
	templateName: 'expense_template',

	amount_display: Ember.computed(function () {
		//console.log(this.get('content'));
	  	return '$' + this.get('content').total_val + '.00';
	}).property('total_val')
});