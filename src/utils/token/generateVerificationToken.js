import jwt from "jsonwebtoken";

const generateVerificationToken = (email) => {
  const payload = { email };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
};

export default generateVerificationToken;