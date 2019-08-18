exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl
        .string("project_name", 128)
        .unique()
        .notNullable();
      tbl.string("description", 128);
      tbl.boolean("completed", false);
    })
    .createTable("tasks", tbl => {
      tbl.increments("taskid");
      tbl.string("description", 128).notNullable();
      tbl.string("notes", 128);
      tbl.boolean("completed_task", false);
    })
    .creatTable("resources", tbl => {
      tbl.increments("resourceid");
      tbl
        .string("resource_name", 128)
        .unique()
        .notNullable();
      tbl.string("description", 128);
    })
    .createTable("projects_resource", tbl => {
      tbl
        .integer("project_id")
        .foreign("project_id")
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CAScADE");
      tbl
        .integer("resource_id")
        .foreign("resource_id")
        .references("resourceid")
        .inTable("resources")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {};
