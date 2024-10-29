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
    database: 'AgenciaDeViajes',
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

//EndPoints CRUD para Aviones
              /*Llamar la lista de aviones existentes ( C[R]UD Read - LEER)*/
app.get('/api/airplanes', async (req, res) => {
  try {
    const result = await pool.request().query('SELECT * FROM Avion');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener aviones:', err);
    res.status(500).json({ error: 'Error al obtener aviones' });
  }
});

              /*Crear un nuevo avión ( [C]RUD Create - CREAR)*/
app.post('/api/airplanes', async (req, res) => {
  const { Modelo, Fabricante, Año_Fabricacion, Numero_Asientos, Capacidad_Carga, NIT_ContratistaFK } = req.body;
  try {
    const result = await pool.request()
      .input('Modelo', sql.VarChar, Modelo)
      .input('Fabricante', sql.VarChar, Fabricante)
      .input('Año_Fabricacion', sql.Date, Año_Fabricacion)
      .input('Numero_Asientos', sql.Int, Numero_Asientos)
      .input('Capacidad_Carga', sql.Float, Capacidad_Carga)
      .input('NIT_ContratistaFK', sql.VarChar, NIT_ContratistaFK)
      .query(`INSERT INTO Avion (Modelo, Fabricante, Año_Fabricacion, Numero_Asientos, Capacidad_Carga, NIT_ContratistaFK) 
              VALUES (@Modelo, @Fabricante, @Año_Fabricacion, @Numero_Asientos, @Capacidad_Carga, @NIT_ContratistaFK);
              SELECT SCOPE_IDENTITY() AS Id_Avion;`);
    res.status(201).json({ Id_Avion: result.recordset[0].Id_Avion, ...req.body });
  } catch (err) {
    console.error('Error al agregar avión:', err);
    res.status(500).json({ error: 'Error al agregar avión', details: err.message });
  }
});

              /*Actualizar un avión ( CR[U]D Update - ACTUALIZAR)*/
app.put('/api/airplanes/:id', async (req, res) => {
  const { id } = req.params;
  const { Modelo, Fabricante, Año_Fabricacion, Numero_Asientos, Capacidad_Carga, NIT_ContratistaFK } = req.body;
  try {
    await pool.request()
      .input('Id_Avion', sql.Int, id)
      .input('Modelo', sql.VarChar, Modelo)
      .input('Fabricante', sql.VarChar, Fabricante)
      .input('Año_Fabricacion', sql.Date, Año_Fabricacion)
      .input('Numero_Asientos', sql.Int, Numero_Asientos)
      .input('Capacidad_Carga', sql.Float, Capacidad_Carga)
      .input('NIT_ContratistaFK', sql.VarChar, NIT_ContratistaFK)
      .query(`UPDATE Avion SET Modelo = @Modelo, Fabricante = @Fabricante, Año_Fabricacion = @Año_Fabricacion, 
              Numero_Asientos = @Numero_Asientos, Capacidad_Carga = @Capacidad_Carga, NIT_ContratistaFK = @NIT_ContratistaFK
              WHERE Id_Avion = @Id_Avion`);
    res.json({ message: 'Avión actualizado con éxito' });
  } catch (err) {
    console.error('Error al actualizar avión:', err);
    res.status(500).json({ error: 'Error al actualizar avión' });
  }
});

              /*Borrar un avión (CRU[D] Delete - ELIMINAR)*/
app.delete('/api/airplanes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.request()
      .input('Id_Avion', sql.Int, id)
      .query('DELETE FROM Avion WHERE Id_Avion = @Id_Avion');
    res.json({ message: 'Avión eliminado con éxito' });
  } catch (err) {
    console.error('Error al eliminar avión:', err);
    res.status(500).json({ error: 'Error al eliminar avión' });
  }
});

//EndPoints CRUD para Empleados
                            // Obtener todos los empleados
