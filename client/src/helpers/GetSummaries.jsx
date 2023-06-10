import { Global } from './Global';

export const getSummaries = async () => {
  try {
    const response = await fetch(Global.url + "summaries", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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