const base = '/jsx';
//const baseURL = 'http://localhost:7000/api/v1/';
const baseURL = 'http://43.205.148.119:7000/api/v1/';
const baseRoute = '/';
const imageURL = 'https://images.com';

export const Paths = {
  Home: base,
  LearningPath: baseRoute + 'Learning',
  EndpointsURL: {
    HomeNextians: baseURL + 'all/nextians',
    PostNextians: baseURL + 'nextians',
    GetNextians: baseURL + 'nextians',
    HomeTopForm: baseURL + 'all/form',
    DeleteNextians: baseURL + 'nextians/',
    EditNextians: baseURL + 'nextians/',
    OffersQueryForm: baseURL + 'all/form/offers',
    DeleteForm: baseURL + 'form/',
    DeleteFormOffers: baseURL + 'form/offers/',
    NNLCourses: baseURL + 'all/course/plan-a',
    PostNNLCourses: baseURL + 'course/plan-a',
    DeleteCourses: baseURL + 'course/plan-a/',
    HomeNNLCourses: baseURL + 'home/all/course/plan-a',
    PostHomeNNLCourses: baseURL + 'home/course/plan-a',
    DeleteHomeCourses: baseURL + 'home/course/plan-a/',
    HomeBanner: baseURL + 'home/all/banner',
    PostHomeBanner: baseURL + 'home/banner',
    DeleteHomeBanner: baseURL + 'home/banner/',
    HomeMasterMind: baseURL + 'home/all/mastermind',
    PostMasterMind: baseURL + 'home/mastermind',
    DeleteMasterMind: baseURL + 'home/mastermind/',
    VideoSnippts: baseURL + 'all/video/snippts',
    PostVideoSnippts: baseURL + 'video/snippts',
    DeleteVideoSnippts: baseURL + 'video/snippts/',
    HomeBlogs: baseURL + 'all/blogs',
    PostBlogs: baseURL + 'blogs',
    DeleteBlogs: baseURL + 'blogs/',
    HomeStories: baseURL + 'all/success/stories',
    PostStories: baseURL + 'success/stories',
    DeleteStories: baseURL + 'success/stories/',
    HomeFAQ: baseURL + 'all/faq',
    PostFAQ: baseURL + 'faq',
    DeleteFAQ: baseURL + '/faq',
    ShowExams: baseURL + 'all/exams',
    PostExams: baseURL + 'exams',
    DeleteExams: baseURL + '/exams',
  },
  imagePathURL: {
    URL: imageURL,
  },
};
