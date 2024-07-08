const { Daftar } = require("../models");
const { Op, where } = require("sequelize");
const moment = require("moment");

const nextQueue = async () => {
  const todayStart = moment().startOf("day").toDate();
  const todayEnd = moment().endOf("day").toDate();

  const lastQueue = await Daftar.findOne({
    where: {
      createdAt: {
        [Op.gte]: todayStart,
        [Op.lte]: todayEnd,
      },
    },
    order: [["queue", "DESC"]],
  });

  return lastQueue ? lastQueue.queue + 1 : 1;
};

module.exports = nextQueue;
