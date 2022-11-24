import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Users from '../database/models/UsersModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const user = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}
describe('Teste da rota...', () => {
  describe('POST /login', () => {
    // beforeEach(async () => {
    //   sinon
    //     .stub(Users, "findOne")
    //     .resolves({
    //       ...user
    //     } as Users);
    // });
  
    // afterEach(()=>{
    //   (Users.findOne as sinon.SinonStub).restore();
    // })    
    it('Usuário correto retorna um token', async () => {
      // sinon.stub(Users, "findOne").resolves();
      const response = await chai.request(app).post('/login').send(user);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.haveOwnProperty('token');
    })
  })
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
