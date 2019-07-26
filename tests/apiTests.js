const request = require('supertest');
const app = require('../server/');
const assert = require('assert');

describe('query  /graphql', function() {
  it('getGame should have expected response & values', function(done) {
    const input = {
      timer: { rotationTimeInMinutes: 13 },
      mobsters: [
        { name: 'Mobster1', position: 1 },
        { name: 'Mobster2', position: 2 }
      ]
    };

    const query = `
    mutation Mob($input: MobInput){
      createmob(
        input: $input
      ){
        _id
      }
    }`;
    let agent = request(app);
    agent
      .post('/graphql')
      .type('json')
      .send(
        JSON.stringify({
          query: query,
          variables: {
            input
          }
        })
      )
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        const { _id } = res.body.data.createmob;
        const query = `query Mob($id: String){
          getmob(id:$id){
            _id,
            timer {
              startDate
              endDate
            },
            mobsters {
              name
              position
            }
          }
        }`;
        agent
          .post('/graphql')
          .type('json')
          .send(
            JSON.stringify({
              query: query,
              variables: {
                id: _id
              }
            })
          )
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            console.log('actual', res.body.data.getmob);
            console.log('expected', { ...input });

            const { mobsters, timer } = res.body.data.getmob;

            assert.deepStrictEqual({ ...mobsters }, { ...input.mobsters });
            assert.notEqual(timer.startDate, null);
            assert.notEqual(timer.endDate, null);

            done();
          });
      });
  });
});
