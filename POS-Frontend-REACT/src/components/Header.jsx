const Header = ({ name }) => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">

      {/* LEFT SIDE */}
      <div>
        <h1 className="text-lg font-semibold text-slate-800">
          POS Dashboard
        </h1>
        <p className="text-xs text-slate-500">
          System Management Console
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="text-sm text-slate-600">
        Welcome,{" "}
        <span className="font-semibold text-slate-900">
          {name}
        </span>
      </div>

    </header>
  );
};

export default Header;
