const asyncHandler = require("express-async-handler");
const connect = require("../config/database");

/**
 * @getCars gets a list of all cars
 * @route GET /api/cars/
 * @access PRIVATE
 * @by - George Imhandegbelo
 */
const getCars = asyncHandler(async (req, res) => {
  const [cars] = await connect.query("SELECT * FROM cars");
  res.status(200).json(cars);
});

/**
 * @addCars Adds a new car to list of all cars
 * @route POST /api/cars/
 * @access PRIVATE
 * @by - George Imhandegbelo
 */
const addCars = asyncHandler(async (req, res) => {
  const { capacity, car_number } = req.body;

  if (!req.body.capacity) {
    res.status(400);
    throw new Error("Please provide car capacity");
  }
  if (!req.body.car_number) {
    res.status(400);
    throw new Error("Please provide car plate number");
  }

  try {
    const [result] = await connect.query(
      "INSERT INTO cars (capacity, car_number) VALUES (?, ?)",
      [capacity, car_number]
    );
    res
      .status(201)
      .json({ message: "Car created successfully", car_id: result.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

/**
 * @updateCars edit a car
 * @route GET /api/cars/
 * @access PRIVATE
 * @by - George Imhandegbelo
 */
const updateCars = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { capacity, car_number } = req.body;

  try {
    const [result] = await connect.query(
      "UPDATE cars SET car_number = ?, capacity = ? WHERE id= ?",
      [car_number, capacity, id]
    );

    if (result.affectedRows === 0){
        res.status(404).json({message:'Bus not found or no change made'})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({message: `Server error: ${error}`})
  }
});

/**
 * @getCarById get a particular car from the list of all cars
 * @route GET /api/cars/
 * @access PRIVATE
 * @by - George Imhandegbelo
 */
const getCarById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await connect.query("SELECT * FROM cars WHERE id = ?", [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
});


const deleteCar = asyncHandler(async(req,res)=>{
    const {id} = req.params

try {
    const [result] = await connect.query('DELETE FROM cars WHERE id = ?', [id])
} catch (error) {
    console.log(error)
    res.status(500).json({ message: `Server error: ${error}` });
}

})

module.exports = { deleteCar, addCars, getCars, getCarById, updateCars };