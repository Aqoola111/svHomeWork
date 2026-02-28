import Dashboard from './components/dashboard'
import Footer from './components/footer'
import Header from './components/header'

function App() {
  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <Dashboard />
      </main>

      <Footer />
    </div>
  )
}

export default App
