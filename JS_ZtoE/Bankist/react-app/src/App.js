import "./globals.css";
import Header from "./Header";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import ScrollContextProvider from "./context/scrollContext";
import Footer from "./Footer";
import Section4 from "./Section4";
import CookieMessage from "./Cookie";

function App() {
  return (
    <ScrollContextProvider>
      <div className="App">
        <Header />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Footer />
        <CookieMessage />
      </div>
    </ScrollContextProvider>
  );
}

export default App;
