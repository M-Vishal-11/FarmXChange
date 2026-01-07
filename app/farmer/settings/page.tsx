export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <button
        className="
          px-8 py-4 rounded-xl
          bg-red-500 text-white font-semibold
          shadow-md
          hover:bg-red-600 hover:shadow-lg
          active:bg-red-700
          transition-all duration-200
        "
      >
        Delete the account
      </button>
    </div>
  );
}
