import { findAllEntity } from "./Constants";

export const fetchALlEnitites = async () => {
    const data=[];
    try {
      const response = await fetch(findAllEntity);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      
    }
    return data;
  };