const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json({message: repositories})
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body
  const repo = { id: uuid(), title, url, techs, likes: 0 }
  repositories.push(repo);

  return response.json(repo)

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body

  const repositoriIdx = repositories.findIndex(repo => repo.id === id);

  if (repositoriIdx < 0){
    return response.status(400).json({ error: "Repositori not found!" })
  }
  const like = repositories[repositoriIdx]
  console.log(like)
  console.log(like.likes)
  const repo = { id, title, url, techs, likes: like.likes};

  repositories[repositoriIdx] = repo

  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoriIdx = repositories.findIndex(repo => repo.id === id);

  if (repositoriIdx < 0) {
    return response.status(400).json({ error: "Repositori not found!" })
  }
  repositories.splice(repositoriIdx, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoriIdx = repositories.findIndex(repo => repo.id === id);

  if (repositoriIdx < 0) {
    return response.status(400).json({ error: "Repositori not found!" })
  }


  const { title, url, techs, likes } = repositories[repositoriIdx];

  const repo = { id, title, url, techs, likes: likes + 1};

  repositories[repositoriIdx] = repo

  return response.json(repo);
});

module.exports = app;
