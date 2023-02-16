/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("users", (table) => {
    table.string('firstName').notNullable()
    table.string('lastName').notNullable()
    table.string('userName').notNullable().unique()
    table.string('image').notNullable().defaultTo('https://event-venues-development.s3.amazonaws.com/pngwing.com.png')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("users", (table) => {
    table.dropColumn("firstName")
    table.dropColumn("lastName")
    table.dropColumn("userName")
    table.dropColumn('image')
  })
}
