import { BrowserRouter } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </>

    //   <>
    //   <Router>
    //     <Routes>
    //       <Route exact path="/mobilelogin" element={<LoginAccountMoble />} />
    //       <Route path="/" element={<Register />} />
    //       <Route exact path="/otp" element={<OtpVerification />} />
    //       <Route exact path="/profile" element={<Profilee />} />
    //       <Route exact path="/property" element={<Property />} />
    //       <Route exact path="/savedpro" element={<SavedData />} />
    //       <Route exact path="/saveDetails" element={<SaveDetailsPro />} />
    //     </Routes>
    //   </Router>
    // </>
  );
}
