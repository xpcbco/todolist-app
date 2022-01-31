import Knex from "knex";

const KnexStringCase = require("knex-stringcase");
const config = require("../knexfile");

const environment = process.env.ENVIRONMENT || "development";
const options = KnexStringCase(config[environment]);
const knex = Knex(options);

export { knex };
