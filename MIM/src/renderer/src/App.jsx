// import electronLogo from './assets/electron.svg'
import StockSheetSelector from "./components/StockSheetSelector"

function App() {
  // const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div className="settings-container">
        <div className="settings-left">
            <StockSheetSelector></StockSheetSelector>
        </div>
        <div className="settings-right">Select mode</div>
      </div>
    </>
  )
}

export default App

