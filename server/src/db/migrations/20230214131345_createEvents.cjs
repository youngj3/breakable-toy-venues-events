/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('events', table => {
    table.bigIncrements('id')
    table.string('exactId').notNullable()
    table.string('venueId').notNullable()
    table.string('name').notNullable()
    table.string('image')
    table.string('date')
    table.string('genre')
    table.string('priceRange')
    table.text('description').notNullable()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
		table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('events')
}
