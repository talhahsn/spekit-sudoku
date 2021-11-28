import React from "react";
import { Grid } from "@material-ui/core";
import { PageContainer } from "../../shared-components";
import Sudoku from "../../components/sudoku";

function SudokuPage() {
  return (
    <PageContainer>
      <Grid container spacing={10}>
        <Grid item xs={12} style={{ padding: "15px" }}>
          <Sudoku></Sudoku>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default SudokuPage;
