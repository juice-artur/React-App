const Homepage = () => {

    return (
        <div className="min-h-screen bg-gray-100">
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h1 className="text-2xl font-semibold mb-4">Create a New Board</h1>
            <form>
              <div className="mb-4">
                <label htmlFor="boardName" className="block text-gray-700 font-medium mb-2">Board Name</label>
                <input type="text" id="boardName" className="w-full border rounded px-3 py-2" placeholder="Enter board name" />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                  Create Board
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Homepage;
