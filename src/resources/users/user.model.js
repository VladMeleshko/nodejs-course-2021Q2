const {v4: uuid} = require('uuid');

/**
 * @typedef {Object} UserInfo user's name and login.
 * @property {string} name user name.
 * @property {string} login user login.
 */

/**
 * @typedef {UserInfo & {password: string}} UserCredentials contains user's credentials (name, login, password).
 */

/**
 * @typedef {UserInfo & {id: string}} UserAccount contains account parameters (id, name, login).
 */

/**
 * @typedef {UserCredentials & {id: string}} UserModel contains full user's information (id, name, login, password).
 */

/** Class representing a user. */
class User {
  /**
   * Create a user.
   * @param {UserCredentials} newUser parameters of new user.
   * @returns {UserModel} new user.
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Processes user information from the server.
   * @param {UserModel} user user's information.
   * @returns {UserAccount} returns account information about user.
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
