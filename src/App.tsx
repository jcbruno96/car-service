import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { Switch, Route, useHistory } from "react-router-dom";

import CarsPage from "./pages/Cars/Cars";
import CarPage from "./pages/Car/Car";
import OwnersPage from "./pages/Owners/Owners";

import { Sidebar, Icon } from "./components";
import { MenuOption } from "./components/Sidebar/Sidebar";

const App = () => {
  const history = useHistory();
  const { palette } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [menuOption, setMenuOption] = useState<MenuOption>("cars");

  const handleCollapsedChange = () => {
    setCollapsed((prev) => !prev);
  };

  const handleToggleSidebar = () => {
    setToggled((prev) => !prev);
  };

  const handleOnMenuChange = (option: MenuOption) => {
    setMenuOption(option);
    history.push(`/${option}`);
  };

  return (
    <AppContainer>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        actualMenu={menuOption}
        handleToggle={handleToggleSidebar}
        handleCollapse={handleCollapsedChange}
        handleOnMenuChange={handleOnMenuChange}
      />
      <Main>
        <Navbar>
          <IconContainer>
            <Icon
              icon="bars"
              size={20}
              color={palette.primary.color}
              onClick={handleToggleSidebar}
            />
          </IconContainer>
          <Logo
            src="https://pickit.com.ar/assets/PICKIT_NARANJA.svg"
            alt="logo"
          />
        </Navbar>
        <RouteContainer>
          <Routes></Routes>
        </RouteContainer>
      </Main>
    </AppContainer>
  );
};

export default App;

const Routes = () => {
  return (
    <Switch>
      <Route path="/car/:carId">
        <CarPage />
      </Route>
      <Route path="/owners">
        <OwnersPage />
      </Route>
      <Route path={["/cars", "/"]} exact>
        <CarsPage />
      </Route>
      <Route path="/">
        <h1>Not found page</h1>
      </Route>
    </Switch>
  );
};

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  background-color: #fff;
`;

const Main = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const RouteContainer = styled.div`
  padding: 16px;
  height: 100%;
`;

const Navbar = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  min-height: 70px;
  max-height: 70px;
  width: 100%;
  margin-bottom: 16px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.body};

  @media (max-width: 992px) {
    display: flex;
  }
`;

const IconContainer = styled.div`
  min-width: 44px;
  max-width: 44px;
  min-height: 44px;
  max-height: 44px;
  border-radius: 44px;
  border: 1px solid ${({ theme: { palette } }) => palette.primary.color};
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Logo = styled.img`
  height: 40px;
  object-fit: contain;
`;
