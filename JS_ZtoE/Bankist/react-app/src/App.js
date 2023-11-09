import "./globals.css";
import Header from "./Header";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import ScrollContextProvider from "./context/scrollContext";
import Footer from "./Footer";

function App() {
  return (
    <ScrollContextProvider>
      <div className="App">
        <Header />
        <Section1 />
        <Section2 />
        <Section3 />
        <Footer />
      </div>
    </ScrollContextProvider>
  );
}

export default App;
