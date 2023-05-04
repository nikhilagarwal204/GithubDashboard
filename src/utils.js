import axios from "axios";

const baseUrl = `https://api.github.com/repos/${process.env.REACT_APP_GITHUB_OWNER}/${process.env.REACT_APP_GITHUB_REPO}`;

function fetchData(url) {
  return axios
    .get(`${baseUrl}/${url}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

export default fetchData;
