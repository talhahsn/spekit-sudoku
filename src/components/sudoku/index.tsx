import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Grid } from "@material-ui/core";
import "./sudoku-style.css";
import API, { encodeParams } from "../../services/api-service";
import { Button, FormControl, Select, MenuItem, Chip } from "@material-ui/core";
import {
  DifficultyLevelState,
  difficultyLevelsList,
  BoardValuesState,
} from "./interfaces";

const StyledH2 = styled.h2`
  text-align: left;
  font-family: "Josefin Sans";
  letter-spacing: 0.55px;
  color: #020a20;
  opacity: 1;
`;

function Sudoku() {
  const boardSize = 9;
  const [boardStatus, setBoardStatus] = useState<string>("unsolved");
  const [boardValues, setBoardValues] = useState<BoardValuesState>({
    values: [[]],
  });

  //#region Difficulty Level Dropdown Values
  const [difficultyLevels] = useState<DifficultyLevelState>({
    list: difficultyLevelsList,
  });
  const [selectedDifficultyLevel, setSelectedDifficultyLevel] =
    useState<string>("random");
  //#endregion

  const populateBoard = async () => {
    const response = await fetchBoardValues();
    await fetchGrade(response);
  };

  const fetchBoardValues = async (difficulty = "random") => {
    const { data } = await API.get("board", { params: { difficulty } });
    setBoardValues({ values: data.board });
    return data.board;
  };

  const fetchGrade = async (boardValues: Array<Array<number>>) => {
    const { data } = await API.post(
      "grade",
      encodeParams({ board: boardValues }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded;" } }
    );
    setSelectedDifficultyLevel(data.difficulty);
  };

  const validate = async () => {
    const { data } = await API.post(
      "validate",
      encodeParams({ board: boardValues.values }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded;" } }
    );
    setBoardStatus(data.status);
  };

  const solve = async () => {
    const { data } = await API.post(
      "solve",
      encodeParams({ board: boardValues.values }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded;" } }
    );
    setBoardStatus(data.status);
    setBoardValues({ values: data.solution });
    setSelectedDifficultyLevel(data.difficulty);
  };

  useEffect(() => {
    populateBoard();
  }, []);

  const clearBoard = async () => {
    setBoardValues({ values: Array(9).fill(Array(9).fill(0)) });
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} className={"header"}>
          <Grid item xs={4}></Grid>
          <Grid item xs={2}>
            <StyledH2>SUDOKU</StyledH2>
          </Grid>
          <Grid item xs={2}>
            <a href="https://spekit.com/">
              <img
                alt="Spekit"
                className="right-float"
                src="https://spekit.com/wp-content/themes/spekit2021/assets/spekit-logo.svg"
              />
            </a>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Grid item xs={12}>
          <React.Fragment>
            <div className={"control-panel"}>
              <div className={"section"}>
                <h3>Generate:</h3>
                <FormControl className={"formControl"}>
                  <Select
                    value={selectedDifficultyLevel}
                    onChange={(event: any) => {
                      setSelectedDifficultyLevel(event.target.value);
                      fetchBoardValues(event.target.value);
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {difficultyLevels &&
                      difficultyLevels.list.map((level, index) => (
                        <MenuItem key={index} value={level.value}>
                          {level.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <Button
                  className="right-float"
                  onClick={clearBoard}
                  variant="contained"
                  color="secondary"
                >
                  Clear
                </Button>
              </div>
              <div className={"section"}>
                <Button variant="outlined" onClick={validate}>
                  Validate
                </Button>
                <Chip className="board-status" label={boardStatus} />
                <Button
                  className="right-float"
                  onClick={solve}
                  variant="contained"
                  color="primary"
                >
                  Solve
                </Button>
              </div>
            </div>
          </React.Fragment>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "end" }}>
          <React.Fragment>
            <div className={"sudoku-board"}>
              {boardValues &&
                boardValues.values.map((row: Array<number>, i) =>
                  row.map((column: any, j) => (
                    <input
                      value={column !== 0 ? column : ""}
                      key={`${i}_${j}`}
                      min={1}
                      max={boardSize}
                      type="number"
                      className={`row${i} col${j}`}
                      onChange={(event) => {
                        const value = event.target.value ? parseInt(event.target.value) : 0;
                        if (value >= 0 && value <= 9) {
                          const tempArray = JSON.parse(
                            JSON.stringify(boardValues.values)
                          );
                          tempArray[i][j] = value;
                          setBoardValues({ values: tempArray });
                          console.log(tempArray);
                        }
                      }}
                    />
                  ))
                )}
            </div>
          </React.Fragment>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Sudoku;
