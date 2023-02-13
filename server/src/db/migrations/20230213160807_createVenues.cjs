/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('venues', table => {
    table.bigIncrements("id")
    table.string('name').notNullable()
    table.string('exactId').notNullable()
    table.string('image')
    table.string('city').notNullable()
    table.string('state').notNullable()
    table.string('address').notNullable()
    table.string('postalCode').notNullable()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
		table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('venues')
}
