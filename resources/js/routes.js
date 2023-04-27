let DashboardComponent = () => import('./components/DashboardComponent.vue');
let DoctorComponent = () => import('./components/DoctorComponent.vue');
let PatientComponent = () => import('./components/PatientComponent.vue');
let AppointmentComponent = () => import('./components/AppointmentComponent.vue');
// let DashboardComponent = () => import('./components/ExampleComponent.vue');


export const routes = [
    {
        path:'/dashboard',
        name:'dashboard',
        component: DashboardComponent
    },
    {
        path:'/dashboard/doctors',
        name:'doctors',
        component: DoctorComponent
    },
    {
        path:'/dashboard/patients',
        name:'patients',
        component: PatientComponent
    },
    {
        path:'/dashboard/appointments',
        name:'appointments',
        component: AppointmentComponent
    },
];
