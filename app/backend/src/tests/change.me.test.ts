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


interface UserMock {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string
}

const user = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const dbUser = {
  id:  1,
  username: 'Admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  role: 'admin' 
}

const noEmailUser1 = {
  password: 'secret_admin'
}

const noEmailUser2 = {
  email: '',
  password: 'secret_admin'
}

const noPasswordUser1 = {
  email: 'admin@admin.com',  
}

const noPasswordUser2 = {
  email: 'admin@admin.com',
  password: ''  
}

const invalidEmailUser = {
  email: 'admin@admin.co',
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
      sinon.stub(Users, "findOne").resolves(dbUser as Users);
      const response = await chai.request(app).post('/login').send(user);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.haveOwnProperty('token');
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('Login sem email retorna status 400 e com mensagem "All fields must be filled"', async () => {
      const response1 = await chai.request(app).post('/login').send(noEmailUser1);

      expect(response1.status).to.be.equal(400);
      expect(response1.body).to.haveOwnProperty('message');
      expect(response1.body.message).to.equal('All fields must be filled');

      const response2 = await chai.request(app).post('/login').send(noEmailUser2);

      expect(response2.status).to.be.equal(400);
      expect(response2.body).to.haveOwnProperty('message');
      expect(response2.body.message).to.equal('All fields must be filled');

    })

    it('Login sem senha retorna status 400 e com mensagem "All fields must be filled"', async () => {
      const response1 = await chai.request(app).post('/login').send(noPasswordUser1);

      expect(response1.status).to.be.equal(400);
      expect(response1.body).to.haveOwnProperty('message');
      expect(response1.body.message).to.equal('All fields must be filled');

      const response2 = await chai.request(app).post('/login').send(noPasswordUser2);

      expect(response2.status).to.be.equal(400);
      expect(response2.body).to.haveOwnProperty('message');
      expect(response2.body.message).to.equal('All fields must be filled');

    })

    it('Login com email inválido retorna status 401 e mensagen "Incorrect email or password"', async () => {
      sinon.stub(Users, "findOne").resolves();
      const response = await chai.request(app).post('/login').send(invalidEmailUser);

      expect(response.status).to.be.equal(401);
      expect(response.body).to.haveOwnProperty('message');
      expect(response.body.message).to.equal('Incorrect email or password');
      (Users.findOne as sinon.SinonStub).restore();
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
