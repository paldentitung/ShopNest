const contactService = require("../services/contactService");

exports.readContact = async (req, res) => {
  const contacts = await contactService.readContact();
  res.status(200).json(contacts);
};

exports.createContact = async (req, res) => {
  const { name, email, message } = req.body;

  const newContact = await contactService.createContact(
    name,
    email,
    message,
    req.ip,
    req.headers,
  );
  res
    .status(201)
    .json({ message: "Message sent successfully", data: newContact });
};

exports.markAsRead = async (req, res) => {
  const { id } = req.params;
  const updatedContact = await contactService.markAsRead(id);

  res.status(200).json({ message: "Contact mark as read", updatedContact });
};
exports.deleteContact = async (req, res) => {
  const { id } = req.params;

  const contactToBeDelete = await contactService.deleteContact(id);

  res.status(200).json({ message: "Contact Deleted", contactToBeDelete });
};
