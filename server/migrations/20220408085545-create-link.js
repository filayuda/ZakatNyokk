'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "accounts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      tanggal: {
        type: Sequelize.DATEONLY
      },
      idZakat: {
        // allowNull: false,
        type: Sequelize.INTEGER,
        // references: {
        //   model: "types",
        //   key: "id",
        // },
        // onUpdate: "CASCADE",
        // onDelete: "CASCADE",
      },
      payment: {
        type: Sequelize.INTEGER
      },
      template_id: {
        type: Sequelize.INTEGER
      },
      picture: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      link1: {
        type: Sequelize.STRING
      },
      link2: {
        type: Sequelize.STRING
      },
      link3: {
        type: Sequelize.STRING
      },
      link4: {
        type: Sequelize.STRING
      },
      link5: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('links');
  }
};