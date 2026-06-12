import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className='flex min-h-screen bg-slate-100'>
      <Sidebar/>

      <div className='flex flex-1 flex-col'>
        <Header/>

        <main className='flex flex-1 items-start justify-center p-8'>
          {children}
        </main>

        <Footer name={'Kushal'} />
      </div>
    </div>
  );
}

export default Layout;
