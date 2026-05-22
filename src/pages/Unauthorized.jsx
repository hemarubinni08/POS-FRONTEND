const Unauthorized = () => {

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg text-center">

        <h1 className="text-5xl font-bold text-red-500 mb-5">
          Unauthorized
        </h1>

        <p className="text-gray-600 text-lg">
          You do not have permission to access this page.
        </p>

      </div>

    </div>
  )
}

export default Unauthorized