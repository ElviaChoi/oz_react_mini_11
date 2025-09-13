const StatusLayout = ({ isLoading, error, loadingMessage, errorMessage, children }) => {
  if (isLoading) {
    return (
      <div className="text-center text-gray-300 mt-10 text-lg">
        {loadingMessage || "로딩중..."}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg">
        {errorMessage || "데이터를 불러오는데 실패했습니다."}
        {error.message && <p className="text-sm text-gray-500 mt-2">{error.message}</p>}
      </div>
    );
  }

  return <>{children}</>;
};

export default StatusLayout;
