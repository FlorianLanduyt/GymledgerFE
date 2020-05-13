import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-list-placeholder',
  templateUrl: './empty-list-placeholder.component.html',
  styleUrls: ['./empty-list-placeholder.component.css']
})
export class EmptyListPlaceholderComponent implements OnInit {
  @Input() public element: string;
  @Input() public addLink: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPage(){
    this.router.navigate([this.addLink]);
  }
}
