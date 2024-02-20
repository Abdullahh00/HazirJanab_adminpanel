let express = require("express");
let router = express.Router();



router.get("/getvendors", async (req, res) => {
    req.pool.query('SELECT * FROM vendor', (error, results, fields) => {
        if (error) {
          // Send an error response if there's an issue with the query
          return res.status(500).json({ message: 'Error retrieving users', error });
        }
        // Send the results of the query back to the client
        res.json(results);
      });
});

router.get("/getitems", async (req, res) => {
    req.pool.query('SELECT * FROM item', (error, results, fields) => {
        if (error) {
          // Send an error response if there's an issue with the query
          return res.status(500).json({ message: 'Error retrieving users', error });
        }
        // Send the results of the query back to the client
        res.json(results);
      });
});



router.get("/getusers", async (req, res) => {
    req.pool.query('SELECT * FROM user', (error, results, fields) => {
        if (error) {
          // Send an error response if there's an issue with the query
          return res.status(500).json({ message: 'Error retrieving users', error });
        }
        // Send the results of the query back to the client
        res.json(results);
      });
});

router.delete("/deleteuser/:id", async (req, res) => {
    const userId = req.params.id;

    // SQL query to delete the user
    const query = 'DELETE FROM user WHERE id = ?';
    req.pool.query(query, [userId], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error deleting user', error });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});

router.delete("/deletevendor/:id", async (req, res) => {
    const userId = req.params.id;

    // SQL query to delete the user
    const query = 'DELETE FROM vendor WHERE id = ?';
    req.pool.query(query, [userId], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error deleting user', error });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});
router.delete("/deleteitem/:id", async (req, res) => {
    const userId = req.params.id;

    // SQL query to delete the user
    const query = 'DELETE FROM item WHERE id = ?';
    req.pool.query(query, [userId], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error deleting user', error });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});
 
router.put("/edituser/:id", async (req, res) => {
    const userId = req.params.id;
    const { First_name, Last_name, Email, Password, Profile_pic, address, phone_number } = req.body;
    console.log(req.body);
    console.log(userId);
    // Construct the SQL query
    const query = `
        UPDATE user 
        SET First_name = ?, Last_name = ?, Email = ?, Password = ?,  address = ?, phone_number = ? 
        WHERE id = ?
    `;

    // Perform the update query, make sure to handle Profile_pic appropriately if it's a binary data type
    req.pool.query(query, [First_name, Last_name, Email, Password,  address, phone_number, userId], (error, results) => {
        if (error) {
            console.log(error);
            // Handle any errors, such as a duplicate email address, if that's a unique field in your schema
            return res.status(500).json({ message: 'Error updating user', error });
        }
        if (results.affectedRows === 0) {
            console.log("User not found");
            // No rows affected means no user with this ID was found
            return res.status(404).json({ message: 'User not found' });
           
        }
        res.json({ message: 'User updated successfully' });
    });
});

router.post("/createuser", async (req, res) => {
    const { First_name, Last_name, Email, Password, Profile_pic, address, phone_number } = req.body;

    // Construct the SQL query to insert a new user
    const query = `
        INSERT INTO user  (First_name, Last_name, Email, Password, Profile_pic, address, phone_number)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the query
    req.pool.query(query, [First_name, Last_name, Email, Password, Profile_pic, address, phone_number], (error, results) => {
        if (error) {
            // Handle any errors, such as a duplicate email address
            return res.status(500).json({ message: 'Error creating new user', error });
        }
        // Send a success response. Include the ID of the newly created user if possible
        res.status(201).json({ message: 'User created successfully', userId: results.insertId });
    });
});


router.put("/edititem/:id", async (req, res) => {
    const itemId = req.params.id; // Assuming it's the ID of the item you want to update
    const { name, hourlyrate, description, city, category, type, img } = req.body;

    
    // Construct the SQL query to update the item
    const query = `
    UPDATE Item
    SET name = ?, hourlyrate = ?, description = ?, city = ?, category = ?, type = ?
    WHERE id = ?;
    `;

    // Execute the query
    req.pool.query(query, [name, hourlyrate, description, city, category, type,itemId], (error, results) => {
        if (error) {
            console.error('Error updating item:', error);
            return res.status(500).json({ message: 'Error updating item' });
        }

        // Check if the item was actually updated (results.affectedRows should be 1)
        if (results.affectedRows === 1) {
            return res.status(200).json({ message: 'Item updated successfully', itemId });
        } else {
            return res.status(404).json({ message: 'Item not found' });
        }
    });
});


router.post("/createitem", async (req, res) => {
    const { name, hourlyrate, description, city, category, type, img } = req.body;

    // Construct the SQL query to insert a new item
    const query = `
        INSERT INTO item (name, hourlyrate, description, city, category, type)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Execute the query
    req.pool.query(query, [name, hourlyrate, description, city, category, type, img], (error, results) => {
        if (error) {
            // Handle any errors, such as a duplicate entry or invalid data
            return res.status(500).json({ message: 'Error creating new item', error });
        }
        // Send a success response. Include the ID of the newly created item if possible
        res.status(201).json({ message: 'Item created successfully', itemId: results.insertId });
    });
});


module.exports = router;