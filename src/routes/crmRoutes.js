import verifyToken from '../middleware/authMiddleware.js';
import {
  getAllContacts,
  addNewContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';

const routes = (app) => {
  app.route('/contact')
    .get(getAllContacts)
    .post(addNewContact);

  app.route('/contact/:contactId')
    .put(updateContact)
    .delete(deleteContact);
};

export default routes;