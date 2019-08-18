const express = require("express");
const dbRes = require("./data/dbConfig.js");

// const ProjectRouter = require("./projects/project-router.js");

const server = express();

server.use(express.json());
// server.use("/projects", ProjectRouter);
server.post("/resources", async (req, res) => {
  const newRes = req.body;
  try {
    const resources = await dbRes("resources").insert(newRes);
    if (resources) {
      res.status(200).json(resources);
    } else {
      res.status(404).json({ message: "could not add" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

server.get("/resources", async (req, res) => {
  try {
    const resources = await dbRes("resources");

    if (resources) {
      res.status(200).json(resources);
    } else {
      res.status(404).json({ message: "no resources" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

server.post("/projects", async (req, res) => {
  const newProj = req.body;
  try {
    const projects = await dbRes("projects").insert(newProj);
    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ message: "could not add" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

server.get("/projects", async (req, res) => {
  try {
    const projects = await dbRes("projects");

    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ message: "no projects" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

server.post("/tasks", async (req, res) => {
  const newTask = req.body;
  try {
    const tasks = await dbRes("tasks").insert(newTask);
    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(404).json({ message: "could not add" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

server.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await dbRes("tasks")
      .where({ id })
      .join("projects", "projects.id", "=", "tasks.project_id")
      .select(
        "tasks.taskid",
        "tasks.description",
        "projects.project_name",
        "tasks.notes",
        "tasks.completed_tasks"
      );
    if (tasks) {
      taskValues = Object.values(tasks);
      taskValues.map(task => {
        task["completed_tasks"] = Boolean(id.completed_tasks);
      });
      res.status(200).json(taskValues);
    } else {
      res.status(404).json({ message: "no tasks" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = server;

//
