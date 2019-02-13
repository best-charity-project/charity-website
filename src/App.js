import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/MainPage';
import Contacts from './Pages/Contacts/Contacts';
import Library from './Pages/Library/Library';
import LibraryCard from './Components/LibraryCard/LibraryCard';
import UserLogin from './Pages/UserLogin/UserLogin';
import Projects from './Pages/Projects/Projects';
import Error from './Components/Error/Error';
import Admin from './Pages/Admin/Admin';
import Events from './Pages/Events/Events';
import EventsMap from './Components/EventsMap/EventsMap';
import PageNews from './Pages/News/News';
import EducationWay from './Pages/EduactionWay/EducationWay';
import EducationWayPeopleList from './Pages/EducationWayPeopleList/EducationWayPeopleList';
import FullNews from './Components/FullNews/FullNews';
import AdminMain from './Components/Admin/AdminMain/AdminMain';
import AdminEvents from './Components/Admin/AdminEvents/AdminEvents';
import AdminCreateEvent from './Components/Admin/AdminComponents/AdminCreateEvent/AdminCreateEvent';
import AdminNewsBlock from './Components/Admin/AdminNewsBlock/AdminNewsBlock';
import AdminAddNews from './Components/Admin/AdminAddNews/AdminAddNews';
import AdminLibrary from './Components/Admin/AdminLibrary/AdminLibrary';
import AdminLibraryAdd from './Components/Admin/AdminComponents/AdminLibraryAdd/AdminLibraryAdd';
import AdminProjectsBlock from './Components/Admin/AdminProjectsBlock/AdminProjectsBlock';
import AdminAddProjects from './Components/Admin/AdminAddProjects/AdminAddProjects';
import AdminFiltersBlock from './Components/Admin/AdminFiltersBlock/AdminFiltersBlock';
import AdminForumBlock from './Components/Admin/AdminForumBlock/AdminForumBlock';
import AdminEduWay from './Components/Admin/AdminEduWay/AdminEduWay';
import EduWayPeoples from './Components/Admin/EduWayPeople/EduWayPeoples';
import EduListRegistration from './Pages/EducationWayPeopleList/EduListRegistration/EduListRegistration';
import { PublicLayout, PrivateLayout } from './Components/Common/Layouts/MainLayout';
import AdminLayout from './Components/Common/Layouts/AdminLayout';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="container-main">
          <Switch>
            <PublicLayout path="/" component={Home} exact />
            <PublicLayout path="/projects" component={Projects} />
            <Route path="/user-login" component={UserLogin} />
            <Route path="/login" component={Admin} />
            <PublicLayout path="/events" component={Events} exact />
            <PublicLayout path="/events/map" component={EventsMap} />
            <PublicLayout path="/education-way" component={EducationWay} />
            <PrivateLayout protectLink='/user-login' path="/education-way-people-list" component={EducationWayPeopleList} />
            <PrivateLayout protectLink='/user-login' path="/education-way-people-list-registration" component={EduListRegistration} />
            <AdminLayout path="/admin-panel" component={AdminMain} exact />
            <AdminLayout path="/admin-panel/dashboard" component={AdminMain} />
            <AdminLayout path="/admin-panel/events" component={AdminEvents} exact />
            <AdminLayout path="/admin-panel/events/create" component={AdminCreateEvent} />
            <AdminLayout path="/admin-panel/library" component={AdminLibrary} exact />
            <AdminLayout path="/admin-panel/library/create" component={AdminLibraryAdd} />
            <AdminLayout path="/admin-panel/news" component={AdminNewsBlock} exact />
            <AdminLayout path="/admin-panel/news/create" component={AdminAddNews} />
            <AdminLayout path="/admin-panel/projects" component={AdminProjectsBlock} exact />
            <AdminLayout path="/admin-panel/projects/create" component={AdminAddProjects} />
            <AdminLayout path="/admin-panel/filters" component={AdminFiltersBlock} exact />
            <AdminLayout path="/admin-panel/forum" component={AdminForumBlock} exact />
            <AdminLayout path="/admin-panel/eduway" component={AdminEduWay} exact />
            <AdminLayout path="/admin-panel/eduwaypeoples" component={EduWayPeoples} exact />
            <PublicLayout path="/news/:id" component={FullNews} />
            <PublicLayout path="/news" component={PageNews} />
            <PublicLayout path="/library" component={Library} exact />
            <PublicLayout path="/library/:id" component={LibraryCard} />            
            <PublicLayout path="/contacts" component={Contacts} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
