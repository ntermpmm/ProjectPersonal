// module.exports = (sequelize, DataTypes) => {
//     const ImageAlbum = sequelize.define(
//         "ImageAlbum",
//         {
//             imgAlbum: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//         },
//         {
//             underscored: true,
//         }
//     );
//     ImageAlbum.associate = (models) => {
//         ImageAlbum.belongsTo(models.Content, {
//             foreignKey: {
//                 name: "contentId",
//                 allowNull: false,
//             },
//             onUpdate: "RESTRICT",
//             onDelete: "RESTRICT",
//         });

//         ImageAlbum.hasMany(models.Step, {
//             foreignKey: {
//                 name: "imgAlbumId",
//                 allowNull: false,
//             },
//             onUpdate: "RESTRICT",
//             onDelete: "RESTRICT",
//         });
//     };
//     return ImageAlbum;
// };
