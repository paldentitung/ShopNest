const contactService = require("../services/contactService");

exports.readContact = async (req, res) => {
  try {
    const contacts = await contactService.readContact();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createContact = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = await contactService.markAsRead(id);

    res.status(200).json({ message: "Contact mark as read", updatedContact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contactToBeDelete = await contactService.deleteContact(id);

    res.status(200).json({ message: "Contact Deleted", contactToBeDelete });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
