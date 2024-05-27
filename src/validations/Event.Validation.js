import { body } from 'express-validator';

export const eventValidator = [
    body("user_id")
        .exists()
        .withMessage("User ID is required")
        .isInt({ min: 1 })
        .withMessage("User ID should be a valid integer"),
    body("category_id")
        .exists()
        .withMessage("Category ID is required")
        .isInt({ min: 1 })
        .withMessage("Category ID should be a valid integer"),
    body("name_event")
        .exists()
        .withMessage("Activity name is required")
        .isString()
        .withMessage("Activity name should be a string"),
    body("difficulty")
        .exists()
        .withMessage("Difficulty is required")
        .isInt({ min: 1, max: 5 }) // Establecer el rango de dificultad válido
        .withMessage("Difficulty should be a valid integer between 1 and 10"),
    body("max_persons")
        .exists()
        .withMessage("Max participants is required")
        .isInt({ min: 1 })
        .withMessage("Max participants should be a valid integer"),
    body("start_date")
        .exists()
        .withMessage("Start date is required")
        .isISO8601()
        .withMessage("Start date should be a valid ISO8601 date"),
    body("end_date")
        .exists()
        .withMessage("Ending date is required")
        .isISO8601()
        .withMessage("Ending date should be a valid ISO8601 date"),
    body("lat")
        .exists()
        .withMessage("Latitude is required")
        .matches(/^[-+]?([0-9]{1,3})?(\.[0-9]{1,7})?$/)
        .withMessage("Latitude should be a valid decimal with precision 11 and scale 7"),
    body("lng")
        .exists()
        .withMessage("Longitude is required")
        .matches(/^[-+]?([0-9]{1,3})?(\.[0-9]{1,7})?$/)
        .withMessage("Longitude should be a valid decimal with precision 11 and scale 7"),
    body("info_event")
        .exists()
        .withMessage("Activity information is required")
        .isString()
        .withMessage("Activity information should be a string"),
    body("for_whom")
        .exists()
        .withMessage("For whom is required")
        .isInt({ min: 1, max: 3 }) // Establecer el rango de valores válidos para "for_whom"
        .withMessage("For whom should be a valid integer between 1 and 3"),
    body("price_per_person")
        .exists()
        .withMessage("Price per person is required")
        .isDecimal({ min: 0 })
        .withMessage("Price per person should be a valid non-negative decimal"),
    body("material")
        .exists()
        .withMessage("Material is required")
        .isString()
        .withMessage("Material should be a string")
];

