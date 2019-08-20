exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments("id");
      tbl.string("project_name", 128).notNullable();
      tbl.string("description", 128);
      tbl.boolean("completed", false);
      tbl.unique("project_name");
    })
    .createTable("tasks", tbl => {
      tbl.increments("taskid");
      tbl.string("description", 128).notNullable();
      tbl.string("notes", 128);
      tbl.boolean("completed_task", false);
      tbl
        .integer("project_id")
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("resources", tbl => {
      tbl.increments("resourceid");
      tbl.string("resource_name", 128).notNullable();
      tbl.string("description", 128);
      tbl.unique("resource_name");
    })
    .createTable("project_resources", tbl => {
      tbl
        .integer("project_id")
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("resource_id")
        .references("resourceid")
        .inTable("resources")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("resources")
    .dropTableIfExists("project_resources")
    .dropTableIfExists("projects")
    .dropTableIfExists("tasks");
};
