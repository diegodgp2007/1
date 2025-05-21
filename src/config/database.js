const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Intentar reconexión si hay error
connection.connect((error) => {
  if (error) {
    console.error('Error conectando a la base de datos:', error);
    setTimeout(handleDisconnect, 2000);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

function handleDisconnect() {
  connection.connect((err) => {
    if (err) {
      console.error('Error al reconectar:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });
}

// Manejar errores después de la conexión inicial
connection.on('error', function(err) {
  console.error('Error de base de datos:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    handleDisconnect();
  } else {
    throw err;
  }
});

module.exports = connection;