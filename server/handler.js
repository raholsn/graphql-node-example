const uuidv1 = require('uuid/v1');

let db = [];

const getMob = (_, { id }) => getMobById(id);

const getMobs = () => db;

const createMob = (_, { input }) => {
  const Mob = {
    _id: uuidv1(),
    timer: createTimer(input.timer),
    mobsters: input.mobsters
  };
  db.push(Mob);

  return Mob;
};

const getMobById = id => {
  return db.filter(Mob => Mob._id == id)[0];
};

const rotateMobster = (_, { input }) => {
  let mob = getMobById(input);

  if (mob === undefined) {
    return null;
  }

  const { endDate, rotationTimeInMinutes } = mob.timer;
  mob.timer.endDate = addMinutes(endDate, rotationTimeInMinutes);
  mob.mobsters.push(mob.mobsters.shift());
  mob.mobsters.map(mobster => {
    mobster.position = mob.mobsters.indexOf(mobster) + 1;
  });

  db[input] = mob;

  return mob;
};

const createTimer = ({ rotationTimeInMinutes }) => {
  const startDate = new Date();

  return {
    rotationTimeInMinutes,
    startDate: startDate.toJSON(),
    endDate: addMinutes(startDate, rotationTimeInMinutes)
  };
};

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

module.exports = { getMob, getMobs, createMob, rotateMobster };
