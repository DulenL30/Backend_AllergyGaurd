import prisma from "../../prisma/prismaClient.js";

// export const addAllergy = async (req, res) => {
//   try {
//     const { allergies, severity } = req.body;

//     if (!allergies) {
//       return res.status(400).json({ error: "Allergies required" });
//     }

//     // delete old allergies
//     await prisma.allergyProfile.deleteMany({
//       where: { userId: req.user.userId },
//     });

//     // insert new ones
//     const created = await prisma.allergyProfile.createMany({
//       data: allergies.map((a) => ({
//         name: a,
//         userId: req.user.userId,
//         severity: severity,
//       })),
//     });

//     res.json({ message: "Profile saved", created });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to save allergies" });
//   }
// };

export const addAllergy = async (req, res) => {
  console.log("Hit backend");
  try {
    const { allergies, severity } = req.body;

    if (!allergies || !Array.isArray(allergies)) {
      return res.status(400).json({ error: "Allergies array required" });
    }

    const userId = req.user.userId;

    // remove old allergies
    await prisma.allergyProfile.deleteMany({
      where: { userId }
    });

    // insert new allergies
    const created = await prisma.allergyProfile.createMany({
      data: allergies.map((a) => ({
        name: a,
        severity: severity,
        userId: userId
      }))
    });

    res.json({
      message: "Allergies saved",
      count: created.count
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save allergies" });
  }
};

export const getAllergy = async (req, res) => {
  const allergies = await prisma.allergyProfile.findMany({
    where: { userId: req.user.userId },
  });

  res.json({
    allergies: allergies.map((a) => a.name),
    severity: allergies[0]?.severity || "Medium",
  });
};