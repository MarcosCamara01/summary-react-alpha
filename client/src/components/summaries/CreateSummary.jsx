import { useState } from "react";
import { Global } from "../../helpers/Global";
import { SaveSummary } from "./SaveSummary";
import { Loader } from "../../helpers/Loader";

export default function CreateSummary() {
  const [imput, setimput] = useState("");
  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const [summaryType, setSummaryType] = useState("normal"); // Estado para controlar el tipo de resumen

  async function onSubmit(event) {
    setLoading(true);
    setSummary("");
    setTitle("");
    event.preventDefault();
    try {
      const response = await fetch(`${Global.url}content/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: imput, type: summaryType }), // Incluir el tipo de resumen en el cuerpo de la solicitud
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setSummary(data.summary);
      setTitle(data.title)
      setimput("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
      setLoading(false);
    }
  }

  return (
    <section className="create-section">
      <div>
        <h3>Summary</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Enter a text"
            value={imput}
            onChange={(e) => setimput(e.target.value)}
          />
          <select value={summaryType} onChange={(e) => setSummaryType(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="flashcard">Flash Card</option>
          </select>
          <button type="button" onClick={onSubmit} disabled={loading} className="button-submit">
            {loading ? <Loader size={24} color="#fff" /> : "Generate a Summary"}
          </button>
        </form>
        <div className="result">{title}</div>
        <div className="result">{summary}</div>
        {
          summary && (
            <SaveSummary summaryData={summary} titleData={title} />
          )
        }
      </div>
    </section>
  );
}
