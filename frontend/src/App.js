import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Container } from 'react-bootstrap';
import AuthContextProvider from './context/AuthContext.jsx'
import DashboardRouter from './pages/DashboardRouter.jsx';
import CreateLeaguePage from './pages/CreateLeaguePage.jsx';
import CreatePlayersPage from './pages/CreatePlayers.jsx'
import CreateBonusMalus from './pages/CreateBonusMalus.jsx';
import LeagueDetails from './pages/LeagueDetails.jsx';
import ApplyBonusPage from './pages/ApplyBonusToPlayers.jsx';
import JoinLeagueForm from './pages/JoinLeagueForm.jsx';
import CreateTeamPage from './pages/CreateTeamPage.jsx';
import TeamDetails from './pages/TeamDetails.jsx';



function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <Container className='max-height'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<DashboardRouter />} />
            <Route path="/createLeague" element={<CreateLeaguePage />} />
            <Route path="/create-players/:leagueId" element={<CreatePlayersPage />} />
            <Route path="/create-bonus-malus/:leagueId" element={<CreateBonusMalus />} />
            <Route path="/leagues/:leagueId" element={<LeagueDetails />} />
            <Route path="/players/:playerId/apply-bonus" element={<ApplyBonusPage />} />
            <Route path="/join-league" element={<JoinLeagueForm />} />
            <Route path="/leagues/:leagueId/create-team" element={<CreateTeamPage />} />
            <Route path="/teams/:teamId" element={<TeamDetails />} />
          </Routes>
        </Container>
      </Router>
      <Footer />
    </ AuthContextProvider>
  );
}

export default App;
