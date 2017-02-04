module.exports = function(sequelize, DataTypes) {
	var Idea = sequelize.define("Idea", {
		id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 40]
			}
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [1, 240]
			}
		},
		githubSource: {
			type: DataTypes.STRING,
			allowNull: true
		},
		timeFrame: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
    },
	{	
		timestamps: false,
		freezeTableName: false,
    	classMethods: {
    		associate: function(models) {
				Idea.belongsToMany(models.Tech, {through: "TechIdea"});
				Idea.hasOne(models.Project);
				Idea.belongsTo(models.User,
				{
					onDelete: "cascade",
					foreignKey: {
						allowNull: true
					}
				});     	
			}
    	}
    });
	return Idea;
};