let hostDir = import.meta.env.VITE_HOST_DIR;

export const HOST_DIR = appendSlash(hostDir);
export const API_DIR = `${HOST_DIR}`;

function appendSlash(url) {
  return url[url.length - 1] === "/" ? url : url + "/";
}
