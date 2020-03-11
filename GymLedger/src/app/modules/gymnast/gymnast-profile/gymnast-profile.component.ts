import { Component, OnInit } from '@angular/core';
import { Gymnast } from 'src/app/models/gymnast.model';
import { Observable } from 'rxjs';
import { GymnastDataService } from '../gymnast-data.service';

@Component({
  selector: 'app-gymnast-profile',
  templateUrl: './gymnast-profile.component.html',
  styleUrls: ['./gymnast-profile.component.css']
})
export class GymnastProfileComponent implements OnInit {
  private _gymnast: Gymnast

  constructor(private _gymnastService: GymnastDataService) { }

  ngOnInit(): void {
    this._gymnastService.gymnast$.subscribe(
      g => this._gymnast = g
    )
  }

  get gymnast(): Gymnast{
    return this._gymnast;
  }

}
