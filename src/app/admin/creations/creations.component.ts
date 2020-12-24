import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

import {QuillEditorComponent} from 'ngx-quill';

import {TechnosService} from '../../services/technos.service';
import {CreateService} from './create.service';
import {GroupsService} from '../../services/groups.service';

import {StateManager} from '../../core/state-manager';
import {Offer} from '../../core/offer';
import {Blog} from "../../core/blog";

@Component({
  selector: 'app-creations',
  templateUrl: './creations.component.html',
  styleUrls: ['./creations.component.scss']
})
export class CreationsComponent extends StateManager implements OnInit {

  public form: FormGroup;
  public groups: any[] = [];
  public tags: string[];
  public techs: string[];
  public technos: any[] = [];
  public isDisabled = true;
  public displayNotif: boolean;

  public alert = {
    type: 'success',
    message: 'enregistrement reussi'
  };
  public posts = [
    {name: 'annonces'},
    {name: 'blog'},
  ];
  public contract = [
    {name: 'CDI'},
    {name: 'CDD'},
    {name: 'Freelance'}
  ];
  public type: string;
  public techArray: string[] = [];

  protected state = {
    salary: '',
    location: '',
    contract: '',
    title: '',
    technos: [],
    description: '',
    tag: '',
    thumbnail: '',
    content: '',
    group: '',
  };

  @ViewChild('editor', {static: true}) editor: QuillEditorComponent;
  @ViewChild('alert', {static: true}) viewContainerRef: ViewContainerRef;

  constructor(private readonly fb: FormBuilder,
              private readonly create: CreateService,
              private readonly technoService: TechnosService,
              private readonly groupeService: GroupsService,
              private readonly router: Router) {

    super();

    this.form = fb.group({
      editors: []
    });

  }

  public stateForm(evt) {
    this.setState(evt.name, evt.value);
  }

  public tagForm(evt) {
    this.tags = evt.value.split(',');
    this.setState('tag', evt.value);
  }

  public selectPosts(evt) {
    this.type = evt.name;
    this.isDisabled = false;
  }

  public selectGroup(evt) {
    this.setState('group', evt._id);
  }

  public selectTechs(evt) {
    this.technos.push(evt);
    this.techArray.push(evt._id);
    this.setState('technos', this.techArray);
  }

  public rmTech(evt) {
    this.rmTechTag(evt);
    this.setState('technos', this.techArray);
  }

  public selectContract(evt) {
    this.setState('contract', evt.name);
  }

  public saveData() {

    switch (this.type) {
      case 'annonces':
        const offer = new Offer(this.state);
        this.create.postOffer(offer)
          .pipe(
            map((res: any) => {

              this.displayNotif = true;

              this.alert.type = (res.success)
                ? 'success'
                : 'danger';

              this.alert.message = (res.success)
                ? 'Enregistrement de la publication reussi'
                : 'Une erreur est survenu lors de l\'enregistrement de la publication';

              setTimeout(() => {
                this.resetState();
              }, 2000);

            })
          ).subscribe();
        break;
      case 'blog':
        const blog = new Blog(this.state);
        this.create.postArticle(blog).subscribe();
        break;
    }

  }

  ngOnInit() {

    this.groupeService.getGroups().subscribe();
    this.technoService.getTech().subscribe();

    this.groupeService.groups$
      .pipe(
        filter(res => !!res),
        map((res) => {
          this.groups = res.groups;
        })
      ).subscribe();

    this.form.controls.editors.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map((res) => {
          this.setState('content', res);
        })
      ).subscribe();

    this.technoService.tech$
      .pipe(
        filter(res => !!res),
        map((techs) => {
          this.techs = techs.technos;
        })
      ).subscribe();

  }

  private rmTechTag(evt) {
    this.technos.forEach((res, index) => {
      if (res.name === evt) {
        this.techArray.splice(index, 1);
        this.technos.splice(index, 1);
      }
    });
  }

  private resetState() {
    this.router.navigateByUrl('/admin/annonces', {skipLocationChange: true})
      .then(() => {
        this.router.navigate(['/admin/creation']);
      });
  }

}
