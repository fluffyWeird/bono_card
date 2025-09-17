// controllers/userController.js
import User from "../models/User.js"; // your MongoDB model

// Handle ID input (from /input-id form or QR scan)
export const checkUser = async (req, res) => {
  try {
    const { schoolId } = req.body; // or req.query
    const user = await User.findOne({ schoolId });

    if (user) {
      // Return user data as JSON
      return res.json({
        success: true,
        message: "User found",
        data: {
          schoolId: user.schoolId,
          phoneNumber: user.phoneNumber,
          photo: user.photo,
          telegramId: user.telegramId,
          isRegistered: user.isRegistered,
        },
      });
    } else {
      // Return JSON indicating user not found
      console.log({
        success: false,
        message: "User not found",
        schoolId,
      });
      return res.redirect(`/register/${schoolId}`);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
// Show registration form (optional if you serve HTML)
export const showRegistrationForm = (req, res) => {
  const { schoolId } = req.query;
  // Render your HTML form or send JSON
  res.render("register", { schoolId });
};

// Handle registration form submission
export const registerUser = async (req, res) => {
  try {
    const { schoolId, phoneNumber } = req.body;
    const idPhoto = req.file ? req.file.filename : null; // if using multer for photo upload

    // Create new user in MongoDB
    const newUser = new User({
      schoolId,
      phoneNumber,
      idPhoto,
    });

    await newUser.save();

    // Redirect to success page
    res.redirect("/success");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      data: {
        schoolId: user.schoolId,
        phoneNumber: user.phoneNumber,
        photo: user.photo,
        telegramId: user.telegramId,
        isRegistered: user.isRegistered,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getAllUser = async (req, res) => {
  let users = await User.find();
  res.status(200).send(users);
};
