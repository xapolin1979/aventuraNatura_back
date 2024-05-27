import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Event from "./eventModel.js";

const Participants = sequelize.define(
  "participants",
  {
    id_participants: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    event_id: {
      type: DataTypes.INTEGER(8).UNSIGNED,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    persons: {
      type: DataTypes.INTEGER(2),
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
Event.hasMany(Participants, { foreignKey: "event_id" });
Participants.belongsTo(Event, { foreignKey: "event_id" });
//Ten en cuenta que hasMany solo establece la relación desde el modelo principal hacia el secundario.
//En algunos casos, eso puede ser suficiente si no necesitas navegar desde el secundario hacia el principal.
//Sin embargo, si necesitas la relación inversa(por ejemplo, obtener el usuario al que pertenece un libro), entonces necesitarás belongsTo.

export default Participants;
