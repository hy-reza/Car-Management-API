const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  car_name: {type : 'string', min: 3, max: 255},
  car_size: {type : 'string', min: 5, max: 255},
  car_type: {type : 'string', min: 3, max: 255},
  car_photo: {type : 'string', min: 3, max: 255},
  car_price: {type : 'number', positive: true, integer: true},
}


exports.carValidator = (value) => {
  return v.validate(value, schema)
}
