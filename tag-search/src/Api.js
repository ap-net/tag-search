
import axios from 'axios';

const BASE_URL = 'https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow';

const fetchTags = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          order: 'desc',
          sort: 'popular'
        }
      });
      return response.data.items;
    } catch (error) {
      console.error('Error fetching tags:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
      }
      throw new Error('Unable to fetch tags');
    }
  };
  
  

export default fetchTags;
