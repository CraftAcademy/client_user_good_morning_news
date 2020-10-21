import React from "react";
import ArticlesList from "./components/ArticlesList";
import { Switch, Route } from "react-router-dom";
import SpecificArticle from "./components/SpecificArticle";
import NavigationBar from "./components/NavigationBar";
import LoginForm from "./components/LoginForm";
import SignUpForm from './components/SignUpForm'
import ProtectedRoutes from './components/ProtectedRoutes'
import BecomeSubscriber from './components/BecomeSubscriber'

const App = () => {
  return (
    <>
      <NavigationBar />
      <Switch>
        <Route exact path="/articles/:id" component={SpecificArticle} />
        <Route exact path="/category/:category" component={ArticlesList} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/sign-up" component={SignUpForm} />
        
        <ProtectedRoutes path="/become-subscriber">
          <BecomeSubscriber />
        </ProtectedRoutes>

        <Route exact path="/" component={ArticlesList} />
      </Switch>

    </>
  );
};
export default App;
