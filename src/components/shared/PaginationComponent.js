import React from 'react';

export const PaginationComponent = ({ total, pageSize, page, setPage }) => {
  return (
    <div className="flex space-between">
      <p>
        <b>{total}</b> results
      </p>
      <div className="flex">
        {total > 0 && (
          <p>
            <b>
              Page {page} of {Math.ceil(total / pageSize)}
            </b>
          </p>
        )}

        <button
          className={`btn btn-white ${page === 1 ? 'disabled' : ''}`}
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          Previous
        </button>
        <button
          className={`btn btn-white ${
            page >= total / pageSize ? 'disabled' : ''
          }`}
          onClick={() => {
            if (page < total / pageSize) {
              setPage(page + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
