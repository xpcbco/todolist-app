import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable("tasks")) return;

  await knex.schema.createTable("tasks", (table) => {
    table.index("id").increments().primary().unsigned();
    table.string("title");
    table.string("description");
    table.boolean("is_done").defaultTo(false);
    table.boolean("is_pending").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("tasks");
}
