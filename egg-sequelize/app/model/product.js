'use strict';
module.exports = app => {

  const { STRING, DOUBLE, DATE, INTEGER } = app.Sequelize;
  return app.model.define('Product', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(50),
    price: DOUBLE,
    created_at: DATE,
    updated_at: DATE,
  });
};
