import { useState } from 'react'
import * as XLSX from 'xlsx'

const fakeBarcode = 12345678;

function StockSheetSelector() {
    const [barcodeColIndex, setBarcodeColIndex] = useState(null)

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

            // Parses the response into a workbook object so that
            // SheetJS can manipulate it. Parameters are there so that
            // SheetJS knows what type of data it is receiving in order
            // to parse it.
            const workbook = XLSX.read(response, { type: 'buffer' })

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            
            // Converts Excel sheet data into a JSON object. The header option
            // controls the output format - an array of arrays. See SheetJS docs for more options.
            const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1})

            console.log(jsonData)
            
            /* TODO:
                  1. Identify "barcode" column in the JSON
                  2. Search for the fake barcode inside of the barcode column
            */

            if (jsonData.length > 0) {
              const headers = jsonData[0]
              const indexOfBarcode = headers.indexOf('barcode')
              setBarcodeColIndex(indexOfBarcode)
            }

        } catch (error) {
          console.error("Error importing/processing file (renderer):", error);
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

