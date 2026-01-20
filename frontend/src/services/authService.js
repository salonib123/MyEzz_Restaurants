export const login = async ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password) {
        reject(new Error("Email and password is required"));
      } else {
        resolve({
          user: {
            id: "mock-user-id",
            email,
          },
        });
      }
    }, 800);
  });
};

export const signup = async ({ name, email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!name || !email || !password) {
        reject(new Error("All fields are required"));
      } else {
        resolve({
          user: {
            id: "mock-user-id",
            name,
            email,
          },
        });
      }
    }, 800);
  });
};
