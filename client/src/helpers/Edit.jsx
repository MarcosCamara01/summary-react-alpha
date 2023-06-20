import { Global } from './Global';

export const edit = async (petition, id, body = {}) => {

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(Global.url + `content/${petition}/` + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    console.log(data)

    if (data.status !== "success") {
      console.error(data.error);
      alert("Summaries could not be saved");
    }

    return data;
    
  } catch (error) {
    console.error(error);
    alert("Summaries could not be saved");
    return [];
  }
};