import asyncHandler from "express-async-handler";

const getUserFakeData = asyncHandler (async (req, res) => {
  const userData = await fetch("https://dummyjson.com/users").then(
    async (data) => await data.json()
  );
  res.status(200).json(userData);
});

export { getUserFakeData };
