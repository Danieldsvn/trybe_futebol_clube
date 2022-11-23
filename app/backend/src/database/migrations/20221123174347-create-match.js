'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      home_team: {       
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
        field: 'home_team',
      },
      home_team_goals: {       
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      away_team: {       
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
        field: 'away_team',
      },
      away_team_goals: {       
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      in_progress: {       
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {    
    await queryInterface.dropTable('matches');     
  }
};
