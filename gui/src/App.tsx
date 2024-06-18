import { useState } from "react";
import "./index.css";

type ResultDto = {
  resultValue?: number;
  error?: string;
  resultPosition: number;
};

export default function App() {
  const [position, setPosition] = useState<number>(0);
  const [resultDto, setResultDto] = useState<ResultDto | null>(null);

  async function handleSubmit(e): Promise<void> {
    e.preventDefault();

    const response = await fetch(
      `http://127.0.0.1:3010/getFibonacciValue?position=${position}`
    );
    const responseJson = await response.json();

    setResultDto({ ...responseJson, resultPosition: position });
  }

  return (
    <div className="form-container">
      <h2>Fibonacci app</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input-number"
          type="number"
          placeholder="position"
          value={position}
          min="0"
          onChange={(e) => setPosition(Number(e.target.value))}
        />
        <button className="button-submit">Get Result</button>
      </form>

      <ResultMessage resultDto={resultDto} />
    </div>
  );
}

function ResultMessage({ resultDto }: { resultDto: ResultDto | null }) {
  if (resultDto === null) {
    return <></>;
  }

  if (resultDto.error !== undefined) {
    return (
      <p className="result-text">{`The operation failed: ${resultDto.error}`}</p>
    );
  }

  if (resultDto.resultValue !== undefined) {
    return (
      <p className="result-text">{`The value in Fibonacci sequence on position ${resultDto.resultPosition} has value ${resultDto.resultValue}`}</p>
    );
  }

  return <></>;
}
