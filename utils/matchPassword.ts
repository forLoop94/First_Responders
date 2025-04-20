import bcrypt from "bcryptjs";

export const matchPassword = async (
  enteredPassword: string,
  savedHashedPassword: string
) => {
  return await bcrypt.compare(enteredPassword, savedHashedPassword);
};
