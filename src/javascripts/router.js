import React from 'react'
import { Route, Router, IndexRoute, browserHistory, hashHistory, Redirect, IndexRedirect, useRouterHistory } from 'react-router'
// import { syncHistoryWithStore } from 'react-router-redux'
// import { createHashHistory } from 'history'
// import store from './store'
import config from './config'
import ProfilePage from './components/pages/ProfilePage'
import NotFoundPage from './components/pages/NotFoundPage'
import AboutPage from './components/pages/AboutPage'
import FeedbackPage from './components/pages/FeedbackPage'
import CalendarEmptyView from './components/pages/Calendar/CalendarEmptyView'
import CalendarListView from './components/pages/Calendar/CalendarListView'
import CalendarInProcessView from './components/pages/Calendar/CalendarInProcessView'
import AttachmentInvitationView from './components/pages/Attachment/AttachmentInvitationView'
import AttachmentClinicView from './components/pages/Attachment/AttachmentClinicView'
import AttachmentLayout from './components/pages/Attachment/AttachmentLayout'
import AttachmentPassportView from './components/pages/Attachment/AttachmentPassportView'
import AttachmentInsuranceView from './components/pages/Attachment/AttachmentInsuranceView'
import AttachmentContactsView from './components/pages/Attachment/AttachmentContactsView'
import AttachmentWhyPage from './components/pages/Attachment/AttachmentWhyPage'
import MeetingCreatePage from './components/pages/Meeting/MeetingCreatePage'
import AgreementPage from './components/pages/AgreementPage'
import MedicPage from './components/pages/MedicPage'
import MeetingPage from './components/pages/MeetingPage'
import ClinicPage from './components/pages/ClinicPage'
import UserLayout from './components/layouts/UserLayout'
import LoginPage from './components/pages/LoginPage'
import LogoutContainer from './containers/LogoutContainer'
import AuthLayout from './components/layouts/AuthLayout'
import RegisterPage from './components/pages/Register/RegisterPage'
import RecoveryPage from './components/pages/RecoveryPage'
import ConfirmationPage from './components/pages/ConfirmationPage'
import AttachmentRedirect from './containers/AttachmentRedirect'
import CalendarPage from './components/pages/Calendar/CalendarPage'
import MainLayout from './components/layouts/MainLayout'
import SettingsSystemView from './components/pages/Settings/SettingsSystemView'
import SettingsContactsView from './components/pages/Settings/SettingsContactsView'
import SettingsInsuranceView from './components/pages/Settings/SettingsInsuranceView'
import SettingsPassportView from './components/pages/Settings/SettingsPassportView'

// var history = syncHistoryWithStore(browserHistory, store);

// var appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

const routes = {
    path: config.HTTP_BASE_PATH,
    component: MainLayout,
    childRoutes: [
        {
            component: AuthLayout,
            indexRoute: { component: LoginPage },
            childRoutes: [
                { path: "index", component: LoginPage },
                { path: "login", component: LoginPage },
                { path: "register", component: RegisterPage },
                { path: "password", component: RecoveryPage },
                { path: "confirm/:confirmMode/:linkId", component: ConfirmationPage },
                { path: "agreement", component: AgreementPage }
            ]
        },
        {
            component: UserLayout,
            childRoutes: [
                { path: "logout", component: LogoutContainer },
                { path: "profile", component: ProfilePage },
                { path: "about", component: AboutPage },
                { path: "settings/contacts", component: SettingsContactsView },
                { path: "settings/insurance", component: SettingsInsuranceView },
                { path: "settings/passport", component: SettingsPassportView },
                { path: "settings/system", component: SettingsSystemView },
                { component: AttachmentRedirect, childRoutes: [
                    { path: "calendar", component: CalendarPage,
                        indexRoute: { component: CalendarListView },
                        childRoutes: [
                            { path: "empty", component: CalendarEmptyView },
                            { path: "in-process", component: CalendarInProcessView },
                            { path: "list", component: CalendarListView }
                        ]
                    },
                ]},
                { path: "meetings/:meetingId", component: MeetingPage },
                { path: "medics/:medicId", component: MedicPage },
                { path: "clinics/:clinicId", component: ClinicPage },
                { path: "attachment", component: AttachmentInvitationView},
                { path: "attachment/why", component: AttachmentWhyPage },
                { path: "feedback", component: FeedbackPage },
                { path: "attachment", component: AttachmentLayout,
                    childRoutes: [
                        { path: "clinic", component: AttachmentClinicView },
                        { path: "passport", component: AttachmentPassportView },
                        { path: "insurance", component: AttachmentInsuranceView },
                        { path: "contacts", component: AttachmentContactsView }
                    ]
                },
                { path: "meeting", component: MeetingCreatePage},
                { path: "meeting/:receptionId", component: MeetingCreatePage}
            ]
        },
        { path: "*", component: NotFoundPage } // обязательно быть только в конце списка роутов
    ]
};

export default <Router history={browserHistory} routes={routes}/>