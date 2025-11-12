import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

// ✅ CREATE (POST)
export const postUser = async (req, res) => {
  try {
    const {
      customerName,
      phoneNumber,
      emailAddress,
      city,
      pinCode,
      landmark,
      gender,
      customerType,
      installationDate,
      paymentMethod,
    } = req.body;

    if (!customerName || !phoneNumber || !emailAddress) {
      return res.status(400).json({
        error: "customerName, phoneNumber, or emailAddress is missing",
      });
    }

    const newUser = await prisma.User.create({
      data: {
        customerName,
        phoneNumber,
        emailAddress,
        city,
        pinCode,
        landmark,
        gender,
        customerType,
        installationDate,
        paymentMethod,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.code === "P2002") {
      return res.status(409).json({
        error: `User with this ${error.meta.target.join(", ")} already exists.`,
      });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};



// ✅ READ ALL USERS (GET)
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.User.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ READ SINGLE USER BY ID (GET /:id)
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.User.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ UPDATE USER (PUT - full update)
export const putUser = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await prisma.User.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await prisma.User.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ PARTIAL UPDATE (PATCH)
export const patchUser = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await prisma.User.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await prisma.User.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.status(200).json({
      message: "User partially updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error patching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ DELETE USER (DELETE)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await prisma.User.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    await prisma.User.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
