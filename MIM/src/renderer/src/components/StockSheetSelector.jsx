import { useState } from "react"

function StockSheetSelector() {
    const [file, setFile] = useState("")

    const handleBrowse = async () => {
        const filePath = await window.dialog.openFileDialog()

        if (filePath) {
            setFile(filePath)
        }
    }

    return (
        <>
        <h1>Select stock sheet</h1>
        <button
            type="button"
            onClick={handleBrowse}
        >Browse local files</button>
        <h2>{file}</h2>
        </>
    )

}

export default StockSheetSelector