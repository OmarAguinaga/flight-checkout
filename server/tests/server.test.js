const expect = require("expect");
const request = require("supertest");

const { app } = require("./../index");
const { Seat } = require("./../models/seat");

describe("GET /api/seat/random", () => {
  it("shoudl return only one available random seat", done => {
    request(app)
      .get("/api/seat/random")
      .send()
      .expect(200)
      .expect(res => {
        expect(res.body.available).toBe(true);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
