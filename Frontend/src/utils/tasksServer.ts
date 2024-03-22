import getResource from './common';

const getAllTasks = (): Promise<any[]> => {
    const baseurl = import.meta.env.VITE_API_BASE_URL

  return getResource(`${baseurl}/tasks`);
}

export { getAllTasks };