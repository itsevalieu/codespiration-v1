module.exports = function(sequelize, DataTypes) {
	var Idea = sequelize.define("Idea", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		githubSource: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [1]
			}
		},
		timeFrame: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				len: [1]
			}
		}
	},
	{	
    	classMethods: {
    		associate: function(models) {
        		Idea.belongsTo(models.User,
				{
					onDelete: "cascade",
					foreignKey: {
						allowNull: false
					}
				});
				Idea.hasMany(models.Tech);
				Idea.belongsTo(models.User,
	            {
	              	onDelete: "cascade",
	              	foreignKey: {
	                	allowNull: false
	              	}
	            });        	
			}
    	}
    });
	return Idea;
};