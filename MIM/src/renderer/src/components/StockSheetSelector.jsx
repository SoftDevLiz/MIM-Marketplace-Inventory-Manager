import { useState } from "react"

function StockSheetSelector() {
    const [file, setFile] = useState("");

    return (
        <>
        <h1>Select stock sheet</h1>
        <button
            type="button"
            onClick={() => setFile("I work")}
        >Browse local files</button>
        <h2>{file}</h2>
        </>
    )

}

export default StockSheetSelector