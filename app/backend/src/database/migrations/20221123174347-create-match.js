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
      homeTeam: {       
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
        field: 'home_team',
      },
      homeTeamGoals: {       
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      awayTeam: {       
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
        field: 'away_team',
      },
      awayTeamGoals: {       
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      inProgress: {       
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {    
    await queryInterface.dropTable('matches');     
  }
};
