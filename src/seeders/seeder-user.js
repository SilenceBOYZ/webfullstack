'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email:"admin@gmail.com",
      password: "123456",
      firstName: 'Tri',
      lastName: 'NguyenThanh',
      address: "HoidanIT",
      phonenumber:"0332725527",
      gender:1,
      image:"exmaple",
      roleId:"exmaple",
      positionId:"exmaple",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
