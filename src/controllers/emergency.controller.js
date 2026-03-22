import prisma from "../../prisma/prismaClient.js";

export const addContact = async (req, res) => {
  const contact = await prisma.emergencyContact.create({
    data: {
      name: req.body.name,
      phone: req.body.phone,
      userId: req.user.userId
    }
  });
  res.json(contact);
};
