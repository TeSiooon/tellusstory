const ErrorDisplay = ({ errorText }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
      <p>{errorText}</p>
    </div>
  );
};

export default ErrorDisplay;
