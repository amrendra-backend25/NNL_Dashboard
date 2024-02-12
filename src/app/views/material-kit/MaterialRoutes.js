import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import DisplayNextians from './ProudNextians/DisplayNextians';
import DisplayMasterMind from './MasterMind/DisplayMasterMind';
import DisplayNextiansDetails from './NextiansDetails/DisplayNextiansDetails';
import DisplayPlanA from '../Courses/PlanA/DisplayPlanA';
import DisplayPlanB from '../Courses/PlanB/DisplayPlanB';
import DisplayPlanC from '../Courses/PlanC/DisplayPlanC';
import DisplayPlanZero from '../Courses/PlanZero/DisplayPlanZero';
import DisplayPlanNP from '../Courses/PlanNP/DisplayPlanNP';
import DisplayPlanUG from '../Courses/PlanUG/DisplayPlanUG';
import DisplayPlanMSC from '../Courses/PlanMSC/DisplayPlanMSC';
import DisplayPlanRRR from '../Courses/PlanRRR/DisplayPlanRRR';
import DisplayPlanTH from '../Courses/PlanTH/DisplayPlanTH';
import DisplayInnerPlanA from '../InnerCourses/InnerPlanA/DisplayInnerPlanA';
import DisplayInnerPlanB from '../InnerCourses/InnerPlanB/DisplayInnerPlanB';
import DisplayInnerPlanC from '../InnerCourses/InnerPlanC/DisplayInnerPlanC';
import DisplayInnerPlanZero from '../InnerCourses/InnerPlanZero/DisplayInnerPlanZero';
import DisplayInnerPlanNP from '../InnerCourses/InnerPlanNP/DisplayInnerPlanNP';
import DisplayInnerPlanUG from '../InnerCourses/InnerPlanUG/DisplayInnerPlanUG';
import DisplayInnerPlanMSC from '../InnerCourses/InnerPlanMSC/DisplayInnerPlanMSC';
import DisplayInnerPlanRRR from '../InnerCourses/InnerPlanRRR/DisplayInnerPlanRRR';
import DisplayInnerPlanTH from '../InnerCourses/InnerPlanTH/DisplayInnerPlanTH';
import ShowExams from './Exams/ShowExams';
import ShowFaq from './AllFAQ/ShowFaq';

const AppTable = Loadable(lazy(() => import('./tables/AppTable')));
const DisplayMaster = Loadable(lazy(() => import('./MasterMindDetails/DisplayMaster')));
const DisplaySuccessStories = Loadable(
  lazy(() => import('./SuccessStories/DisplaySuccessStories'))
);
const DisplayBlog = Loadable(lazy(() => import('./Blog/DisplayBlog')));
const DisplayBanner = Loadable(lazy(() => import('./UploadBanner/DisplayBanner')));
const DisplayOffersQueryForm = Loadable(
  lazy(() => import('./OffersQueryForm/DisplayOffersQueryForm'))
);
const DisplayVideos = Loadable(lazy(() => import('./VideoSnippts/DisplayVideos')));
const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')));
const QueryForm = Loadable(lazy(() => import('./QueryForm/QueryForm')));

const materialRoutes = [
  {
    path: '/display/mind',
    element: <DisplayMaster />,
  },

  {
    path: '/success/stories',
    element: <DisplaySuccessStories />,
  },
  {
    path: '/display/mastermind',
    element: <DisplayMasterMind />,
  },
  {
    path: '/display/blog',
    element: <DisplayBlog />,
  },
  {
    path: '/display/banner',
    element: <DisplayBanner />,
  },
  {
    path: '/offers/query',
    element: <DisplayOffersQueryForm />,
  },
  {
    path: '/video/snippts',
    element: <DisplayVideos />,
  },
  {
    path: '/all/faq',
    element: <ShowFaq />,
  },
  {
    path: '/query/form',
    element: <QueryForm />,
  },
  {
    path: '/nextians/details',
    element: <DisplayNextiansDetails />,
  },
  {
    path: '/display/nextians',
    element: <DisplayNextians />,
  },

  {
    path: '/all/exams',
    element: <ShowExams />,
  },

  // Courses Route Start here
  {
    path: '/courses/list',
    element: <DisplayPlanA />,
  },
  {
    path: '/courses',
    element: <DisplayPlanB />,
  },
  {
    path: '/courses/plan-c',
    element: <DisplayPlanC />,
  },
  {
    path: '/courses/plan-zero',
    element: <DisplayPlanZero />,
  },
  {
    path: '/courses/plan-np',
    element: <DisplayPlanNP />,
  },
  {
    path: '/courses/plan-ug',
    element: <DisplayPlanUG />,
  },
  {
    path: '/courses/plan-msc',
    element: <DisplayPlanMSC />,
  },
  {
    path: '/courses/plan-rrr',
    element: <DisplayPlanRRR />,
  },
  {
    path: '/courses/plan-th',
    element: <DisplayPlanTH />,
  },
  {
    path: '/inner/courses/plan-a',
    element: <DisplayInnerPlanA />,
  },
  {
    path: '/inner/courses/plan-b',
    element: <DisplayInnerPlanB />,
  },
  {
    path: '/inner/courses/plan-c',
    element: <DisplayInnerPlanC />,
  },
  {
    path: '/inner/courses/plan-zero',
    element: <DisplayInnerPlanZero />,
  },
  {
    path: '/inner/courses/plan-np',
    element: <DisplayInnerPlanNP />,
  },
  {
    path: '/inner/courses/plan-ug',
    element: <DisplayInnerPlanUG />,
  },
  {
    path: '/inner/courses/plan-msc',
    element: <DisplayInnerPlanMSC />,
  },
  {
    path: '/inner/courses/plan-rrr',
    element: <DisplayInnerPlanRRR />,
  },
  {
    path: '/inner/courses/plan-th',
    element: <DisplayInnerPlanTH />,
  },
];

export default materialRoutes;
