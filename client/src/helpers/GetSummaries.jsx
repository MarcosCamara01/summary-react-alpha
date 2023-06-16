import { Global } from './Global';

export const getSummaries = async (petition, id) => {

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(Global.url + `content/${petition}/` + id, {
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

    return data;
    
  } catch (error) {
    console.error(error);
    alert("Summaries could not be obtained");
    return [];
  }
};