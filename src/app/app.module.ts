import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgReduxModule } from '@angular-redux/store';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, ArchitectUIState } from './ThemeOptions/store';
import { ConfigActions } from './ThemeOptions/store/config.actions';
import { AppRoutingModule } from './app-routing.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

// BOOTSTRAP COMPONENTS

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ChartsModule } from 'ng2-charts';

// LAYOUT

import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './Layout/pages-layout/pages-layout.component';
import { PageTitleComponent } from './Layout/Components/page-title/page-title.component';

// HEADER

import { HeaderComponent } from './Layout/Components/header/header.component';
import { SearchBoxComponent } from './Layout/Components/header/elements/search-box/search-box.component';
import { UserBoxComponent } from './Layout/Components/header/elements/user-box/user-box.component';

// SIDEBAR

import { SidebarComponent } from './Layout/Components/sidebar/sidebar.component';
import { LogoComponent } from './Layout/Components/sidebar/elements/logo/logo.component';

// FOOTER

import { FooterComponent } from './Layout/Components/footer/footer.component';

// DEMO PAGES

// Dashboards

import { AnalyticsComponent } from './Pages/Dashboards/analytics/analytics.component';

// Pages


// import { ForgotPasswordBoxedComponent } from './Pages/AuthPages/forgot-password-boxed/forgot-password-boxed.component';
import { LoginBoxedComponent } from './Pages/AuthPages/login-boxed/login-boxed.component';
import { RegisterBoxedComponent } from './Pages/AuthPages/register-boxed/register-boxed.component';


import { Ng2SmartTableModule } from 'ng2-smart-table';
// Chart.js Examples

// import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { SingleMessageComponent } from './Pages/MainPages/single-message/single-message.component';
import { InteractiveMessageComponent } from './Pages/MainPages/interactive-message/interactive-message.component';
import { ScheduleMessageComponent } from './Pages/MainPages/schedule-message/schedule-message.component';
import { HttpInterceptorService } from './services/httpInterceptor.service';
import { BulkMessageComponent } from './Pages/MainPages/bulk-message/bulk-message.component';
import { SpinnerComponent } from './Layout/Components/spinner/spinner.component';
import { ReportsSingleMessageComponent } from './Pages/MainPages/report-singlemessage/report_single-message.component';
import { CreateSingleMessageComponent } from './Pages/MainPages/create-single-message copy/create-single-message.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
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

import { DialogComponent } from './Pages/MainPages/dialog/dialog.component';
import { ScheduleMessageSentComponent } from './Pages/MainPages/schedule-message-sent/schedule-message-sent.component';
import { MatSnackBarModule } from '@angular/material';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [

    // LAYOUT

    AppComponent,
    BaseLayoutComponent,
    PagesLayoutComponent,
    PageTitleComponent,

    // HEADER

    HeaderComponent,
    SearchBoxComponent,
    UserBoxComponent,

    // SIDEBAR

    SidebarComponent,
    LogoComponent,

    // FOOTER

    FooterComponent,

    // DEMO PAGES

    // Dashboards

    AnalyticsComponent,

    // User Pages

    LoginBoxedComponent,
    RegisterBoxedComponent,

    // Main Pages Component

    SingleMessageComponent,
    InteractiveMessageComponent,
    ScheduleMessageComponent,
    BulkMessageComponent,
    SpinnerComponent,
    ReportsSingleMessageComponent,
    CreateSingleMessageComponent,
    CreateIntMessageComponent,
    CreateSchedMessageComponent,
    EditSingleMessageComponent,
    EditIntMessageComponent,
    PatientSingleMessageComponent,
    ComposeSingleMessageComponent,
    PatientVideoMessageComponent,
    ComposeVideoMessageComponent,
    DialogComponent,
    PatientScheduleMessageComponent,
    PatientInteractiveMessageComponent,
    ScheduleMessageSentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    CommonModule,
    LoadingBarRouterModule,

    // Angular Bootstrap Components

    PerfectScrollbarModule,
    NgbModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Charts
    Ng2SmartTableModule,
    ChartsModule,
    AutocompleteLibModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide:
        PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
        DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    },
    ConfigActions,
  ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
    private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
