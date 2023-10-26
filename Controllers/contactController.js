const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");

//@des Get all Contacts
//@route  GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id:req.user.id});
  res.status(200).json(contacts);
});

//@des Create New Contacts
//@route  POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  } else {
    const contact = await Contact.create({ name, email, phone,user_id:req.user.id });
    console.log("the request object is :", req.body);
    res.status(201).json({ msg: "Contact Created with content :", contact });
  }
});

//@des Get Contact By Id
//@route  GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`Contact Not Found With ID: ${req.params.id}`);
  }
  res.status(200).json({ msg: `Get Contact for id ${req.params.id}:`, contact });
});



//@des Update Contact
//@route  PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`Contact Not Found With ID: ${req.params.id}`);
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You Don't have permission to make changes in others contacts")
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ msg: `Update Contact for id: ${req.params.id}`, updatedContact });
});

//@des Remove Contact
//@route  DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
       throw new Error(`Contact Not Found With ID: ${req.params.id}`);
  }
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error(
        "You Don't have permission to make changes in others contacts"
      );
    }
    await Contact.findOneAndDelete(req.params.id);
    res.status(200).json({ msg: `Deleted Contact with id ${req.params.id}`,contact : await Contact.find() });
});
// const deleteContact = async (req, res, next) => {
//   try {
//     const contact = await Contact.findById(req.params.id);
//     if (!contact) {
//       res.status(404).json({ msg: `Contact Not Found With ID: ${req.params.id}` });
//     } else {
//       await Contact.findByIdAndRemove(req.params.id);
//       const contacts = await Contact.find();
//       res.status(200).json({ msg: `Deleted Contact with ID ${req.params.id}`, allContacts: contacts });
//     }
//   } catch (error) {
//     next(error); // Pass the error to the next middleware or error handler
//   }
// };

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
