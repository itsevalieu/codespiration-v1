module.exports = function(sequelize, DataTypes) {
	var Tech = sequelize.define("Tech", {
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
		techType: {
			type: DataTypes.ENUM,
			values:["language", "framework", "library", "database"]
		},
		frontend: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		backend: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		documentation: {
			type: DataTypes.STRING,
			allowNull: true
		},
	},
	{
		classMethods: {
        	associate: function(models) {
          		Tech.belongsTo(models.Idea,
	            {
	              	onDelete: "cascade",
	              	foreignKey: {
	                	allowNull: false
	              	}
	            });
          		Tech.belongsTo(models.User,
	            {
	              	onDelete: "cascade",
	              	foreignKey: {
	                	allowNull: false
	              	}
	            });        	
          		Tech.belongsTo(models.Project,
	            {
	              	onDelete: "cascade",
	              	foreignKey: {
	                	allowNull: false
	              	}
	            });        	
        	}
    	}
	});
	return Tech;
};