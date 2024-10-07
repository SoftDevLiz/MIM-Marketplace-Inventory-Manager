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
      
            const xlFile = filePaths[0];
            setFile(xlFile);
      
            const workbook = XLSX.read(file);
            console.log(workbook)
            const sheetName = workbook.SheetNames[0];
            console.log(sheetName)
            const sheet = workbook.Sheets[sheetName]
            console.log(sheet)
            const data = XLSX.utils.sheet_to_json(sheet)
      
            console.log(data);
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