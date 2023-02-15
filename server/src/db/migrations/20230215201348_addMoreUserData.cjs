/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("users", (table) => {
    table.boolean("isAdmin").notNullable().defaultTo(false)
    table.string('firstName').notNullable()
    table.string('lastName').notNullable()
    table.string('userName').notNullable().unique()
    table.string('profileImage')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("users", (table) => {
    table.dropColumn("isAdmin")
    table.dropColumn("firstName")
    table.dropColumn("lastNme")
    table.dropColumn("userName")
    table.dropColumn('profileImage')
  })
}
