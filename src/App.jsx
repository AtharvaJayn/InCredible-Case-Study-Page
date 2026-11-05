import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Header, Footer, ScrollToTop } from "./components/Site";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";
import FAQs from "./pages/FAQs";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies/:slug" element={<CaseStudy />} />
          <Route path="/faqs" element={<FAQs />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}