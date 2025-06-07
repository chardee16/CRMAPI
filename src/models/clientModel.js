import db from '../../db.js'; // adjust path as needed

// CREATE
export const createClient = async (client) => {
  const {
    FirstName,
    MiddleName,
    LastName,
    AccountStatusID,
    BlockNo,
    LotNo,
    Occupants,
    IsSenior,
    SeniorCount,
    PreviousReading,
    LotArea
  } = client;

  const [result] = await db.query(`
    INSERT INTO tblClient (
      FirstName, MiddleName, LastName, AccountStatusID,
      BlockNo, LotNo, Occupants, IsSenior,
      SeniorCount, PreviousReading, LotArea
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      FirstName, MiddleName, LastName, AccountStatusID,
      BlockNo, LotNo, Occupants, IsSenior,
      SeniorCount, PreviousReading, LotArea
    ]
  );

  return result.insertId;
};

// READ ALL
export const getAllClients = async () => {
  const [rows] = await db.query('SELECT * FROM tblclient');
  return rows;
};

// READ ONE
export const getClientById = async (id) => {
  const [rows] = await db.query('SELECT * FROM tblclient WHERE ClientID = ?', [id]);
  return rows[0];
};

// UPDATE
export const updateClient = async (id, updatedClient) => {
  const {
    FirstName,
    MiddleName,
    LastName,
    AccountStatusID,
    BlockNo,
    LotNo,
    Occupants,
    IsSenior,
    SeniorCount,
    PreviousReading,
    LotArea
  } = updatedClient;

  const [result] = await db.query(`
    UPDATE tblClient SET
      FirstName = ?, MiddleName = ?, LastName = ?, AccountStatusID = ?,
      BlockNo = ?, LotNo = ?, Occupants = ?, IsSenior = ?,
      SeniorCount = ?, PreviousReading = ?, LotArea = ?
    WHERE ClientID = ?`,
    [
      FirstName, MiddleName, LastName, AccountStatusID,
      BlockNo, LotNo, Occupants, IsSenior,
      SeniorCount, PreviousReading, LotArea, id
    ]
  );

  return result.affectedRows;
};

// DELETE
export const deleteClient = async (id) => {
  const [result] = await db.query('DELETE FROM tblClient WHERE ClientID = ?', [id]);
  return result.affectedRows;
};