app.get('/api/employees', async (req, res) => {
  try {
    const result = await pool.request().query(`
      SELECT [Cedula], [Tipo_Documento], [Primer_Nombre], [Segundo_Nombre], 
             [Primer_Apellido], [Segundo_Apellido], [Fecha_Nacimiento]
      FROM Empleado
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener empleados:', err);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
});

                            // Crear un nuevo empleado
app.post('/api/employees', async (req, res) => {
  const { Cedula, Tipo_Documento, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Fecha_Nacimiento } = req.body;
  try {
    const result = await pool.request()
      .input('Cedula', sql.VarChar, Cedula)
      .input('Tipo_Documento', sql.VarChar, Tipo_Documento)
      .input('Primer_Nombre', sql.VarChar, Primer_Nombre)
      .input('Segundo_Nombre', sql.VarChar, Segundo_Nombre)
      .input('Primer_Apellido', sql.VarChar, Primer_Apellido)
      .input('Segundo_Apellido', sql.VarChar, Segundo_Apellido)
      .input('Fecha_Nacimiento', sql.Date, new Date(Fecha_Nacimiento))
      .query(`
        INSERT INTO Empleado (Cedula, Tipo_Documento, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Fecha_Nacimiento)
        VALUES (@Cedula, @Tipo_Documento, @Primer_Nombre, @Segundo_Nombre, @Primer_Apellido, @Segundo_Apellido, @Fecha_Nacimiento);
      `);
    res.status(201).json({ message: 'Empleado agregado con éxito', Cedula });
  } catch (err) {
    console.error('Error al agregar empleado:', err);
    res.status(500).json({ error: 'Error al agregar empleado', details: err.message });
  }
});

                            // Actualizar un empleado
app.put('/api/employees/:cedula', async (req, res) => {
  const { cedula } = req.params;
  const { Tipo_Documento, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Fecha_Nacimiento } = req.body;
  try {
    await pool.request()
      .input('Cedula', sql.VarChar, cedula)
      .input('Tipo_Documento', sql.VarChar, Tipo_Documento)
      .input('Primer_Nombre', sql.VarChar, Primer_Nombre)
      .input('Segundo_Nombre', sql.VarChar, Segundo_Nombre)
      .input('Primer_Apellido', sql.VarChar, Primer_Apellido)
      .input('Segundo_Apellido', sql.VarChar, Segundo_Apellido)
      .input('Fecha_Nacimiento', sql.Date, new Date(Fecha_Nacimiento))
      .query(`
        UPDATE Empleado 
        SET Tipo_Documento = @Tipo_Documento, 
            Primer_Nombre = @Primer_Nombre, 
            Segundo_Nombre = @Segundo_Nombre, 
            Primer_Apellido = @Primer_Apellido, 
            Segundo_Apellido = @Segundo_Apellido, 
            Fecha_Nacimiento = @Fecha_Nacimiento
        WHERE Cedula = @Cedula
      `);
    res.json({ message: 'Empleado actualizado con éxito' });
  } catch (err) {
    console.error('Error al actualizar empleado:', err);
    res.status(500).json({ error: 'Error al actualizar empleado' });
  }
});

                            // Eliminar un empleado
app.delete('/api/employees/:cedula', async (req, res) => {
  const { cedula } = req.params;
  try {
    await pool.request()
      .input('Cedula', sql.VarChar, cedula)
      .query('DELETE FROM Empleado WHERE Cedula = @Cedula');
    res.json({ message: 'Empleado eliminado con éxito' });
  } catch (err) {
    console.error('Error al eliminar empleado:', err);
    res.status(500).json({ error: 'Error al eliminar empleado' });
  }
});

//EndPoints CRUD para Muebles
// Obtener todos los muebles (READ)
app.get('/api/furniture', async (req, res) => {
  try {
    const result = await pool.request()
      .query('SELECT * FROM Mueble');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener muebles:', err);
    res.status(500).json({ error: 'Error al obtener muebles' });
  }
});

// Crear un nuevo mueble (CREATE)
app.post('/api/furniture', async (req, res) => {
  const { Id_CategoriaFK, Sucursal_IdFK, Fecha_Adquisicion, Costo, Cantidad } = req.body;
  try {
    const result = await pool.request()
      .input('Id_CategoriaFK', sql.Int, Id_CategoriaFK)
      .input('Sucursal_IdFK', sql.Int, Sucursal_IdFK)
      .input('Fecha_Adquisicion', sql.Date, Fecha_Adquisicion)
      .input('Costo', sql.Decimal(10, 2), Costo)
      .input('Cantidad', sql.Int, Cantidad)
      .query(`INSERT INTO Mueble (Id_CategoriaFK, Sucursal_IdFK, Fecha_Adquisicion, Costo, Cantidad) 
              VALUES (@Id_CategoriaFK, @Sucursal_IdFK, @Fecha_Adquisicion, @Costo, @Cantidad);
              SELECT SCOPE_IDENTITY() AS Id_Mueble;`);
    res.status(201).json({ Id_Mueble: result.recordset[0].Id_Mueble, ...req.body });
  } catch (err) {
    console.error('Error al agregar mueble:', err);
    res.status(500).json({ error: 'Error al agregar mueble' });
  }
});

// Actualizar un mueble (UPDATE)
app.put('/api/furniture/:id', async (req, res) => {
  const { id } = req.params;
  const { Id_CategoriaFK, Sucursal_IdFK, Fecha_Adquisicion, Costo, Cantidad } = req.body;
  try {
    await pool.request()
      .input('Id_Mueble', sql.Int, id)
      .input('Id_CategoriaFK', sql.Int, Id_CategoriaFK)
      .input('Sucursal_IdFK', sql.Int, Sucursal_IdFK)
      .input('Fecha_Adquisicion', sql.Date, Fecha_Adquisicion)
      .input('Costo', sql.Decimal(10, 2), Costo)
      .input('Cantidad', sql.Int, Cantidad)
      .query(`UPDATE Mueble SET Id_CategoriaFK = @Id_CategoriaFK, Sucursal_IdFK = @Sucursal_IdFK, 
              Fecha_Adquisicion = @Fecha_Adquisicion, Costo = @Costo, Cantidad = @Cantidad 
              WHERE Id_Mueble = @Id_Mueble`);
    res.json({ message: 'Mueble actualizado con éxito' });
  } catch (err) {
    console.error('Error al actualizar mueble:', err);
    res.status(500).json({ error: 'Error al actualizar mueble' });
  }
});

// Eliminar un mueble (DELETE)
app.delete('/api/furniture/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.request()
      .input('Id_Mueble', sql.Int, id)
      .query('DELETE FROM Mueble WHERE Id_Mueble = @Id_Mueble');
    res.json({ message: 'Mueble eliminado con éxito' });
  } catch (err) {
    console.error('Error al eliminar mueble:', err);
    res.status(500).json({ error: 'Error al eliminar mueble' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});