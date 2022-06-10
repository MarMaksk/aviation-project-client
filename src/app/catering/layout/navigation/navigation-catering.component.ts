import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../user/service/token-storage.service';
import {UserService} from '../../../user/service/user.service';
import {Router} from '@angular/router';
import {User} from "../../../user/models/user";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation-catering.component.html',
  styleUrls: ['./navigation-catering.component.css']
})
export class NavigationCateringComponent implements OnInit {

  isLoggedIn = false;
  isDataLoaded = false;
  user: User | any;

  constructor(private tokenService: TokenStorageService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if(this.isLoggedIn) {
      this.userService.getCurrentUser()
        .subscribe(data => {
          this.user = data;
          this.isDataLoaded = true;
        })
    }
  }

  logout(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

}
