import express from "express";

const app = express();

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", responseText);
app.get("/json", responseJson);
app.get("/static/*", responseStatic);

function responseText(req, res) {
  res.end("Hello NodeJS");
}

function responseJson(req, res) {
  res.json({ empId: 109, empName: "UPN" });
}

function responseStatic(req, res) {
  const filename = `${__dirname}/public/images/${req.params[0]}`;
  fs.createReadStream(filename)
    .on("error", () => respondNotFound)
    .pipe(res);
}
