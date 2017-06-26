
module.exports = function (sequelize, DataTypes) {
  const Votes = sequelize.define("Votes", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.TEXT
    },
    typeId: {
      type: DataTypes.INTEGER
    },
    voteType: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  });

  return Votes;
};
