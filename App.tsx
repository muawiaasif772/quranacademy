import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
  useParams,
} from "react-router-dom";

import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Pricing from "./pages/Pricing";
import BookTrial from "./pages/BookTrial";
import Tutors from "./pages/Tutors";
import HowItWorks from "./pages/HowItWorks";
import { FAQ } from "./pages/FAQ";
import { Contact } from "./pages/Contact";
import { Reviews } from "./pages/Reviews";
import { COURSES } from "./data";
import { CheckCircle2, ArrowRight } from "lucide-react";
import CourseDetail from "./pages/Coursedetail";
import { PrivacyPolicy } from "./pages/Privacypolicy";
import { TermsOfService } from "./pages/Termsofservice";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

<CourseDetail />;

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:slug" element={<CourseDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/book-free-trial" element={<BookTrial />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/register" element={<BookTrial />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
