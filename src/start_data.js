import User from "./models/userModel.js";
import Category from "./models/categoryModel.js";
import Photos from "./models/photosModel.js";
import Participants from "./models/participantsNodel.js";
import Event from "./models/eventModel.js";


const insertInitialUserData = async () => {
  try {
    // Verificar si ya existen categorías en la base de datos
    const existingCategories = await Category.findAll();

    // Si ya existen categorías, no es necesario insertarlas nuevamente
    if (existingCategories.length > 0) {
      console.log("Las categorías ya existen en la base de datos. No se requiere inserción adicional.");
      return;
    }

    // Datos de las categorías que deseas insertar
    const categoriesDatos = [
      { name: "senderismo" },
      { name: "alpinismo" },
      { name: "esqui" },
      { name: "snowboard" },
      { name: "barranquismo" },
      { name: "rafting" },
      { name: "kayak " },
    ];

    // Insertar las categorías solo si no existen
    await Category.bulkCreate(categoriesDatos);
    
    console.log("Se han insertado las categorías iniciales correctamente.");
  } catch (error) {
    console.error("Error al insertar las categorías iniciales:", error);
  }
};

export { insertInitialUserData };