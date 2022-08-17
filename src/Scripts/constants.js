export const userData = JSON.parse(localStorage.getItem("userData"));

export const config = {
  headers: {
    Authorization: `Bearer ${userData.token}`,
  },
};

export const backUrl = "https://projeto17-back.herokuapp.com/"