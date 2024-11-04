import * as XLSX from 'xlsx'
import Button from '@mui/material/Button'

const fakeBarcode = 1234567;

function StockSheetSelector() {

    // imports excel file from file system
    const importFile = async () => {

      /** The column index of the "barcode" column */
      let barcodeColIndex = null

      /** The column index of the "qty" column */
      let qtyColIndex = null

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

            /* TODO:
                  2. +1 to QTY col
               
               QOL + Err considerations:
                  2. Consider splitting the file importing and the file processing into two different 
                      try/catch blocks for easier error finding            
            */
          
            // Identifies column indexes via the headers
            if (jsonData.length > 0) {
              const headers = jsonData[0]
              barcodeColIndex = headers.indexOf('Barcode')
              console.log(barcodeColIndex)
              qtyColIndex = headers.indexOf('QTY')
              console.log(qtyColIndex)
            }

            // Loops through rows of specified column and finds matching barcode
            for (const row of jsonData.slice(1)) {
              const cellValue = row[barcodeColIndex]
              if (cellValue === fakeBarcode) {
                console.log(cellValue)
              } else {
                console.log("Barcode not found")
              }
            }

        } catch (error) {
          console.error("Error importing/processing file (renderer):", error);
        }
      };

    return (
        <>
        <h1>Select stock sheet</h1>
        <Button variant="contained"
            type="button"
            onClick={importFile}
        >Browse local files</Button>
        </>
    )

}

export default StockSheetSelector

