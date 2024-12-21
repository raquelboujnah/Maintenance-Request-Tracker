const db = require("../config/db"); // Import Knex configuration

async function getUserByUsername(username) {
    try {
        const user = await db("user_role").where("username", username).first();

        if (!user) {
            throw new Error(`User with username ${username} not found`);
        }

        return user; // Return the user object if found
    } catch (error) {
        console.error('Error fetching user:', error.message || error);
        throw error; // Propagate the error to be handled in the controller
    }
}

module.exports = {
    getUserByUsername
};
