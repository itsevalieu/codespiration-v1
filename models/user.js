module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		uuid: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false
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
				len: [1]
			}
		},
		techKnown: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		classMethods: {
        	associate: function(models) {
          		User.belongsToMany(models.Project, {through: "ProjectTeam"});
        		User.hasMany(models.Tech);
        		User.hasMany(models.Idea);
        	}
    	}
	});
	return User;
};