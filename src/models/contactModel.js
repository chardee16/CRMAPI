// contactModel.js
import db from '../../db.js';

const contactModel = {
  async getAllContacts() {
    const [rows] = await db.query('SELECT * FROM contacts');
    return rows;
  },

  async addContact(contactData) {
    const { clientid, email, phone } = contactData;
    // If clientid might be sent as string, you can convert to number if needed:
    const clientIdNum = typeof clientid === 'string' ? parseInt(clientid, 10) : clientid;

    const [result] = await db.query(
      'INSERT INTO contacts (clientid, email, phone) VALUES (?, ?, ?)',
      [clientIdNum, email, phone]
    );
    return result.insertId;
  },

  async updateContact(contactId, contactData) {
    const { clientid, email, phone } = contactData;
    const [result] = await db.query(
      'UPDATE contacts SET clientid = ?, email = ?, phone = ? WHERE id = ?',
      [clientid, email, phone, contactId]
    );
    return result;
  },

  async deleteContact(contactId) {
    const [result] = await db.query('DELETE FROM contacts WHERE id = ?', [contactId]);
    return result;
  },
};

export default contactModel;