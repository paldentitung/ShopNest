const Contact = require("../models/Contact");

exports.readContact = async () => {
  const contacts = await Contact.find();

  if (!contacts) {
    const error = new Error("contact not found");
    error.statusCode = 404;
    throw error;
  }

  return contacts;
};
exports.createContact = async (name, email, message, ipAddress, userAgent) => {
  if (!name || !email || !message) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    const error = new Error("Invalid email format");
    error.statusCode = 400;
    throw error;
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
  const contact = await Contact.findById(id);

  if (!contact) {
    const error = new Error("Contact not found");
    error.statusCode = 404;
    throw error;
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { status: "read" },
    { new: true },
  );

  return updatedContact;
};

exports.deleteContact = async (id) => {
  const contact = await Contact.findById(id);

  if (!contact) {
    const error = new Error("Contact not found");
    error.statusCode = 404;
    throw error;
  }

  const contactToBeDelete = await Contact.findByIdAndDelete(id);

  return contactToBeDelete;
};
