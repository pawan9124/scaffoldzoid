import faker from "faker";
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import Rate from "../models/Rate.js";

const TYPES_TOTAL = 15;
const USERS_TOTAL = 30;

export default async () => {
  try {
    await Profile.remove();
    await User.remove();
    await Rate.remove();

    //create the user
    await Array.from({ length: USERS_TOTAL }).forEach(async (_, i) => {
      const user = await User.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        isSeller: true,
        password: "password123",
      });
      /* Create the profile */
      const profile = await Profile.create({
        description: faker.lorem.sentence(),
        avatar: `https://randomuser.me/api/portraits/women/${i}.jpg`,
        user: user._id,
      });

      /* Create the types */
      await Array.from({ length: TYPES_TOTAL }).forEach(async () => {
        return await Rate.create({
          type: faker.name.firstName() + " " + faker.commerce.color(),
          rate: faker.commerce.price(),
          user: user._id,
        });
      });
    });
  } catch (error) {
    console.log("ERROR", error);
  }
};
