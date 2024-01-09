

// eslint-disable-next-line react/prop-types
export const Pagination = ({ perPage, totalData, paginate, currentPage }) => {
  const pageNumber = [];

  const style = "bg-primary text-white";

  for (let i = 1; i <= Math.ceil(totalData / perPage); i++) {
    pageNumber.push(i);
  }

  const prevPage = () => {
    if (currentPage !== 1) {
      paginate(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== pageNumber.length) {
      paginate(currentPage + 1);
    }
  };

  // if()

  return (
    <nav className="mr-12 mt-4 flex flex-row justify-center">
      <ul className="pagination flex flex-row justify-between gap-4">
        <div
          className={` ${
            currentPage === 1 ? "text-[#AFAFAF]" : "border-primary text-primary hover:bg-primary hover:text-white"
          } flex cursor-pointer items-center justify-center rounded-md border-2  bg-transparent px-3 py-1    hover:transition-colors `}
          onClick={prevPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        {pageNumber.map((number) => (
          <li
            onClick={() => paginate(number)}
            key={number}
            className={`flex cursor-pointer items-center justify-center rounded-md border-2 border-primary  px-3 py-1 text-primary hover:bg-primary hover:text-white  hover:transition-colors ${
              currentPage === number ? style : "bg-transparent"
            }`}
          >
            <a>{number}</a>
          </li>
        ))}
        <div
          className={`${
            currentPage === pageNumber.length ? "text-[#AFAFAF]" : "border-primary bg-transparent  text-primary hover:bg-primary hover:text-white"
          } flex cursor-pointer items-center justify-center rounded-md border-2 hover:transition-colors px-3 py-1`}
          onClick={nextPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </ul>
    </nav>
  );
};
