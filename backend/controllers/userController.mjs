import User from '../models/userSchema.mjs';
import passport from "passport";

// Register User
const registerUser = async (req, res) => {
    try {
        const newUser = new User({ username: req.body.username, email: req.body.email });

        User.register(newUser, req.body.password, async (err, user) => {
            if (err) {
                throw err;
            } else {
                res.status(201).json({ success: true, message: 'Registration successful.' });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: 'An error occurred while registering your account. Error: ' + err });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        } else {
            passport.authenticate("local", {failureRedirect: "/login", successRedirect: "/map"} , function (err, user) {
            if (err) {
                throw err;
            } else {
                if (!user) {
                    res.status(401).json({ success: false, message: "Username or password incorrect." });
                } else {
                    res.status(201).json({ success: true, message: "Login successful." });
                    // const token = jwt.sign({ userId: user._id, username: user.username }, secretkey, { expiresIn: "24h" });
                    // res.status(201).json({ success: true, message: "Login successful.", token: token });
                }
            }
        }) (req, res);
        }
    } catch (err) {
        res.json({success: false, message: err}) 
    }
};

/* 
const loginUser = (req, res) => { 
    if(!req.body.username || !req.body.password){ 
        res.status(401).json({ error: 'Invalid username or password.' });
    } else { 
        passport.authenticate('local', function (err, user) { 
            if(err){ 
                res.json({success: false, message: err}) 
            } else if (!user) { 
                res.json({success: false, message: 'Username or password incorrect'}) 
            } else { 
                req.login(user, function(err) { 
                    if (err) { 
                        res.json({success: false, message: err}) 
                    } else { 
                        res.json({success:true, message:"Authentication successful"}); 
                    } 
                }) 
            }  
        })(req, res); 
    } 
}; 
*/

// Logout a user
const logoutUser = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                throw err;
            }
        });
        res.json({ message: 'Logout successful.' });
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ success: false, error: 'An error occurred while logging out. Error: ' + err });
    }
};

// Export the controller functions
export default {
    registerUser,
    loginUser,
    logoutUser,
};