
module.exports = function (sequelize, DataTypes) {
  const Issues = sequelize.define("Issues", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER
    },
    topicId: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.TEXT
    },
    body: {
      type: DataTypes.TEXT
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    commentsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: DataTypes.TEXT,
      defaultValue: "active"
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  },
  {
    classMethods: {
      associate: (models) => {
        Issues.hasMany(models.Comments, {
          foreignKey: "issueId"
        });
      }
    }
  }
  );

  return Issues;
};
