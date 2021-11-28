import axios from 'axios';

export default axios.create({
  baseURL: `https://sugoku.herokuapp.com/`
});

const encodeBoard = (board: any) =>
    board.reduce(
      (result: any, row: any, i: any) =>
        result +
        `%5B${encodeURIComponent(row)}%5D${
          i === board.length - 1 ? "" : "%2C"
        }`,
      ""
    );

export const encodeParams = (params: any) =>
    Object.keys(params)
      .map((key) => `${key}=%5B${encodeBoard(params[key])}%5D`)
      .join("&");