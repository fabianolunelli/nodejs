const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const rep = {
    "id": uuid(),
    "title": title,
    "url": url,
    "techs": techs,
    "likes": 0
  };
  repositories.push(rep);
  return response.json(rep);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repIdx = repositories.findIndex(r => r.id == id);
  if (repIdx < 0) {
    return response.status(400).json({ "error": "Repository not found." });
  }
  const rep = repositories[repIdx];
  rep.title = title;
  rep.url = url;
  rep.techs = techs;
  repositories[repIdx] = rep;
  return response.json(rep);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repIdx = repositories.findIndex(r => r.id == id);
  if (repIdx < 0) {
    return response.status(400).json({ "error": "Repository not found." });
  }
  repositories.splice(repIdx);
  return response.status(204).json({ "message": "Repository deleted!" });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repIdx = repositories.findIndex(r => r.id == id);
  if (repIdx < 0) {
    return response.status(400).json({ "error": "Repository not found." });
  }
  const rep = repositories[repIdx];
  rep.likes = rep.likes + 1;
  repositories[repIdx] = rep;
  return response.json(rep);
});

module.exports = app;
