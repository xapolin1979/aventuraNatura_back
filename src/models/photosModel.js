import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";


const Photos = sequelize.define(
  "Photos",
  {
    id_photos: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    event_id: {
      type: DataTypes.INTEGER(8).UNSIGNED,
    },
    photo: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  {
  
    timestamps: true, // Activa la creación automática de createdAt y updatedAt
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);



export default Photos;
