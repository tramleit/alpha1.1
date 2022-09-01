import axios from "axios";

// PRINCIPAL FETCH

export const newFetch = async (type, url, params = null) => {
  const { alphaToken } = localStorage;
  if (!alphaToken) {
    window.location.reload();
    return console.log("Il n'y a pas de token, retour au login");
  }

  // const resToken = await axios.post(
  //   `${import.meta.env.VITE_API_URL}/auth/refreshToken`,
  //   { alphaToken, refreshedToken }
  // );

  // if (!resToken.data.alphaToken) {
  //   return console.log("Il n'y a pas de token, retour au login");
  // }

  // localStorage.setItem("alphaToken", resToken.data.alphaToken);

  let res = null;

  if (type === "get") {
    res = await axios.get(`${import.meta.env.VITE_API_URL}/${url}`, params);
  }
  if (type === "post") {
    res = await axios.post(`${import.meta.env.VITE_API_URL}/${url}`, params);
  }
  if (type === "patch") {
    res = await axios.patch(`${import.meta.env.VITE_API_URL}/${url}`, params);
  }
  if (type === "delete") {
    res = await axios.delete(`${import.meta.env.VITE_API_URL}/${url}`, params);
  }
  if (type === "image") {
    res = await axios.post(`${import.meta.env.VITE_API_URL}/${url}`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  // console.log("tout est cool");
  return res.data;
};

// LOGIN

export const verifMail = async (email) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/login/verif-mail`,
    { email }
  );
  // console.log(res);
  return res;
};

export const loginFunc = async (email, password) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/login/login`,
    { email, password }
  );
  if (res.status === 200 && res.data) {
    localStorage.setItem("alphaToken", res.data.alphaToken);
  }
  return res;
};

export const testApi = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
  if (res.status == "200") {
    var result = res.data;
    // console.log(result);
    return result;
  }
};

export const testNewFetch = async () => {
  const res = newFetch("get", "users");
  if (res.status == "200") {
    var result = res.data;
    // console.log(result);
    return result;
  }
};

// PERSONNAL INFOS

export const getInfosUser = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("post", "users/get-infos", {
    alphaToken: alphaToken,
  });
  return result;
};

export const updateMainInfosUser = async (mainInfos) => {
  const result = await newFetch("post", "users/update-main-infos", {
    mainInfos,
  });
  // console.log("result", result);
  return result;
};

export const getProfilPic = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("post", "users/get-profil-pic", {
    alphaToken,
  });
  return result;
};

// USER SELECT

export const getUserSelect = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("post", "users/get-users-select", {
    alphaToken,
  });
  // console.log(result);
  return result;
};

// CUSTOMERS

export const createCustomer = async (data) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("post", "customers/create-customer", {
    alphaToken,
    data,
  });
  return result;
};

export const updateCustomer = async (data) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("patch", "customers/update-customer", {
    alphaToken,
    data,
  });
  return result;
};

export const uploadCustomerPicName = async (newIdCustomer, imgsrc) => {
  // const { alphaToken } = localStorage;
  const result = await newFetch("post", "customers/upload-customer-pic-name", {
    newIdCustomer,
    imgsrc,
  });
  return result;
};

export const getAllCustomers = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("post", "customers/get-all-customers", {
    alphaToken,
  });
  return result;
};

export const deleteCustomer = async (id) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("post", "customers/delete-customer", {
    alphaToken,
    id,
  });
  return result;
};

export const getCustomer = async (id) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("post", "customers/get-customer", {
    alphaToken,
    id,
  });
  return result;
};

// USERS

export const getUsers = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("post", "users/get-users", { alphaToken });
  // console.log(result);
  return result;
};

export const createUser = async (newUser) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("post", "users/create-user", {
    alphaToken,
    newUser,
  });
  return result;
};

export const deleteUser = async (id) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("post", "users/delete-user", {
    alphaToken,
    id,
  });
  return result;
};

export const getUser = async (id) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("post", "users/get-user", {
    alphaToken,
    id,
  });
  return result;
};

export const updateUser = async (data) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("patch", "users/update-user", {
    alphaToken,
    data,
  });
  return result;
};

export const uploadUserPicName = async (imgsrc) => {
  const { alphaToken } = localStorage;
  const result = await newFetch("post", "users/upload-pic-name", {
    alphaToken,
    imgsrc,
  });
  return result;
};

// ACCESS

export const getAllAccess = async () => {
  const { alphaToken } = localStorage;
  const result = await newFetch("post", "access/get-all-access", {
    alphaToken,
  });
  // console.log(result);
  return result;
};
