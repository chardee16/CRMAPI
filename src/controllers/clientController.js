import {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient
  } from '../models/clientModel.js';

// CREATE
export const createClientController = async (req, res) => {
  try {
    const clientId = await createClient(req.body);
    res.status(201).json({ message: 'Client created', ClientID: clientId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
export const getAllClientsController = async (req, res) => {
  try {
    const clients = await getAllClients();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log('request error');
  }
};

// READ ONE
export const getClientByIdController = async (req, res) => {
  try {
    const client = await getClientById(req.params.clientId);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateClientController = async (req, res) => {
  try {
    const affectedRows = await updateClient(req.params.id, req.body);
    if (!affectedRows) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json({ message: 'Client updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteClientController = async (req, res) => {
  try {
    const affectedRows = await deleteClient(req.params.id);
    if (!affectedRows) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
