import User from "../models/User.js";

// Handle ID input from /home
export const checkUser = async (req, res) => {
  try {
    const { faydaFAN, schoolId, phoneNumber } = req.body;

    // Single query to check all three identifiers depending on which is inputted by the security guard we can find it

    const user = await User.findOne({
      $or: [
        { schoolId: schoolId || null },
        { phoneNumber: phoneNumber || null },
        { faydaFAN: faydaFAN || null },
      ],
    });
    //if User exists fine if not we will register them by redirecting the url with the ID
    if (user) {
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
      // Redirect to register based on whichever identifier exists
      if (schoolId) return res.redirect(`/register/${schoolId}`);
      if (phoneNumber) return res.redirect(`/register/${phoneNumber}`);
      if (faydaFAN) return res.redirect(`/register/${faydaFAN}`);
      return res.redirect(`/register`);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
// Handle registration form submission
export const registerUser = async (req, res) => {
  try {
    const { schoolId, phoneNumber, faydaFAN } = req.body;
    const idPhoto = req.file ? req.file.filename : null; // if using multer for photo upload

    // Create new user in MongoDB
    const newUser = new User({
      schoolId,
      phoneNumber,
      faydaFAN,
      photo: idPhoto, // keep naming consistent
      isRegistered: false, // default until Telegram login or admin marks it
      role: "student", // default role
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
    const { telegramId } = req.params;
    const user = await User.findById(telegramId);
    const users = await User.find();

    if (!user) {
      return res.status(404).json({ success: false, message: users });
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
    return res.status(500).json({ success: false, message: err });
  }
};
export const updatePhoneNumber = async (req, res) => {};
export const getAllUser = async (req, res) => {
  let users = await User.find();
  res.status(200).send(users);
};
