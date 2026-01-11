import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './core/guard/auth-guard';
import { Candidates } from './pages/candidates/candidates';
import { Enrollment } from './pages/enrollment/enrollment';
import { SessionRecordings } from './pages/session-recordings/session-recordings';
import { BatchMaster } from './pages/bachmaster/bach-master';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'',
        component: Layout,
        children:[
            {
                path:'batch',
                component: BatchMaster
            },
             {
                path:'candidate',
                component: Candidates
            },
            {
                path:'enrollment',
                component: Enrollment
            },
             {
                path:'session-recordings',
                component: SessionRecordings
            },
            {
                path:'dashboard',
                component: Dashboard,
                canActivate: [authGuard]
            }
        ]
    }

];