import { useState } from "react";
import { Global } from "../helpers/Global";
import { SaveSummary } from "./SaveSummary";

export default function CreateSummary () {
  const [imput, setimput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    setLoading(true);
    setResult("");
    event.preventDefault();
    try {
      const response = await fetch(`${Global.url}summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: imput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setimput("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
      setLoading(false);
    }
  }

  return (
    <>
      <h3>Summary</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Enter a text"
          value={imput}
          onChange={(e) => setimput(e.target.value)}
        />
        <input type="submit" value="Generate a summary" />
      </form>
      <div className="result">{result}</div>
      <div className="result">{loading ? "Loading..." : ""}</div>
      {
        result && (
          <SaveSummary summary={result}  />
        )
      }
    </>
  );
}
