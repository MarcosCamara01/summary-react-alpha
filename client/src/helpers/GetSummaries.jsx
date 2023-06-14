import { Global } from './Global';

export const getSummaries = async () => {

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  try {
    const userObj = JSON.parse(user);
    const userId = userObj.id;

    const response = await fetch(Global.url + "content/summaries/" + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token
      }
    });

    const data = await response.json();

    console.log(data)

    if (data.status !== "success") {
      console.error(data.error);
      alert("Summaries could not be obtained");
    }

    return data.summaries;
  } catch (error) {
    console.error(error);
    alert("Summaries could not be obtained");
    return [];
  }
};