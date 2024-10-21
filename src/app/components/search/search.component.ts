// src/app/components/search/search.component.ts
import { Component, AfterViewInit, ViewChild, ViewContainerRef, OnDestroy, Inject } from '@angular/core';
import { ApiService } from '@services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequestModel } from '@models/request-model';
import { ApiResponse } from '@models/api-response.model';
import { FooterComponent } from '@components/shared/footer/footer.component';
import { LoggerService } from '@services/logger.service';
import { Subscription } from 'rxjs';
import { HttpClientConfig } from '@models/http-client-config.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class SearchComponent implements AfterViewInit, OnDestroy {
  @ViewChild('footerContainer', { read: ViewContainerRef })
  footerContainer!: ViewContainerRef;
  inputData: string = '';
  httpMethod: string;
  logEvents: string[] = [];
  private logSubscription!: Subscription;
  private loadTime: string = new Date().toISOString();

  constructor(
    private apiService: ApiService,
    private logger: LoggerService,
    @Inject('HTTP_CLIENT_CONFIG') private config: HttpClientConfig // Injecting the HTTP Client configuration
  ) {
    this.httpMethod = this.config.defaultHttpMethod; // Set the httpMethod from the HTTP Client configuration
    this.logSubscription = this.logger.getLogObservable().subscribe(event => this.logEvents.push(event));
  }

  ngAfterViewInit(): void {
    // Dynamically create FooterComponent
    const footerRef = this.footerContainer.createComponent(FooterComponent);
    footerRef.instance.loadTime = this.loadTime;
  }

  sendRequest() {
    const requestSentTime = new Date();
    this.logEvent(`Request sent: ${this.httpMethod} - ${this.inputData} at ${requestSentTime.toISOString()}`);

    const params: RequestModel = { Data: this.inputData };
    const apiCall = this.httpMethod === 'GET' ? this.apiService.getData(params) : this.apiService.postData(params);

    apiCall.subscribe(
      (response) => this.handleResponse(response, requestSentTime),
      (error) => this.handleError(error, requestSentTime)
    );
  }

  private handleResponse(response: ApiResponse, requestSentTime: Date) {
    const responseReceivedTime = new Date();
    const clientProcessingDuration = responseReceivedTime.getTime() - requestSentTime.getTime();

    const serverReceivedTime = new Date(response.serverReceivedTime);
    const serverResponseTime = new Date(response.serverResponseTime);
    const serverProcessingDuration = response.serverProcessingDuration;

    const logMessage = `
Response received: ${response.message}
Client sent at: ${requestSentTime.toISOString()}
Server received at: ${serverReceivedTime.toISOString()}
Server responded at: ${serverResponseTime.toISOString()}
Server processing duration: ${serverProcessingDuration} ms
Client processing duration: ${clientProcessingDuration} ms
    `;
    this.logEvent(logMessage.trim());
  }

  private handleError(error: any, requestSentTime: Date) {
    const responseReceivedTime = new Date();
    const clientProcessingDuration = responseReceivedTime.getTime() - requestSentTime.getTime();
    const logMessage = `
Error occurred: ${error.message}
Request sent at: ${requestSentTime.toISOString()}
Error received at: ${responseReceivedTime.toISOString()}
Client processing duration: ${clientProcessingDuration} ms
    `;
    this.logEvent(logMessage.trim());
  }

  private logEvent(event: string) {
    this.logger.log(event);
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.logSubscription.unsubscribe();
  }
}
