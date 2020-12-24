import {Component, OnInit} from '@angular/core';
import {ApplicationService} from '../../services/application.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  constructor(private readonly applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.applicationService.getApplications().subscribe();

    this.applicationService.applications
      .pipe(
        map((res) => {
          console.log(res);
        })
      ).subscribe();
  }

}
