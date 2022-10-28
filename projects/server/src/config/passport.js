const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



const GOOGLE_CLIENT_ID=process.env.GCLIENT_ID
const GOOGLE_CLIENT_SECRET=process.env.GCLIENT_SECRET

passport.use(new GoogleStrategy({
    clientID:GOOGLE_CLIENT_ID,
    clientSecret:GOOGLE_CLIENT_SECRET,
    callbackURL:'/api/user/google/signup'
}, async(accessToken,refreshToken, profile, done)=>{
    try {
        // console.log('profile from google',profile);
        return done(null, profile)

    } catch (error) {
        console.log(error)
    }
}));

passport.serializeUser((user,done)=>{
    // console.log('serializeUser',user)
    done(null,user)
})

passport.deserializeUser((obj,done)=>{
    // console.log('deserializeUser',obj)
    done(null,obj)
})