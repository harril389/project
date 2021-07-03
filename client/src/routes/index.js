import { Redirect, Route, Switch } from "react-router-dom";
import { InfoMember, TotalExam, ExamMember } from "pages/Member";
import { Organization, Unit, Leader, History } from "pages/Introduction";
import { PathConst } from "const";
import {
  ManageMember,
  Exam,
  Question,
  Analysis,
  TypeQuestion,
  ManageGroup,
  ManageClub,
  ManageBranch,
} from "pages/Admin";
import { Login, ResetPassword } from "components";
import { getUserToken } from "api/auth";

const PrivateRoute = props => {
  const isLogin = getUserToken();
  const { component: Component, ...rest } = props;
  return isLogin ? <Route {...rest} render={props => <Component {...props} />} /> : <Redirect to={PathConst.LOGIN} />;
};

const Routes = () => {
  return (
    <Switch>
      <Route exact component={Login} path={PathConst.LOGIN} />
      <Route exact component={ResetPassword} path={PathConst.NEW_PASSWORD} />

      <PrivateRoute exact component={InfoMember} path={PathConst.HOME_PAGE} />
      <PrivateRoute exact component={InfoMember} path={PathConst.INFORMATION_MEMBER} />
      <PrivateRoute exact component={Organization} path={PathConst.INTRO_BLOOD} />
      <PrivateRoute exact component={Unit} path={PathConst.UNIT_RECORDS} />
      <PrivateRoute exact component={Leader} path={PathConst.LEADER_BlOOD} />
      <PrivateRoute exact component={History} path={PathConst.HISTORY_BLOOD} />

      {/* exam member */}
      <PrivateRoute exact component={TotalExam} path={PathConst.TOTAL_EXAM} />
      <PrivateRoute exact component={ExamMember} path={PathConst.EXAM_BLOOD} />
      {/* admin */}
      <PrivateRoute exact component={ManageMember} path={PathConst.ADMIN_MANAGE_MEMBER} />
      <PrivateRoute exact component={Exam} path={PathConst.ADMIN_MANAGE_EXAM} />
      <PrivateRoute exact component={Question} path={PathConst.ADMIN_MANAGE_QUESTION} />
      <PrivateRoute exact component={Analysis} path={PathConst.ADMIN_MANAGE_ANALYSIS} />
      <PrivateRoute exact component={TypeQuestion} path={PathConst.ADMIN_MANAGE_TYPE_QUESTION} />

      <PrivateRoute exact component={ManageGroup} path={PathConst.ADMIN_MANAGE_GROUP} />
      <PrivateRoute exact component={ManageBranch} path={PathConst.ADMIN_MANAGE_BRANCH} />
      <PrivateRoute exact component={ManageClub} path={PathConst.ADMIN_MANAGE_CLUB} />
    </Switch>
  );
};

export default Routes;
