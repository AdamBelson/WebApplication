var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy;
	
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:8088/auth/google/return',
    realm: 'http://localhost:8088/'
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({ secret: 'SECRET' ,saveUninitialized: true,  resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  if(req.isAuthenticated()){
    res.redirect('/ginfo');
  } else{
	res.redirect('/glogin');
  }
});


app.get('/glogin', function(req, res){
  if(req.isAuthenticated()){
    res.redirect('/ginfo');
  } else{
    res.render('glogin', { user: req.user });
  }
});

app.get('/auth/google', 
  passport.authenticate('google'));
  
app.get('/auth/google/return', 
  passport.authenticate('google', { 
    successRedirect: '/ginfo', 
    failureRedirect: '/glogin' }));
	
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/glogin');
});

app.get('/ginfo', function(req, res){
  if(req.isAuthenticated()){
    res.render('ginfo', { user: req.user });
  } else {
    res.redirect('/glogin');
  }
});
app.listen(8088);