import { useState } from 'react'


function StockSheetSelector() {
    const [file, setFile] = useState("")

    const importFile = async () => {
        try {
          const filePaths = await window.fileSystem.openFileDialog();
          console.log(filePaths); 
        } catch (error) {
          console.error("Failed to open file dialog:", error);
        }
      };

    return (
        <>
        <h1>Select stock sheet</h1>
        <button
            type="button"
            onClick={importFile}
        >Browse local files</button>
        <h2>{file}</h2>
        </>
    )

}

export default StockSheetSelector