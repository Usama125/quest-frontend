import { Switch, withRouter } from "react-router-dom";
import AdminRoute from "../../ProtectedRoutes/AdminRoute";
import Games from './Games';
import Quests from './Quests';
import City from './City'
import Clues from './Clues';

const AdminRouter = withRouter(({ match, ...props }) => {
    return (
        <Switch {...props}>
            <AdminRoute exact path={`${match.path}/quests`}>
                <Quests />
            </AdminRoute>
            <AdminRoute exact path={`${match.path}/cities`} >
                <City />
            </AdminRoute>
            <AdminRoute exact path={`${match.path}/games`} >
                <Games />
            </AdminRoute>
            <AdminRoute exact path={`${match.path}/clues`} >
                <Clues />
            </AdminRoute>
        </Switch>
    )
});

export default AdminRouter;
