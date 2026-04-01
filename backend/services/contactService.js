const Contact = require("../models/Contact");
const AppError = require("../utils/AppError");

exports.readContact = async () => {
  const contacts = await Contact.find();

  if (!contacts) {
    throw new AppError("Contact not found", 404);
  }

  return contacts;
};
exports.createContact = async (name, email, message, ipAddress, userAgent) => {
  if (!name || !email || !message) {
    throw new AppError("All fields are required", 400);
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    throw new AppError("Invalid email format", 400);
  }
  const newContact = await Contact.create({
    name,
    email,
    message,
    ipAddress,
    userAgent: userAgent["user-agent"],
  });

  return newContact;
};

exports.markAsRead = async (id) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { status: "read" },
    { new: true },
  );
  if (!updatedContact) {
    throw new AppError("Contact not found", 404);
  }

  return updatedContact;
};

exports.deleteContact = async (id) => {
  const contactToBeDelete = await Contact.findByIdAndDelete(id);

  if (!contactToBeDelete) {
    throw new AppError("Contact not found", 404);
  }

  return contactToBeDelete;
};
