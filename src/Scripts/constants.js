export const userData = JSON.parse(localStorage.getItem("userData"));


export const config = {
  headers: {
    Authorization: `${localStorage.length!==0?`Bearer ${userData.token}`:""}`,
  },
};

export const backUrl = "https://projeto17-back.herokuapp.com/"