import { Button, Center, Container, Heading, Input } from "native-base";
import styled from "styled-components";

export const AppCenter = styled(Center)`
background-color: #0d0d0d;
flex:1;
padding:0;
`

export const AppContainer = styled(Container)`
flex:1;
width:100%;
padding:0;
`

export const LoginHeading = styled.Text`
color:#e5e5e5;
font-family:Montserrat;
font-size:56px;
font-weight:500;
`

export const WelcomeText = styled.Text`
font-family:Montserrat;
font-size:68px;
font-weight:bold;
color:#565656;
margin-top:24px;
`

export const InputField = styled(Input)`
background-color:#414141;
height:52px;
margin-top:8px;
`;

export const DashboardButton = styled(Button)`
background-color:#FFE040;
height:52px;
`