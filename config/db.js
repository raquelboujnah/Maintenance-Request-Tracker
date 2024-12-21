const knex = require('knex')

require('dotenv').config();
const { PGHOST, PGUSER, PGPASSWORD, PGPORT, PGDATABASE } = process.env
const db = knex({
  client: 'pg',
  connection: {
    host: PGHOST,
    port: PGPORT,
    user: PGUSER,
    database: PGDATABASE,
    password: PGPASSWORD,
    ssl: { 
      rejectUnauthorized: false,  
      sslmode: 'require'   
    },
  },
});

module.exports = db;

// CODE TO INSERT SAMPLE USERS:

// const bcrypt = require('bcrypt');

// async function insertUsers() {
//   try {
//     // Hash passwords using bcrypt
//     const hashedAdminPassword = await bcrypt.hash('admin', 10);  // Hash 'admin' password
//     const hashedTenantPassword = await bcrypt.hash('tenant123', 10);  // Hash 'tenant123' password

//     // Insert users into the user_role table using Knex
//     await db('user_role').insert([
//       { username: 'admin', password: hashedAdminPassword, role: 'Admin' },
//       { username: 'tenant', password: hashedTenantPassword, role: 'Tenant' }
//     ]);

//     console.log('Users inserted successfully!');
//   } catch (error) {
//     console.error('Error inserting users:', error);
//   }
// }

// insertUsers();
