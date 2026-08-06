import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LandingPage } from '@/pages/LandingPage';
import { TopicConceptPage } from '@/pages/TopicConceptPage';

export function App() {
  return (
    <BrowserRouter basename="/Adv-Calculus-Recap">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/topics/:topicSlug" element={<TopicConceptPage />} />
        <Route path="/topics/:topicSlug/:subtopicSlug" element={<TopicConceptPage />} />
      </Routes>
    </BrowserRouter>
  );
}
