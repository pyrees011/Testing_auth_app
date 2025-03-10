const db = require("../database/db_setup");
const User = require("../models/UserModel");

const signup = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const user = await User.create({
            email,
            name,
            password,
        });
        return res.status(201).json({ user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            return res.status(200).json({ user });
        }
        return res.status(404).json({ message: "User not found" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const GetUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (user) {
            return res.status(200).json({ user });
        }
        return res.status(404).json({ message: "User not found" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (user) {
            return res.status(200).json({ message: "User deleted" });
        }
        return res.status(404).json({ message: "User not found" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}




module.exports = {
    signup,
    login,
    GetUserById,
    deleteUser,
}


// const signup = async (req, res) => {
//   const {
//     email,
//     name,
//     password,
//     dob,
//     isGetmoreMarked,
//     isConnectMarked,
//     isPersonalizedMarked,
//     profile_pic,
//   } = req.body;

//   if (!email || !name || !password) {
//     res.status(statusCodes.badRequest).json({ message: "Missing fields" });
//   } else {
//     const client = await pool.connect();

//     try {
//       const emailExists = await checkExisting(client, email, "email");
//       if (emailExists) {
//         return res.status(statusCodes.badRequest).json({
//           message: "Email already exists",
//         });
//       }

//       let username = makeUsername(name);
//       while (await checkExisting(client, username, "username")) {
//         logger.info("USERNAME ALREADY EXISTS", username);
//         username = makeUsername(name);
//       }

//       const queryParams = [
//         email,
//         name,
//         username,
//         password,
//         dob,
//         isGetmoreMarked,
//         isConnectMarked,
//         isPersonalizedMarked,
//         "default_profile_pic.jpg",
//       ];

//       const addUser = await client.query(
//         `INSERT INTO users(email,name, username, password,dob,isGetmoreMarked,isConnectMarked,isPersonalizedMarked,profile_pic)
//            VALUES ($1,$2,$3, crypt($4, gen_salt('bf')), $5, $6, $7, $8, $9);`,
//         queryParams
//       );
//       logger.info("USER ADDED", addUser.rowCount, "email", email);

//       //   Login the user
//       req.body.userInfo = email;
//       login(req, res);
//     } catch (error) {
//       logger.error("Adding user error:", error);
//       res.status(statusCodes.queryError).json({
//         message: "Exception occurred while registering",
//       });
//     } finally {
//       client.release();
//     }
//   }
// };

// const checkExistingUser = async (req, res) => {
//   if (!req.body.userInfo) {
//     return res
//       .status(statusCodes.badRequest)
//       .json({ message: "Missing fields" });
//   }
//   if (await checkExisting(pool, req.body.userInfo)) {
//     return res.status(statusCodes.success).json({ message: "User exists" });
//   }
//   return res
//     .status(statusCodes.success)
//     .json({ message: "User does not exist" });
// };

// const login = async (req, res) => {
//   const { userInfo, password, usingGoogle } = req.body;

//   // Check if the user is logging in with google
//   if (usingGoogle) {
//     const user = await pool.query("SELECT * FROM users WHERE email = $1;", [
//       userInfo,
//     ]);
//     if (!user.rowCount) {
//       return res
//         .status(statusCodes.notFound)
//         .json({ message: "User does not exist" });
//     }
//     req.session.user = {
//       email: user.rows[0].email,
//     };

//     const token = generateToken(user.rows[0])
//     const refreshToken = generateRefreshToken(user.rows[0])

//     return res
//       .status(statusCodes.success)
//       .json({ token: token,refresh:refreshToken, username: user.rows[0].username });
//   }

//   // Normal login
//   if (!userInfo || !password) {
//     return res
//       .status(statusCodes.badRequest)
//       .json({ message: "Missing fields" });
//   } else {
//     try {
//       const user = await pool.query(
//         "SELECT * FROM users WHERE (username = $1 OR email = $1) AND password = $2 ;",
//         [userInfo, password]
//       );
//       if (!user.rowCount) {
//         return res
//           .status(statusCodes.notFound)
//           .json({ message: "Incorrect credentials" });
//       }

//       req.session.user = {
//         email: user.rows[0].email,
//       };

//       const token = generateToken(user.rows[0])
//       const refreshToken = generateRefreshToken(user.rows[0])

//       return res
//         .status(statusCodes.success)
//         .json({ token: token, refresh: refreshToken, username: user.rows[0].username });
//     } catch (error) {
//       logger.error(error);
//       return res
//         .status(statusCodes.queryError)
//         .json({ error: "Exception occurred while logging in" });
//     }
//   }
// };

// const logout = (req, res) => {
//   if (req.session.user) {
//     delete req.session.user;
//   }
//   return res.status(200).json({ message: "Disconnected" });
// };

// const sendOTP = async (req, res) => {
//   const email = req.body.email;
//   const otp = generateOTP();
//   const subject = "OTP for verification";
//   const text = `Your OTP is ${otp}`;
//   const mailSent = await sendEmail(email, subject, text);
//   if (mailSent) {
//     return res
//       .status(statusCodes.success)
//       .json({ message: "OTP sent", otp: otp });
//   } else {
//     return res
//       .status(statusCodes.queryError)
//       .json({ message: "Error while sending OTP" });
//   }
// };

// const changePassword = async (req, res) => {
//   const { email, newPassword } = req.body;
//   const client = await pool.connect();
//   try {
//     const user = await client.query(
//       "UPDATE users SET password = crypt($1, gen_salt('bf')) WHERE email = $2;",
//       [newPassword, email]
//     );
//     if (user.rowCount) {
//       return res
//         .status(statusCodes.success)
//         .json({ message: "Password changed" });
//     }
//     return res.status(statusCodes.notFound).json({ message: "User not found" });
//   } catch (error) {
//     logger.error(error);
//     return res
//       .status(statusCodes.queryError)
//       .json({ message: "Error while changing password" });
//   } finally {
//     client.release();
//   }
// };

// const userPreferences = async (req, res) => {
//   console.log(req.body, "req.file");
//   const {
//     userId,
//     selectedTopics,
//     selectedCategories,
//     selectedLanguages,
//     userName,
//     profile_pic,
//   } = req.body;

//   const client = await pool.connect();
//   try {
//     const user = await client.query(
//       "UPDATE users SET selectedTopics = $1, selectedCategories = $2, selectedLanguages = $3, username = $4, profile_pic = $5 WHERE id = $6;",
//       [
//         selectedTopics,
//         selectedCategories,
//         selectedLanguages,
//         userName,
//         profile_pic || "default_profile_pic.jpg",
//         userId,
//       ]
//     );
//     if (user.rowCount) {
//       return res
//         .status(statusCodes.success)
//         .json({ message: "Preferences updated" });
//     }
//     return res.status(statusCodes.notFound).json({ message: "User not found" });
//   } catch (error) {
//     logger.error(error);
//     return res
//       .status(statusCodes.queryError)
//       .json({ message: "Error while updating preferences" });
//   } finally {
//     client.release();
//   }
// };

// module.exports = {
//   signup,
//   login,
//   logout,
//   checkExistingUser,
//   sendOTP,
//   changePassword,
//   userPreferences,
// };
