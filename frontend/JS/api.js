export const getCameras = async (route, method, data) => {
  return fetch(`http://localhost:3000/api/cameras/${route}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
