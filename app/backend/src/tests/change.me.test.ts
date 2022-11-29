import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Users from '../database/models/UsersModel';
import Teams from '../database/models/TeamsModel';

import { compareSync } from 'bcryptjs';

import { Response } from 'superagent';

import { user, dbUser, noEmailUser1, noEmailUser2, noPasswordUser1,
   noPasswordUser2, invalidEmailUser, smallPasswordUser, invalidPasswordUser } from './usersMock'

import { allTeams, id5Team } from './teamsMock';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;



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
    it('[TESTE INEFICAZ]Login com password inválido retorna status 401 e mensagen "Incorrect email or password"', async () => {
      sinon.stub(Users, "findOne").resolves();
      const response1 = await chai.request(app).post('/login').send(smallPasswordUser);

      expect(response1.status).to.be.equal(401);
      expect(response1.body).to.haveOwnProperty('message');
      expect(response1.body.message).to.equal('Incorrect email or password');
      (Users.findOne as sinon.SinonStub).restore();

      sinon.stub(Users, "findOne").resolves(dbUser as Users);
      sinon.stub({compareSync}).compareSync.resolves(false); // Aprendendo a utilizar...      
      const response2 = await chai.request(app).post('/login').send(invalidPasswordUser);

      expect(response1.status).to.be.equal(401);
      expect(response2.body).to.haveOwnProperty('message');
      expect(response2.body.message).to.equal('Incorrect email or password');
      (Users.findOne as sinon.SinonStub).restore();
      // (brcrypt.compareSync as sinon.SinonStub).restore();
    })
  })
  describe('testes da rota /teams', () => {
    it('Retorna todos os times corretamente', async () => {
      sinon.stub(Teams, "findAll").resolves(allTeams as Teams[]);
      const response = await chai.request(app).get('/teams');
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(allTeams);
      (Teams.findAll as sinon.SinonStub).restore();
    })
  })
  describe('[A confirmar]testes da rota /teams/:id', () => {
    it('Retorna time especificado pelo "id"', async () => {
      const number5 = 5;
      sinon.stub(Teams, "findOne").resolves(id5Team as Teams);
      const response = await chai.request(app).get(`/teams/:id`); // tem que ver se funciona      
      console.log(response);
      expect(id5Team.id).to.be.equal(response);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(id5Team);
      (Teams.findOne as sinon.SinonStub).restore();
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
