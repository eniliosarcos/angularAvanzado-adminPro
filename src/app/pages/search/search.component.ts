import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medic } from 'src/app/models/medic.model';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public users: User[] = [];
  public medics: Medic[] = [];
  public hospitals: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute, private searchService:SearchService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({term}) => this.searchAll(term))
  }

  searchAll(term:string){
    this.searchService.searchAll(term).subscribe((resp:{hospitals:Hospital[], users:User[], medics: Medic[]}) => {
      console.log(resp);
      this.users = resp.users;
      this.medics = resp.medics;
      this.hospitals = resp.hospitals;
    })
  }

}
