function Header() {
  const username = localStorage.getItem('username') || '';

  return (
    <header className='flex items-center justify-between gap-4 border-b bg-white px-6 py-3'>
      <div className='flex items-center gap-4'>
        <div className='text-lg font-bold'>POS</div>
        <p className='text-sm text-slate-500'>Point of Sale Dashboard</p>
      </div>
      <div className='flex items-center gap-3 text-sm text-slate-600'>
        <span>{username}</span>
      </div>
    </header>
  );
}

export default Header;
