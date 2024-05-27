import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";




const Category = sequelize.define(
    "Category",
    {
      category_id: {
        type: DataTypes.INTEGER(8).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,

      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      /*  indexes: [{ unique: true, fields: ['title'] }], */
      timestamps: true, // Activa la creación automática de createdAt y updatedAt
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );



  
  export default Category;
