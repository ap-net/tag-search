import React, { useState, useEffect } from 'react';
import fetchTags from '../Api';

const TagsList = () => {
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tagsPerPage, setTagsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTags = async () => {
      try {
        const fetchedTags = await fetchTags();
        setTags(fetchedTags);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tags:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    getTags();
  }, []);

  const indexOfLastTag = currentPage * tagsPerPage;
  const indexOfFirstTag = indexOfLastTag - tagsPerPage;
  const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handlePerPageChange = (e) => {
    const newPerPage = parseInt(e.target.value);
    setTagsPerPage(newPerPage);
    setCurrentPage(1); 
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && (
        <div>
          <h2>StackOverflow Tags</h2>
          <label>
            Liczba elementów na stronie:
            <input type="number" value={tagsPerPage} onChange={handlePerPageChange} />
          </label>
          <table>
            <thead>
              <tr>
                <th>Nazwa Tagu</th>
                <th>Liczba postów</th>
              </tr>
            </thead>
            <tbody>
              {currentTags.map(tag => (
                <tr key={tag.name}>
                  <td>{tag.name}</td>
                  <td>{tag.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="pagination">
            <li>
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                Poprzednia
              </button>
            </li>
            {Array.from({ length: Math.ceil(tags.length / tagsPerPage) }).map((_, index) => {
              const firstPage = Math.max(1, currentPage - 2);
              const lastPage = Math.min(Math.ceil(tags.length / tagsPerPage), firstPage + 4);
              if (index + 1 >= firstPage && index + 1 <= lastPage) {
                return (
                  <li key={index} className={index + 1 === currentPage ? 'active' : ''}>
                    <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                  </li>
                );
              }
              return null;
            })}
            <li>
              <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(tags.length / tagsPerPage)}>
                Następna
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TagsList;
