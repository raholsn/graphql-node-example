const request = require('supertest');
const app = require('../server/');

describe('POST /graphql', function() {
  it('responds with hello world!', function(done) {
    request(app)
      .post('/graphql')
      .set('Content-Type')
      .send({ query: '{ message }' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
