import { Switch, withRouter } from "react-router-dom";
import AdminRoute from "../../ProtectedRoutes/AdminRoute";
import Games from './Games';
import GameTypes from './GameTypes';
import Town from './Town'
import Clues from './Clues';
import GameInfo from './Games/components/GameInfo';

const AdminRouter = withRouter(({ match, ...props }) => {
    return (
        <Switch {...props}>
            <AdminRoute exact path={`${match.path}/game-types`}>
                <GameTypes />
            </AdminRoute>
            <AdminRoute exact path={`${match.path}/towns`} >
                <Town />
            </AdminRoute>
            <AdminRoute exact path={`${match.path}/games`} >
                <Games />
            </AdminRoute>
            <AdminRoute exact path={`${match.path}/game/:id`} >
                <GameInfo />
            </AdminRoute>
            <AdminRoute exact path={`${match.path}/clues`} >
                <Clues />
            </AdminRoute>
        </Switch>
    )
});

export default AdminRouter;
