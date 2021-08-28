import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './Layout/pages-layout/pages-layout.component';


// DEMO PAGES

// Dashboards

import { AnalyticsComponent } from './Pages/Dashboards/analytics/analytics.component';

// Pages


// import { ForgotPasswordBoxedComponent } from './Pages/AuthPages/forgot-password-boxed/forgot-password-boxed.component';
import { LoginBoxedComponent } from './Pages/AuthPages/login-boxed/login-boxed.component';
import { RegisterBoxedComponent } from './Pages/AuthPages/register-boxed/register-boxed.component';


import { SingleMessageComponent } from './Pages/MainPages/single-message/single-message.component';
import { InteractiveMessageComponent } from './Pages/MainPages/interactive-message/interactive-message.component';
import { ScheduleMessageComponent } from './Pages/MainPages/schedule-message/schedule-message.component';
import { BulkMessageComponent } from './Pages/MainPages/bulk-message/bulk-message.component';
import { ReportsSingleMessageComponent } from './Pages/MainPages/report-singlemessage/report_single-message.component';
import { CreateSingleMessageComponent } from './Pages/MainPages/create-single-message copy/create-single-message.component';
import { CreateIntMessageComponent } from './Pages/MainPages/create-int-message/create-int-message.component';
import { CreateSchedMessageComponent } from './Pages/MainPages/create-sched-message/create-sched-message.component';
import { EditSingleMessageComponent } from './Pages/MainPages/edit-single-message/edit-single-message.component';
import { EditIntMessageComponent } from './Pages/MainPages/edit-int-message/edit-int-message.component';
import { PatientSingleMessageComponent } from './Pages/MainPages/patient-single-message/patient-single-message.component';
import { ComposeSingleMessageComponent } from './Pages/MainPages/patient-single-message/compose-single-message/compose-single-message.component';
import { PatientVideoMessageComponent } from './Pages/MainPages/patient-video-message/patient-video-message.component';
import { ComposeVideoMessageComponent } from './Pages/MainPages/patient-video-message/compose-video-message/compose-video-message.component';
import { PatientScheduleMessageComponent } from './Pages/MainPages/patient-schedule-message/patient-schedule-message.component';
import { PatientInteractiveMessageComponent } from './Pages/MainPages/patient-interactive-message/patient-interactive-message.component';
import { ScheduleMessageSentComponent } from './Pages/MainPages/schedule-message-sent/schedule-message-sent.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginBoxedComponent,
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      { path: 'dashboard', component: AnalyticsComponent, data: { extraParameter: 'dash' } },
      { path: 'singleMessage', component: SingleMessageComponent, data: { extraParameter: 'singleMessage' } },
      { path: 'ineractiveMessage', component: InteractiveMessageComponent, data: { extraParameter: 'ineractiveMessage' } },
      { path: 'scheduleMessage', component: ScheduleMessageComponent, data: { extraParameter: 'scheduleMessage' } },
      { path: 'bulkMessage', component: BulkMessageComponent, data: { extraParameter: 'bulkMessage' } },
      { path: 'reportSngMessage', component: ReportsSingleMessageComponent, data: { extraParameter: 'reportSngMessage' } },
      { path: 'singleMessage/create', component: CreateSingleMessageComponent, data: { extraParameter: 'singleMessage/create' } },
      { path: 'ineractiveMessage/create', component: CreateIntMessageComponent, data: { extraParameter: 'ineractiveMessage/create' } },
      { path: 'scheduleMessage/create', component: CreateSchedMessageComponent, data: { extraParameter: 'scheduleMessage/create' } },
      { path: 'singleMessage/edit/:id', component: EditSingleMessageComponent, data: { extraParameter: 'singleMessage/edit/:id' } },
      { path: 'ineractiveMessage/edit/:id', component: EditIntMessageComponent, data: { extraParameter: 'ineractiveMessage/edit/:id' } },
      { path: 'patientSingleMessage', component: PatientSingleMessageComponent, data: { extraParameter: 'patientSingleMessage' } },
      { path: 'patientSingleMessage/compose', component: ComposeSingleMessageComponent, data: { extraParameter: 'patientSingleMessage/compose' } },
      { path: 'patientVideoMessage', component: PatientVideoMessageComponent, data: { extraParameter: 'patientVideoMessage' } },
      { path: 'patientVideoMessage/compose', component: ComposeVideoMessageComponent, data: { extraParameter: 'patientVideoMessage/compose' } },
      { path: 'patientScheduleMessage', component: PatientScheduleMessageComponent, data: { extraParameter: 'patientScheduleMessage' } },
      { path: 'patientScheduleMessage1', component: ScheduleMessageSentComponent, data: { extraParameter: 'patientScheduleMessage1' } },
      { path: 'patientInteractiveMessage', component: PatientInteractiveMessageComponent, data: { extraParameter: 'patientInteractiveMessage' } },
      { path: '**', redirectTo: 'dashboard' },
    ]
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
