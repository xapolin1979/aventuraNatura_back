import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Category from "./categoryModel.js";
import User from "./userModel.js";
import Photos from "./photosModel.js";
const Event = sequelize.define(
  "Event",
  {
    id_event: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER(8).UNSIGNED,
    },
    category_id: {
      type: DataTypes.INTEGER(8).UNSIGNED,
    
    },
    name_event: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
    },
    max_persons: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    lat:{
      type: DataTypes.DECIMAL(11,8),
      allowNull: false,

    },
    lng:{
      type: DataTypes.DECIMAL(11,8),
      allowNull: false,
    },
    info_event: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    for_whom: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
    },
    price_per_person: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    material: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
  },
  {

    timestamps: true, // Activa la creación automática de createdAt y updatedAt
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);
User.hasMany(Event, { foreignKey: "user_id" });
Event.belongsTo(User, { foreignKey: "user_id" });

Event.hasMany(Photos, { foreignKey: "event_id" }); 
Photos.belongsTo(Event, { foreignKey: "event_id" });


 Event.belongsTo(Category, { foreignKey: "category_id" }); // no me deja insertar la tabla por culpa de categoria
Category.hasMany(Event, { foreignKey: "category_id" }); 
 

export default Event;
