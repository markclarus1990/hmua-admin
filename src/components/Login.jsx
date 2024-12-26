function Login({ googleSignIn, logo }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-peach-400 to-peach-600 text-black p-8 flex justify-center items-center">
      <div className="text-center">
        <img src={logo} alt="Logo" className="mb-20" />
        <h1 className="text-4xl font-extrabold mb-4">
          Let me achieve your Dream Look!
        </h1>
        <p className="text-lg mb-6">
          Please click the button below to start the booking process.
        </p>
        <div className="flex items-center justify-center">
          {" "}
          <button
            onClick={() => googleSignIn()}
            className="flex items-center gap-3 px-6 py-2 bg-peach-500 rounded-lg hover:bg-peach-600 transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/2504/2504914.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
