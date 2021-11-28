import React from "react";
import styled from "styled-components";

import { Container } from "@material-ui/core";

const StyledContainer = styled(Container)`
  min-width: 1600px;
`;

const ContainerWrapper = (props: any) => {
  return <StyledContainer fixed>{props.children}</StyledContainer>;
};

export default ContainerWrapper;
