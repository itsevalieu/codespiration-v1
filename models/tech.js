module.exports = function(sequelize, DataTypes) {
	var Tech = sequelize.define("Tech", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: true,
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
		}
	},
	{
		timestamps: false,
		freezeTableName: true,
		classMethods: {
        	associate: function(models) {
          		Tech.belongsToMany(models.Idea, {through: "TechIdeas"});
          		Tech.belongsToMany(models.User, {through: "TechUsers"});        	
          		Tech.belongsToMany(models.Project, {through: "TechProjects"});
        	}
    	}
	});
	return Tech;
};