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

// Hint Album
export const hintApi = async () => {
  const response = await fetch(`${config.BASE_URL}/quick-picks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

// Album gợi ý
export const reminderAlbumApi = async () => {
  const response = await fetch(`${config.BASE_URL}/home/albums-for-you`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const todayHitApi = async () => {
  const response = await fetch(`${config.BASE_URL}/home/todays-hits`);
  const data = await response.json();
  return data;
};
// Moods
export const musicVnApi = async () => {
  const response = await fetch(`${config.BASE_URL}/moods`);
  const data = await response.json();
  return data;
};
// Moods Quick
export const listQuick = async (mood) => {
  const response = await fetch(`${config.BASE_URL}/quick-picks?mood=${mood}`);
  const data = await response.json();
  console.log(data);
  return data;
};

//Quick home
export const listItemsQuick = async (slug) => {
  const response = await fetch(
    `${config.BASE_URL}/playlists/details/${slug}?limit=50`
  );
  if (!response.ok) return;
  const data = await response.json();
  console.log(data);
  return data;
};
//Album 1 home

export const listAlbum1 = async (slug) => {
  const response = await fetch(`${config.BASE_URL}/albums/details/${slug}`);
  if (!response.ok) return;
  const data = await response.json();
  return data;
};

//  kham pha
export const newAlbums = async () => {
  const response = await fetch(`${config.BASE_URL}/explore/albums`);
  const data = await response.json();
  return data;
};

export const newVideos = async () => {
  const response = await fetch(`${config.BASE_URL}/explore/videos`);
  const data = await response.json();
  return data;
};

export const list_moods = async () => {
  const response = await fetch(`${config.BASE_URL}/explore/meta`);
  const data = await response.json();
  return data;
};

// Refresh_token
export const getNewToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await fetch(`${config.BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    if (!response.ok) {
      throw new Error("Unauthorize");
    }
    return response.json();
  } catch {
    return false;
  }
};

//Access_token / Lấy thông tin
export const infoUser = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) throw new Error("Chưa có token, vui lòng đăng nhập");
    const response = await fetch(`${config.BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Authorization");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message === "Authorization") {
      const newToken = await getNewToken();
      if (newToken) {
        localStorage.setItem("access_token", newToken.access_token);
        localStorage.setItem("refresh_token", newToken.refresh_token);
        return await infoUser();
      }
    }
  }
};

// Cập nhật thông  tin
export const updateInfoUser = async (name, email) => {
  let accessToken = localStorage.getItem("access_token");
  if (!accessToken) throw new Error("Chưa có token");

  const makeRequest = async (token) => {
    const res = await fetch(`${config.BASE_URL}/auth/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email }),
    });
    return res;
  };

  let response = await makeRequest(accessToken);

  if (response.status === 401) {
    getNewToken();
    if (!response.ok) throw new Error("Unauthorized");
  }

  return response.json();
};

export const changePasswordApi = async (
  oldPassword,
  password,
  confirmPassword
) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) throw new Error("Chưa có token");

    const response = await fetch(`${config.BASE_URL}/auth/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        oldPassword: oldPassword.trim(),
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Change password failed");
    }

    return data;
  } catch (err) {
    console.error("Change password error:", err.message);
    throw err;
  }
};

// playlists
export const playlists = async () => {
  const response = await fetch(`${config.BASE_URL}/playlists`);
  const data = response.json();
  return data;
};

//new-releases
export const newReleases = async () => {
  const response = await fetch(`${config.BASE_URL}/explore/new-releases`);
  const data = response.json();
  return data;
};
