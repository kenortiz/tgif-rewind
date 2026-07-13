import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SettingsProvider } from "@/hooks/useSettings";
import Index from "./pages/Index.tsx";
import FridayPage from "./pages/FridayPage.tsx";
import Seasons from "./pages/Seasons.tsx";
import SeasonDetail from "./pages/SeasonDetail.tsx";
import Picker from "./pages/Picker.tsx";
import Settings from "./pages/Settings.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/friday/:date" element={<FridayPage />} />
            <Route path="/seasons" element={<Seasons />} />
            <Route path="/seasons/:year" element={<SeasonDetail />} />
            <Route path="/picker" element={<Picker />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SettingsProvider>
  </QueryClientProvider>
);

export default App;
