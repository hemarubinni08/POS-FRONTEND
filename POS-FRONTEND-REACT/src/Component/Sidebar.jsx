import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function Sidebar() {
  const [nodes, setNodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const response = await axiosInstance.get('/node/nodeForRole');
        setNodes(response.data);
      } catch (error) {
        console.error('Failed to fetch nodes', error);
      }
    };

    fetchNodes();
  }, []);

  return (
    <aside className='min-h-screen w-64 shrink-0 bg-slate-900 p-5 text-white shadow-xl'>
      <div className='mb-8'>
        <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-base font-bold'>
          POS
        </div>
        <h2 className='mt-5 text-lg font-bold'>Menu</h2>
        <p className='mt-1 text-sm text-slate-400'>Available nodes</p>
      </div>

      <nav className='flex flex-col gap-2'>
        {nodes.map((node) => (
          <button
            key={node.identifier}
            onClick={() => navigate(`/profile/${node.identifier.toLowerCase()}`)}
            className='w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white'
          >
            {node.identifier}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
