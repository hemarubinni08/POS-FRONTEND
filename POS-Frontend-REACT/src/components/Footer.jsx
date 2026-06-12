const Footer = () => {
  return (
    <footer className="h-12 bg-white border-t flex items-center justify-between px-6 text-xs text-slate-500">

      {/* LEFT */}
      <p>
        © {new Date().getFullYear()} POS Management System
      </p>

      {/* RIGHT */}
      <p className="text-slate-400">
        Powered by UST | devPOD-1
      </p>

    </footer>
  );
};

export default Footer;