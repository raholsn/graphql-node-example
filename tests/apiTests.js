const request = require('supertest');
const app = require('../server/');
const assert = require('assert');

describe('query  /graphql', function() {
  it('getGame should have expected response & values', function(done) {
    const input = {
      title: 'sometitle',
      publisher: 'somepublisher',
      developer: 'somedeveloper',
      genre: ['g1', 'g2']
    };

    const query = `mutation Game($title: String,$publisher: String, $developer: String, $genre:[String]){
      createGame(input:{
        title: $title,
        publisher: $publisher,
        developer: $developer,
        genre: $genre
    }) {
      id  
   }}`;
    let agent = request(app);
    agent
      .post('/graphql')
      .type('json')
      .send(
        JSON.stringify({
          query: query,
          variables: {
            ...input
          }
        })
      )
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        const { id } = res.body.data.createGame;
        agent
          .post('/graphql')
          .type('json')
          .send({
            query: `query { getGame(id:${id}) {title,publisher,developer,genre} }`
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            assert.deepStrictEqual({ ...res.body.data.getGame }, { ...input });
            done();
          });
      });
  });
});
