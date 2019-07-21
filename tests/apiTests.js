const request = require('supertest');
const app = require('../server/');
const assert = require('assert');

describe('query /graphql', function() {
  it('responds with hello world!', function(done) {
    let agent = request(app);
    agent
      .post('/graphql')
      .type('json')
      .send({
        mutation: `{ createGame(input:{
            title:"title",
            publisher: "test",
            developer: "test",
            genre : ["g1","g2"]
          }) {
             id
          }
        }`
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        console.log('first body', res.body);
        agent
          .post('/graphql')
          .type('json')
          .send({
            query: `{ getGame(id:${
              res.body.id
            }) {title,publisher,developer,genre} }`
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            console.log(res.body);
            console.log(err);

            if (!err) {
            }
            // assert.strictEqual(res.body, gameCommand);
            done();
          });
      });
  });
});
