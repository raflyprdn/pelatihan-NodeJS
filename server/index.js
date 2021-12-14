import express from "express";

//initial object pool pg
const Pool = require("pg").Pool;
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "admin",
  database: "HR",
  port: 5432,
});

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/api/v1/regions", (req, res) => {
  const { id } = req.params;
  pool.query(
    "select region_id, region_name from regions",
    [],
    (error, result) => {
      if (error) {
        throw error;
      }
      result.status(200).json(result.rows);
    }
  );
});

app.get("/api/v1/regions/:id", (req, res) => {
  pool.query(
    "select region_id, region_name from regions where region_id=$1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      result.status(200).json(result.rows);
    }
  );
});
