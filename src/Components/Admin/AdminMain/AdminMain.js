import React from "react";
import { Route, Switch} from "react-router-dom";
import "./AdminMain.css";
import AdminUsersContent from "../AdminComponents/AdminUsersContent/AdminUsersContent";
import AdminNewsBlock from "../AdminNewsBlock/AdminNewsBlock";
import AdminAddNews from "../AdminAddNews/AdminAddNews";
import AdminEvents from "../AdminEvents/AdminEvents";

const AdminMain = () => {
  return (
    <Switch>
      <Route
        path="/admin-panel/dashboard"
        component={AdminUsersContent}
        exact
      />
      <Route path="/admin-panel/events" component={AdminEvents} />
      <Route path="/admin-panel/news" component={AdminNewsBlock} exact />
      <Route path="/admin-panel/news/create" component={AdminAddNews} />
    </Switch>
  );
};

export default AdminMain;
