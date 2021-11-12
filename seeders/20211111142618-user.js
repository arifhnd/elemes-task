'use strict';
const Helpers = require('../utils/Helpers');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('users', [
      {
        name: "Admin",
        email: "admin@gmail.com",
        password: await Helpers.HashPassword("123456789".toString()),
        role: "admin"
      },
      {
        name: "Member 1",
        email: "member1@gmail.com",
        password: await Helpers.HashPassword("123456789".toString()),
        role: "member"
      },
      {
        name: "Member 2",
        email: "member2@gmail.com",
        password: await Helpers.HashPassword("123456789".toString()),
        role: "member"
      },
      {
        name: "Member 3",
        email: "member3@gmail.com",
        password: await Helpers.HashPassword("123456789".toString()),
        role: "member"
      },
      {
        name: "Member 4",
        email: "member4@gmail.com",
        password: await Helpers.HashPassword("123456789".toString()),
        role: "member"
      },
      {
        name: "Member 5",
        email: "member5@gmail.com",
        password: await Helpers.HashPassword("123456789".toString()),
        role: "member"
      },
      {
        name: "Member 6",
        email: "member6@gmail.com",
        password: await Helpers.HashPassword("123456789".toString()),
        role: "member"
      },
      {
        name: "Member 7",
        email: "member7@gmail.com",
        password: await Helpers.HashPassword("123456789".toString()),
        role: "member"
      },
      {
        name: "Member 8",
        email: "member8@gmail.com",
        password: await Helpers.HashPassword("123456789".toString()),
        role: "member"
      },
      {
        name: "Member 9",
        email: "member9@gmail.com",
        password: await Helpers.HashPassword("123456789".toString()),
        role: "member"
      },
      {
        name: "Member 10",
        email: "member10@gmail.com",
        password: await Helpers.HashPassword("123456789".toString()),
        role: "member"
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
