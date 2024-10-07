import { useState } from 'react'
import * as XLSX from 'xlsx'

function StockSheetSelector() {
    const [workbookData, setWorkbookData] = useState(null)

    // imports excel file from file system
    const importFile = async () => {
        try {
            const filePaths = await window.fileSystem.openFileDialog();
      
            const noFileSelected = filePaths.length === 0;
      
            if (noFileSelected) {
              throw new Error("No file selected");
            }
            
            const filePath = filePaths[0]
            
            // Request file reading from main process
            // and returns the data as a binary buffer
            const response = await window.fileSystem.readFile(filePath)

        } catch (error) {
          console.error("Error importing file:", error);
        }
      };

    return (
        <>
        <h1>Select stock sheet</h1>
        <button
            type="button"
            onClick={importFile}
        >Browse local files</button>
        </>
    )

}

export default StockSheetSelector