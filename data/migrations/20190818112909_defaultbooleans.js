exports.up = function(knex) {
  return knex.schema
    .alterTable("projects", tbl => {
      tbl.boolean("completed_project").defaultTo(false);
    })
    .alterTable("tasks", tbl => {
      tbl.boolean("completed_tasks").defaultTo(false);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("resources")
    .dropTableIfExists("project_resources")
    .dropTableIfExists("projects")
    .dropTableIfExists("tasks");
};
