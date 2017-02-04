module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
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
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		github: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 12]
			}
		}
	},
	{
		timestamps: false,
		freezeTableName: false,
		classMethods: {
        	associate: function(models) {
          		User.belongsToMany(models.Project, {through: "UserProject"});
        		User.belongsToMany(models.Tech, {through: "TechUser"});
        		User.hasMany(models.Idea);
        	}
    	}
	});
	return User;
};