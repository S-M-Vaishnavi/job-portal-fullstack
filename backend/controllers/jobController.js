const db = require("../config/db");

// CREATE JOB (ADMIN)
exports.createJob = (req, res) => {
  const { title, company_name, location, job_type, experience, salary, description } = req.body;

  const sql = `
    INSERT INTO jobs (title, company_name, location, job_type, experience, salary, description, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, company_name, location, job_type, experience, salary, description, req.user.id],
    (err, result) => {
      if (err) {
        console.error("CREATE JOB ERROR:", err);
        return res.status(500).json({ message: "Failed to create job" });
      }
      res.status(201).json({ message: "Job created successfully" });
    }
  );
};

// GET ALL JOBS (PUBLIC)
exports.getAllJobs = (req, res) => {
  const sql = "SELECT * FROM jobs ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch jobs" });
    }
    res.json(results);
  });
};

// GET SINGLE JOB
exports.getJobById = (req, res) => {
  const sql = "SELECT * FROM jobs WHERE id = ?";

  db.query(sql, [req.params.id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(results[0]);
  });
};

// DELETE JOB (ADMIN)
exports.deleteJob = (req, res) => {
  const sql = "DELETE FROM jobs WHERE id = ?";

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete job" });
    }
    res.json({ message: "Job deleted successfully" });
  });
};
