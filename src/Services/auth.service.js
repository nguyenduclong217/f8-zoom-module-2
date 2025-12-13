import config from "../config.json";

// API REGISTER
export const registerAPi = async ({
  name,
  email,
  password,
  confirmPassword,
}) => {
  const response = await fetch(`${config.BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      confirmPassword,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

// API LOGIN
export const loginAPi = async ({ email, password }) => {
  const response = await fetch(`${config.BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
