const Contact = require("../models/Contact");

exports.readContact = async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (!contacts) return res.status(400).json("contact not found");

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const newContact = await Contact.create({
      name,
      email,
      message,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });
    res
      .status(201)
      .json({ message: "Message sent successfully", data: newContact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
