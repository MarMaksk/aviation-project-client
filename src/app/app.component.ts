import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "./user/service/token-storage.service";
import {NgxPermissionsService} from "ngx-permissions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'avie-project-client';

  constructor(private router: Router,
              private storage: TokenStorageService,
              private permissionsService: NgxPermissionsService,) {

  }

  ngOnInit(): void {
    let roles = this.storage.getRoles()
    this.permissionsService.loadPermissions(roles);
    if (roles.indexOf("ROLE_USER") != -1 ||
      roles.indexOf("ROLE_MANAGER") != -1 ||
      roles.indexOf("ROLE_MAINTENANCE") != -1 ||
      roles.indexOf("ROLE_DISPATCHER") != -1 ||
      roles.indexOf("ROLE_SYSTEM") != -1)
      this.router.navigate(["/flights"])
    else if (roles.indexOf("ROLE_CATERER") != -1 ||
      roles.indexOf("ROLE_DELIVERY") != -1)
      this.router.navigate(["/catering"])
  }
}
