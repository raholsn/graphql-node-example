const request = require('supertest');
const app = require('../server/');
const assert = require('assert');

describe('query  /graphql', function() {
  it('createGame and getGame should have expected values', function(done) {
    const expectedTitle = 'sometitle';
    const expectedPublisher = 'somepublisher';
    const expectedDeveloper = 'somedeveloper';
    const expectedGenre = ['g1', 'g2'];

    const query = `mutation Game($expectedTitle: String,$expectedPublisher: String, $expectedDeveloper: String, $expectedGenre:[String]){
      createGame(input:{
        title: $expectedTitle,
        publisher: $expectedPublisher,
        developer: $expectedDeveloper,
        genre: $expectedGenre
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
            expectedTitle,
            expectedPublisher,
            expectedDeveloper,
            expectedGenre
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
            console.log(res.body);
            const {
              title,
              publisher,
              developer,
              genre
            } = res.body.data.getGame;

            assert.deepStrictEqual(
              { title, publisher, developer, genre },
              {
                title: expectedTitle,
                publisher: expectedPublisher,
                developer: expectedDeveloper,
                genre: expectedGenre
              }
            );

            done();
          });
      });
  });
});
