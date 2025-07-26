export const useCors = () => {
  return {
    origin: ["http://localhost:5173", "http://localhost:5175"],
    credentials: true,
  };
};
