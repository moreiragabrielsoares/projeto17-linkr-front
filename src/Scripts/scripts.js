export function arrayContains(word, arr) {
  return arr.indexOf(word) > -1;
}

export function errorTreatment(error) {
  if (error.response.status === 500) {
    return alert(
      "An error occured while trying to fetch the posts, please refresh the page"
    );
  }
  return alert(error.response.data);
}