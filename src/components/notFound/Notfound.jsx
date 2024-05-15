const NotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold mb-4 text-red-500">404 Not Found!</h1>
        <p className="text-lg text-gray-600">
          Oops! The page you are looking for does not exist.
        </p>
        <img src="https://img.freepik.com/free-vector/404-error-with-portals-concept-illustration_114360-7870.jpg"   alt="404 Not Found"  className="mt-8 max-w-full"
        />
      </div>
    );
  };
  
  export default NotFound;
  