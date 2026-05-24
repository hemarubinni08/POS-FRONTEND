import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchNodes = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;

        const response = await axios.get('http://localhost:8080/api/node/listnodeforroles', { headers });
        const data = response.data;

        if (!mounted) return;
        if (Array.isArray(data)) {
          setNodes(data);
        } else if (Array.isArray(data?.nodes)) {
          setNodes(data.nodes);
        } else if (Array.isArray(data?.content)) {
          setNodes(data.content);
        } else {
          setNodes([]);
        }
      } catch (err) {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('userRole');
          navigate('/login');
          return;
        }
        setError(err?.response?.data?.message || err.message || 'Unable to load navigation items.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchNodes();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <aside className="w-72 h-screen bg-blue-600 text-white p-6 flex flex-col overflow-hidden">
          <div className="mb-10">
            <h2 className="text-2xl font-bold">POS Menu</h2>
            <p className="text-sm text-sky-100 mt-2">Use the sidebar to navigate.</p>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            {loading && <div className="text-sm text-slate-100">Loading menu...</div>}
            {error && <div className="text-sm text-red-200">{error}</div>}
            {!loading && !error && nodes.length === 0 && (
              <div className="text-sm text-slate-100">No menu items available.</div>
            )}
            {!loading && !error && nodes.map((node, index) => {
              const title =
                node.identifier ||
                node.name ||
                node.label ||
                node.path ||
                `Item ${index + 1}`;

              const path = node.path || '#';

              return (
                <Link
                  key={index}
                  to={path}
                  className="block rounded-2xl px-4 py-3 bg-blue-500/10 text-white hover:bg-blue-500/20 transition mb-2"
                >
                  {title}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={logout}
            className="mt-8 rounded-full bg-sky-500 px-4 py-3 font-semibold text-white hover:bg-sky-400 transition"
          >
            Logout
          </button>
        </aside>

        <main className="flex-1 p-10">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-[32px] bg-white p-10 shadow-xl">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Welcome to the dashboard</h1>
              <p className="text-slate-600 leading-8">
                You can manage your application features from here. Use the sidebar to navigate through different sections.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
