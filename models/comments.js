
module.exports = function (sequelize, DataTypes) {
  const Comments = sequelize.define("Comments",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      issueId: {
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER
      },
      body: {
        type: DataTypes.TEXT
      },
      top: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      rating: {
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
    }
  );

  Comments.associate = (models) => {
    Comments.belongsTo(models.Issues, { foreignKey: "issueId" });
  };

  return Comments;
};
