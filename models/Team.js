module.exports = (sequelize, type) => {
    return sequelize.define('team', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        full_name: type.STRING,
        short_name: type.STRING,
        home_ground: type.STRING,
        logo: type.STRING,
        staffe: type.STRING,
        description: type.STRING
    })
}