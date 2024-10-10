import User from '../models/user.js';

export const getAllUsers = async (req, res) => {
  console.log("getAllUsers")

  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    console.log(err);

    res.send({ message: "errore nella ricerca utenti" })
  }
}

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const findUser = await User.findById(id).populate('leagues teams roles') // Popolare le squadre dell'utente

    res.send(findUser);
  } catch (error) {
    res.status(500).send({ error: "Something went wrong" });
  }
};

export const createUser = async (req, res) => {
  const userData = req.body;
  console.log(userData)
  const newUser = new User(userData);
  console.log(newUser)

  try {
    const savedUser = await newUser.save();

    return res.status(201).send(savedUser);
  } catch (err) {
    console.log(err);

    res.status(400).send({ error: "Something went wrong" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const userData = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(id, userData);

    if (!updateUser) {
      return res.status(404).send({ error: "user not found" });
    }

    updateUser.save();

    res.send(updateUser);
    
  } catch (err) {
    console.log(err);

    res.status(400).send({ error: "Something went wrong" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id)

    // if (!userToDelete) return next();

    res.send({ message: "user deleted" })

  } catch (err) {
    console.log(err);

    res.status(400).send({ error: "Something went wrong" });
  }
};