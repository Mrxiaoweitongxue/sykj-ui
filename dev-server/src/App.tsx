import './App.css'
import { Button } from 'sykj-ui'
import 'sykj-ui/css/button/index.css'
function App() {
  return (
    <>
      <Button onClick={async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(1)
          }, 4000);
        })
      }} >按钮</Button>
    </>
  )
}

export default App
