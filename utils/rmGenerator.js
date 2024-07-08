const { Pasien } = require("../models");
const {Op} = require("sequelize");

const rmGenerator = async (yearMonth) => { 
    const lastUser = await Pasien.findOne({
        where: {
            rm: {
                [Op.like]: `${yearMonth}-%`,
            },
        },
        order: [['createdAt', 'DESC']],
    });

    let sequence = '001';
    if (lastUser) {
        const lastSequence = parseInt(lastUser.rm.split('-')[1], 10);
        sequence = (lastSequence + 1).toString().padStart(3, '0');
    }

    return `${yearMonth}-${sequence}`;
}

module.exports = rmGenerator;