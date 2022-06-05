module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'John Doe',
          email: 'test@medium.com',
          password: '123Senha',
        },
        {
          name: 'John Travolta',
          email: 'test2@medium.com',
          password: '123Senha',
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
