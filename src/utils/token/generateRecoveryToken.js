import jwt from "jsonwebtoken";

const generateRecoveryToken = (userId) => {
  const payload = {userId};
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
};

export default generateRecoveryToken;