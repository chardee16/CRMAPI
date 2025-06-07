// controllers/contactController.js
import contactModel from '../models/contactModel.js';

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addNewContact = async (req, res) => {
  try {
    const { clientid, email, phone } = req.body;
    const insertId = await contactModel.addContact({ clientid, email, phone });
    res.status(201).json({ message: 'Contact added', id: insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const { clientid, email, phone } = req.body;
    await contactModel.updateContact(contactId, { clientid, email, phone });
    res.status(200).json({ message: 'Contact updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    await contactModel.deleteContact(contactId);
    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};