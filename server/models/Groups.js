module.exports = (sequelize, Datatypes) => {
    const Groups = sequelize.define("Groups", {
        group_name: {
            type: Datatypes.TEXT,
            allowNull: false,
        },
        group_order: {
            type: Datatypes.INTEGER,
            allowNull: true,
        },
        add_level: {
            type: Datatypes.INTEGER,
            allowNull: false,
        },
        add_group: {
            type: Datatypes.TEXT,
            allowNull: true,
        },
        add_user: {
            type: Datatypes.TEXT,
            allowNull: true,
        },
        edit_level: {
            type: Datatypes.INTEGER,
            allowNull: true,
        },
        edit_group: {
            type: Datatypes.TEXT,
            allowNull: true,
        },
        edit_user: {
            type: Datatypes.TEXT,
            allowNull: true,
        },
        owner: {
            type: Datatypes.TEXT,
            allowNull: false,
        },
        editor: {
            type: Datatypes.TEXT,
            allowNull: true,
        },
    })
    return Groups
}