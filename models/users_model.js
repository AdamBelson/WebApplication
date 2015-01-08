var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
	
var UserSchema = new Schema({
	username: {type: String, unique: true},
	email: String,
	color: String,
	hashed_password: String
});

mongoose.model('User', UserSchema);
/*
var MeterUsageSchema = new Schema({
	meterid: int,
	metername: String,
	siteid: int,
	sitename: String,
	companyid: int,
	companyname: String,
	usage: [DailyUsageSchema]});
	
var DailyUsageSchema = new Schema({
	usagedate: Date,
	usagedata: [DataUsageSchema]
});

var DataUsageSchema = new Schema ({
	usagetime: int,
	usagevalue: float
});

mongoose.model('MeterUsage', MeterUsageSchema);
mongoose.model('DailyUsage', DailyUsageSchema);
mongoose.model('DataUsage', DataUsageSchema);
*/