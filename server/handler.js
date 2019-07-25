let db = [];

const getMob = (_, { id }) => {
  return getMobById(id);
};

const getMobs = () => {
  console.log(db);
  return db;
};

const createMob = (_, { input }) => {
  console.log('input', input);
  const Mob = {
    _id: db.length + 1,
    timer: createTimer(input.timer),
    mobsters: input.mobsters
  };

  db.push(Mob);

  console.log(Mob);
  return Mob;
};

const createMobsters = mobsters => {
  console.log('mobster', mobsters);
  return {
    mobsters
  };
};

const getMobById = id => {
  return db.filter(Mob => Mob._id == id)[0];
};

const rotateMobster = (_, { input }) => {
  let mob = getMobById(input.id);

  const { endDate, rotationTimeInMinutes } = mob.timer;

  mob.timer.endDate = addMinutes(endDate, rotationTimeInMinutes);
  mob.mobsters.push(mob.mobsters.shift());

  db[id] = mob;

  return mob;
};

const createTimer = ({ rotationTimeInMinutes }) => {
  console.log('rotationTimeInMinutes', rotationTimeInMinutes);
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
