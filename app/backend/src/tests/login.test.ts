import * as sinon from 'sinon';
import * as chai from 'chai';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import chaiHttp = require('chai-http');

// import Example from '../database/models/ExampleModel';
import { Response } from 'superagent';
import { app } from '../app';

import Users from '../database/models/users';

/* import userInfoMock from './mock/userInfoMock';
import userInfoMockWithoutPassword from './mock/userInfoMockWithoutPassword'; */

chai.use(chaiHttp);

const { expect } = chai;

const userInfoMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const userInfoMockWithoutPassword = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: "admin@admin.com",
}

const requestBody = { email: "admin@admin.com", password: 'secret_admin' }

describe('/login', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(userInfoMock as unknown as Users);
  });

  afterEach(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('/login deve retornar status 200 e o objeto quando o login for bem sucedido', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(requestBody)

    expect(chaiHttpResponse).to.have.status(200);

    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body).to.have.property('token');

    expect(chaiHttpResponse.body.user).to.be.deep.eq(userInfoMockWithoutPassword);
    expect(typeof chaiHttpResponse.body.token === 'string').to.be.eq(true);
  });
});