import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import CreateLab from './pages/CreateLab';
import CreateProject from './pages/CreateProject';
import { StatusConsole } from './components/StatusConsole';
import { ApiKeyPanel } from './components/ApiKeyPanel';

export default function App() {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <h1 className="admin-logo">ADMIN_OPS</h1>
        <nav>
          <NavLink to="/" end>Console</NavLink>
          <NavLink to="/post">New Post</NavLink>
          <NavLink to="/lab">New Lab</NavLink>
          <NavLink to="/project">New Project</NavLink>
        </nav>
      </aside>
      <main className="admin-main">
        <StatusConsole />
        <ApiKeyPanel />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<CreatePost />} />
          <Route path="/lab" element={<CreateLab />} />
          <Route path="/project" element={<CreateProject />} />
        </Routes>
      </main>
    </div>
  );
}
