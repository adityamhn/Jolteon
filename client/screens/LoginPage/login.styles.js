import { Button, Center, Container, Heading, Input } from "native-base";
import styled from "styled-components";

export const AppCenter = styled(Center)`
  background-color: #0d0d0d;
  flex: 1;
  padding: 0;
`;

export const AppContainer = styled(Container)`
  flex: 1;
  width: 100%;
  padding: 0;
`;

export const LoginHeading = styled.Text`
  color: #e5e5e5;
  font-family: Montserrat;
  font-size: 56px;
  font-weight: 500;
`;

export const WelcomeText = styled.Text`
  font-family: MontserratBold;
  font-size: 40px;
  color: #565656;
  margin-top: 32px;
`;

export const InputField = styled(Input)`
  background-color: #414141;
  height: 50px;
  color: #f3f3f3;
`;

export const DashboardButton = styled(Button)`
  background-color: #ffe040;
  height: 52px;
`;
