import { authRoles } from 'app/auth/authRoles';

const chartsRoute = [{ path: '/charts/echarts', element: 'Loading...', auth: authRoles.editor }];

export default chartsRoute;
