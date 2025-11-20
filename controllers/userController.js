// ✅ Correct
import { PrismaClient } from "../prisma/generated/index.js";
const prisma = new PrismaClient();

// ✅ CREATE (POST)
// frontend se data la rhi hu
export const postUser = async (req, res) => {
  try {
    const {
      Name,
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

    //     const customerName = req.body.customerName
    // const   phoneNumber = req.body.phoneNumber
    // const   emailAddress = req.body.emailAddress
    // const   city = req.body.city
    // const   pinCode = req.body.pinCode
    // const   landmark = req.body.landmark
    // const   gender = req.body.gender
    // const   customerType = req.body.customerType
    // const   installationDate = req.body.installationDate
    // const   paymentMethod = req.body.paymentMethod

    // yeh sari field available ni hain toh error de do
    if (!Name || !phoneNumber || !emailAddress) {
      return res.status(400).json({
        error: "customerName, phoneNumber, or emailAddress is missing",
      });
    }

    // User model me data save ho rha hai Prisma ke through
    const newUser = await prisma.User.create({
      data: {
        customerName: Name,
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

    // resoponce send kr rhe h user create ho gya h
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    // Server ya API me koi bhi error aaye to catch block chalega
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ READ ALL USERS (GET)
export const getUsers = async (req, res) => {
  try {
    // sara user lekr aa rhe h prisma se
    const users = await prisma.User.findMany();
    // responce m sara user send kr rhe hain
    res.status(200).json(users);
  } catch (error) {
    // server ya api m koyi v error aayega toh catch block chlega
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ READ SINGLE USER BY ID (GET /:id)
export const getUserById = async (req, res) => {
  try {
    // id recieve kr rhe h req.params se 
    const { id } = req.params;

    // database se us id ka user lekr aa rhe hain
    const user = await prisma.User.findUnique({
      where: { id: Number(id) },
    });
 
    // agr user ni mila toh error de do
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // user jo mila use res ke through send ke rhe hain
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ UPDATE USER (PUT - full update)
// ✅ UPDATE USER (PUT - poora user update karne ka function)
export const putUser = async (req, res) => {
  try {
    // 👉 yaha hum URL se id le rahe hain (jaise /user/5)
    const { id } = req.params;

// / 👉 database me jaa kar dekh rahe hain ki yeh id wala user exist karta hai ya nahi
    const existingUser = await prisma.User.findUnique({
      where: { id: Number(id) },
    });
//  agar user hi nahi mila toh hum seedha bol dete hain "user nahi mila"
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }


    
    // 👉 ab hum database ko bol rahe hain:
    // "is id wale user ko update kar do aur naye data req.body se le lo"
    const updatedUser = await prisma.User.update({
      where: { id: Number(id) },
      data: req.body,
    });
// 👉 yeh bolne ke liye ki "haan user update ho gaya, ye lo updated data"
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    //  agar server me koi badi problem aa gayi toh yeh wala part chalega
    console.error("Error updating user:", error);
    
    //  👉 client ko bata dete hain ki server me issue hai
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
