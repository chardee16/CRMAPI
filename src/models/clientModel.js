import db from '../../db.js'; // adjust path as needed
import { loadSQL } from '../utils/loadSQL.js';

// CREATE
export const createClient = async (client) => {

    const {
    FirstName,
    MiddleName,
    LastName,
    ClientAccountStatusID,
    BlockNo,
    LotNo,
    Occupants,
    IsSenior,
    SeniorCount,
    FullName,
    FullAddress,
    ClientStatusDesc,
    PreviousReading,
    LotArea,
    HouseTypeID
  } = client;

  const [result] = await db.query(`
    INSERT INTO tblclient (
      FirstName, MiddleName, LastName, ClientAccountStatusID,
      BlockNo, LotNo, Occupants, IsSenior,
      SeniorCount, PreviousReading, LotArea, HouseTypeID
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      FirstName, MiddleName, LastName, ClientAccountStatusID,
      BlockNo, LotNo, Occupants, IsSenior,
      SeniorCount, PreviousReading, LotArea, HouseTypeID
    ]
  );

  return result.insertId;

  
};

// READ ALL
const getAllClientsQuery = loadSQL('getAllClients.sql');

export const getAllClients = async () => {
  const [rows] = await db.query(getAllClientsQuery);
  return rows;
};


const getClientWithTypeQuery = loadSQL('getClientWithType.sql');

export const getWithTypeClients = async (status) => {
  const [rows] = await db.query(getClientWithTypeQuery, [status]);
  return rows;
};



// READ ONE
export const getClientById = async (id) => {
  const [rows] = await db.query('SELECT * FROM tblclient WHERE ClientID = ?', [id]);
  return rows[0];
};

// UPDATE
export const updateClient = async (clientId, updatedClient) => {
  const {
    FirstName,
    MiddleName,
    LastName,
    ClientAccountStatusID,
    BlockNo,
    LotNo,
    Occupants,
    IsSenior,
    SeniorCount,
    PreviousReading,
    LotArea,
    HouseTypeID
  } = updatedClient;

  const [result] = await db.query(`
    UPDATE tblclient SET
      FirstName = ?, MiddleName = ?, LastName = ?, ClientAccountStatusID = ?,
      BlockNo = ?, LotNo = ?, Occupants = ?, IsSenior = ?,
      SeniorCount = ?, PreviousReading = ?, LotArea = ?, HouseTypeID = ?
    WHERE ClientID = ?`,
    [
      FirstName, MiddleName, LastName, ClientAccountStatusID,
      BlockNo, LotNo, Occupants, IsSenior,
      SeniorCount, PreviousReading, LotArea, HouseTypeID, clientId
    ]
  );

  return result.affectedRows;
};

// DELETE
export const deleteClient = async (id) => {
  const [result] = await db.query('DELETE FROM tblclient WHERE ClientID = ?', [id]);
  return result.affectedRows;
};



// READ ALL House Type
export const getAllHouseType = async () => {
  const [rows] = await db.query('SELECT HouseTypeID,HouseTypeDesc FROM tblhousetype');
  return rows;
};