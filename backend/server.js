const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 1433;

// Database configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: 'Proyecto',
    options: {
      trustServerCertificate: true // Change to true for local dev / self-signed certs
    }
  };

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
let pool;

async function connectToDatabase() {
    try {
      pool = await sql.connect(dbConfig);
      console.log('Conectados a la base de datos de SQLServer')
    } catch (err) {
      console.error('Conexion fallida:', err);
      process.exit(1);
    }
  }

  connectToDatabase();
//--------------------------------------------------------------------------------

/*
  Se define una ruta POST para /api/login
  Extrae username y password del cuerpo de la petición
  Realiza una consulta a la base de datos para verificar las credenciales
  Si se encuentra un usuario, devuelve un JSON con success: true
  Si no se encuentra, devuelve success: false
  Si ocurre un error, devuelve un status 500 con un mensaje de error 
*/
// Routes
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, password)
      .query('SELECT * FROM Sesion WHERE Correo = @username AND Password = @password');
    
    if (result.recordset.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Correo o contraseña invalidos' });
    }
  } catch (err) {
    console.error('Error durante el login:', err);
    res.status(500).json({ error: 'A ocurrido un error durante el login' });
  }
});

// Añade esta ruta después de tus rutas existentes
app.post('/api/register', async (req, res) => {
  const { cedula, nombre, apellido, telefono, correo, contraseña } = req.body;
  try {
    const result = await pool.request()
      .input('cedula', sql.VarChar, cedula)
      .input('nombre', sql.VarChar, nombre)
      .input('apellido', sql.VarChar, apellido)
      .input('telefono', sql.VarChar, telefono)
      .input('correo', sql.VarChar, correo)
      .input('contraseña', sql.VarChar, contraseña)
      .query(`
        INSERT INTO Usuarios (Cedula, Nombre, Apellido, telefono, correo, contraseña)
        VALUES (@cedula, @nombre, @apellido, @telefono, @correo, @contraseña);

        INSERT INTO Sesion (Id_Sesion,Correo,Password,Id_ClienteFK) VALUES (3,@correo,@contraseña,@cedula);
      `);
    
    if (result.rowsAffected[0] > 0) {
      res.json({ success: true, message: 'Usuario registrado exitosamente' });
    } else {
      res.json({ success: false, message: 'No se pudo registrar el usuario' });
    }
  } catch (err) {
    console.error('Error durante el registro:', err);
    res.status(500).json({ success: false, error: 'Ocurrió un error durante el registro' });
  }
});

// Example route using the database
app.get('/api/data', async (req, res) => {
    try {
      const result = await pool.request().query('SELECT * FROM Sesion');
      res.json(result.recordset);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

//Tabla Vehiculos
app.get('/api/vehiculo', async (req, res) => {
  try {
    const result = await pool.request().query('SELECT * FROM Vehiculo');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

//Tabla Seguros
app.get('/api/seguros', async (req, res) => {
  try {
    const result = await pool.request().query('SELECT * FROM Seguros');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

//Tabla Admin accounts
app.get('/api/adminAccount', async (req, res) => {
  try {
    const result = await pool.request().query('SELECT * FROM Admin');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

//_______________________________________________________________________________
app.get('/api/user/:correo', async (req, res) => {
  const { correo } = req.params;
  try {
    const getUserResult = await pool.request()
      .input('correo', sql.VarChar, correo)
      .query('SELECT Cedula, Nombre, Apellido, telefono, correo FROM Usuarios WHERE correo = @correo');

    if (getUserResult.recordset.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(getUserResult.recordset[0]);
  } catch (err) {
    console.error('Error al obtener datos del usuario:', err);
    res.status(500).json({ error: 'Error al obtener datos del usuario' });
  }
});

app.put('/api/user/:correo', async (req, res) => {
  const { correo } = req.params;
  const { Nombre, Apellido, telefono, correo: nuevoCorreo } = req.body;
  try {
    // Primero, obtener los datos actuales del usuario
    const getUserResult = await pool.request()
      .input('correo', sql.VarChar, correo)
      .query('SELECT Cedula, Nombre, Apellido, telefono, correo FROM Usuarios WHERE correo = @correo');

    if (getUserResult.recordset.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar el usuario con los nuevos datos
    const updateResult = await pool.request()
      .input('correo', sql.VarChar, correo)
      .input('nombre', sql.VarChar, Nombre)
      .input('apellido', sql.VarChar, Apellido)
      .input('telefono', sql.VarChar, telefono)
      .input('nuevoCorreo', sql.VarChar, nuevoCorreo)
      .query(`
        UPDATE Usuarios
        SET Nombre = @nombre, Apellido = @apellido, telefono = @telefono, correo = @nuevoCorreo
        WHERE correo = @correo;
      `);

    // Obtener los datos actualizados del usuario
    const updatedUserResult = await pool.request()
      .input('correo', sql.VarChar, nuevoCorreo || correo)
      .query('SELECT Cedula, Nombre, Apellido, telefono, correo FROM Usuarios WHERE correo = @correo');

    if (updatedUserResult.recordset.length > 0) {
      res.json(updatedUserResult.recordset[0]);
    } else {
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  } catch (err) {
    console.error('Error al actualizar datos del usuario:', err);
    res.status(500).json({ error: 'Error al actualizar datos del usuario' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});