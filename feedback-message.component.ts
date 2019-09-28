import { Component, OnInit, ViewChild, ElementRef, Renderer2, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-feedback-message',
  templateUrl: './feedback-message.component.html',
  styleUrls: ['./feedback-message.component.css']
})
export class FeedbackMessageComponent implements OnInit {
  ngOnInit(): void {
  }

  title = 'angular-feedback';
  
  defaults = {
		duration: 3000,
		type: 'info',
		sticky: false
	};

	userOpts = {};

	types = {
		'info': 'fdb-info',
		'error': 'fdb-error',
		'success': 'fdb-success',
		'warn': 'fdb-warn',
		'grimace': 'fdb-grimace',
		'neutral': 'fdb-neutral'
	};

	timeoutAutoDismiss;
  timeoutDismiss;
  
  isActive: boolean = false;
  isLoading: boolean = false;

  message: string;
  message$ = new EventEmitter<String>();

	/*feedbackScope = $rootScope.$new();

	feedbackScope.isActive = false;*/

  /*reset() {
    feedbackScope.isActive = false;
    feedbackScope.feedbackClass = '';
    feedbackScope.message = '';
    feedbackScope.isLoading = false;
    delete feedbackScope.type;
    delete feedbackScope.sticky;
};*/

  fdbInfo$ = new Subject(); 
  

  @ViewChild("myDiv", {static: false}) divView: ElementRef;
  constructor(private renderer: Renderer2) {
    

   }

  notify(message: string, userOpt: FeedbackMessageOptions) {

    if (!message) {
        return;
    }

    this.message = message;
    this.isActive = true;

    this.fdbInfo$.next(0);

    this.divView.nativeElement.className = "";

    this.divView.nativeElement.classList.add(this.types[userOpt.type]);
    this.divView.nativeElement.classList.add("fdb-expand");
    

    // setTimeout prevents ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(()=>{
      this.message$.emit("test");
    });


    setTimeout(() => {this.divView.nativeElement.classList.add("fdb-contract")}, 3000)

  }


  ngAfterViewInit() {

    /*setInterval(() =>
    this.notify("test", {type: "info", sticky: true}),
    5000);*/
  }

}

interface FeedbackMessageOptions{
  type: string;
  sticky: boolean;
}
