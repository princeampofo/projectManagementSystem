// Connect to database

const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// View Home Page
exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    const query = "SELECT * FROM project";
    connection.query(query, (err, data) => {
      // release connection
      connection.release();
      if (!err) {
        let removedUser = req.query.removed;
        res.render("home", { data, removedUser });
      } else {
        console.log(err);
      }
    });
  });
};

// Search in database
exports.search = (req, res) => {
  pool.getConnection((err, connection) => {
    const searchVar = req.body.search;
    const query =
      "SELECT * FROM project where firstname LIKE ? OR lastname LIKE ?";
    connection.query(
      query,
      ["%" + searchVar + "%", "%" + searchVar + "%"],
      (err, data) => {
        // release connection
        connection.release();
        if (!err) {
          res.render("home", { data });
        } else {
          console.log(err);
        }
      }
    );
  });
};

// Access add project to database page
exports.addPage = (req, res) => {
  res.render("addproject");
};

// Add project to database
exports.add = (req, res) => {
  const {
    firstName,
    lastName,
    contact,
    request,
    status,
    location,
    todayDate,
    estimatedDate,
  } = req.body;
  pool.getConnection((err, connection) => {
    const query =
      "INSERT INTO project SET firstname = ?, lastname = ?, contact = ?, request = ?, status = ?, location = ?, today_date = ?, estimated_date = ? ";
    connection.query(
      query,
      [
        firstName,
        lastName,
        contact,
        request,
        status,
        location,
        todayDate,
        estimatedDate,
      ],
      (err, data) => {
        // release connection
        connection.release();
        if (!err) {
          res.render("addproject", { alert: "Project added successfully" });
        } else {
          console.log(err);
        }
      }
    );
  });
};

// Access edit project page
exports.editPage = (req, res) => {
  pool.getConnection((err, connection) => {
    const idVar = req.params.id;
    const query = "SELECT * FROM project where id = ? ";
    connection.query(query, [idVar], (err, data) => {
      // release connection
      connection.release();
      if (!err) {
        res.render("editproject", { data });
      } else {
        console.log(err);
      }
    });
  });
};

// Update project
exports.update = (req, res) => {
  const {
    firstName,
    lastName,
    contact,
    request,
    status,
    location,
    todayDate,
    estimatedDate,
  } = req.body;
  const idVar = req.params.id;
  pool.getConnection((err, connection) => {
    const query =
      "UPDATE project SET firstname = ?, lastname = ?, contact = ?, request = ?, status = ?, location = ?, today_date = ?, estimated_date = ?  where id = ?";
    connection.query(
      query,
      [
        firstName,
        lastName,
        contact,
        request,
        status,
        location,
        todayDate,
        estimatedDate,
        idVar,
      ],
      (err, data) => {
        // release connection
        connection.release();
        if (!err) {
          pool.getConnection((err, connection) => {
            const idVar = req.params.id;
            const query = "SELECT * FROM project where id = ? ";
            connection.query(query, [idVar], (err, data) => {
              // release connection
              connection.release();
              if (!err) {
                res.render("editproject", {
                  data,
                  alert: "Project updated successfully",
                });
              } else {
                console.log(err);
              }
            });
          });
        } else {
          console.log(err);
        }
      }
    );
  });
};

// Delete project
exports.delete = (req, res) => {
  pool.getConnection((err, connection) => {
    const idVar = req.params.id;
    const query = "DELETE FROM project where id = ? ";
    connection.query(query, [idVar], (err, data) => {
      // release connection
      connection.release();
      if (!err) {
        const removed = encodeURIComponent("Project successfully deleted.");
        res.redirect("/?removed=" + removed);
      } else {
        console.log(err);
      }
    });
  });
};

// View specific  project
exports.viewOne = (req, res) => {
  pool.getConnection((err, connection) => {
    const idVar = req.params.id;
    const query = "SELECT * FROM project where id = ? ";
    connection.query(query, [idVar], (err, data) => {
      // release connection
      connection.release();
      if (!err) {
        res.render("viewproject", { data });
      } else {
        console.log(err);
      }
    });
  });
};
