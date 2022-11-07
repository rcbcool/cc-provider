module.exports = {
  synchronize: false,
  entities: [`dist/entity/*.${process.env.ENV === "local" ? "ts" : "js"}`],
  logging: false,
  cli: {
    entitiesDir:"./src/entity"
  },
};