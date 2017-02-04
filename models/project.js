module.exports = function(sequelize, DataTypes) {
	var Project = sequelize.define("Project", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: true,
			autoIncrement: true
		},
		completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		currentProject: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: true
		},
		githubProjectLink: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		timestamps: false,
		freezeTableName: false,
    	classMethods: {
    		associate: function(models) {
        		Project.belongsToMany(models.User, {through: "UserProject"});
        		Project.belongsToMany(models.Tech, {through: "TechProject"});
        		Project.belongsTo(models.Idea,
	            {
	              	onDelete: "cascade",
	              	foreignKey: {
	                	allowNull: true
	                }
	            });
        	}
    	}
    });
	return Project;
};