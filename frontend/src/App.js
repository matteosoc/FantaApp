import './App.css';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Container } from 'react-bootstrap';

// import context provider
import AuthContextProvider from './context/AuthContext.jsx'

// import pagine
import DashboardRouter from './pages/DashboardRouter.jsx';
import CreateLeaguePage from './pages/CreateLeaguePage.jsx';
import CreatePlayersPage from './pages/CreatePlayers.jsx'
import CreateBonusMalus from './pages/CreateBonusMalus.jsx';
import LeagueDetails from './pages/LeagueDetails.jsx';
import ApplyBonusPage from './pages/ApplyBonusToPlayers.jsx';
import JoinLeagueForm from './pages/JoinLeagueForm.jsx';
import CreateTeamPage from './pages/CreateTeamPage.jsx';
import TeamDetails from './pages/TeamDetails.jsx';
import PlayerDetails from './pages/PlayerDetails.jsx';
import Help from './pages/Help.jsx'
import BonusDetails from './pages/BonusDetails.jsx';



function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <div className='max-height overflow-y py-4'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/help" element={<Help />} />
            <Route path="/dashboard" element={<DashboardRouter />} />
            <Route path="/createLeague" element={<CreateLeaguePage />} />
            <Route path="/create-players/:leagueId" element={<CreatePlayersPage />} />
            <Route path="/create-bonus-malus/:leagueId" element={<CreateBonusMalus />} />
            <Route path="/leagues/:leagueId" element={<LeagueDetails />} />
            <Route path="/players/:playerId/apply-bonus" element={<ApplyBonusPage />} />
            <Route path="/join-league" element={<JoinLeagueForm />} />
            <Route path="/leagues/:leagueId/create-team" element={<CreateTeamPage />} />
            <Route path="/teams/:teamId" element={<TeamDetails />} />
            <Route path="/players/:playerId" element={<PlayerDetails />} />
            <Route path="/bonus-malus/:bonusId" element={<BonusDetails />} />
          </Routes>
        </div >
      </Router>
      <Footer />
    </ AuthContextProvider>
  );
}

export default App;
