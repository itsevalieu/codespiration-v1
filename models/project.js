module.exports = function(sequelize, DataTypes) {
	var Project = sequelize.define("Project", {
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
		completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		currentProject: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		githubLink: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				len: [1]
			}
		}
	},
	{
		timestamps: false,
		freezeTableName: true,
    	classMethods: {
    		associate: function(models) {
        		Project.belongsToMany(models.User, {through: "ProjectTeam"});
        		Project.belongsToMany(models.Tech, {through: "TechProjects"});
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