import { createStore, applyMiddleware, combineReducers } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import * as AuthRedux from "./auth.redux";
import * as QuestionRedux from "./question.redux";
import * as TypeQuestionRedux from "./typeQuestion.redux";
import * as ExamAdminRedux from "./examAdmin.redux";
import * as BranchRedux from "./branch.redux";
import * as ClubRedux from "./club.redux";
import * as GroupRedux from "./group.redux";
import * as PositionRedux from "./position.redux";
import * as SpecializedRedux from "./specialized.redux";
import * as UserRedux from "./user.redux";
import * as ExamUserRedux from "./examUser.redux";

import rootSaga from "sagas";

export const appReducer = combineReducers({
  authRedux: AuthRedux.reducer,
  questionRedux: QuestionRedux.reducer,
  typeQuestionRedux: TypeQuestionRedux.reducer,
  examAdminRedux: ExamAdminRedux.reducer,
  branchRedux: BranchRedux.reducer,
  clubRedux: ClubRedux.reducer,
  groupRedux: GroupRedux.reducer,
  positionRedux: PositionRedux.reducer,
  specializedRedux: SpecializedRedux.reducer,
  userRedux: UserRedux.reducer,
  examUserRedux: ExamUserRedux.reducer,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
