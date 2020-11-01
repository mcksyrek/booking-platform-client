import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ICON_PATH, Icons } from './constants/icons.constant';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class IconModule {
  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
    this.addIconsToRegistry(Object.keys(Icons));
  }

  addIconsToRegistry(listOfIcons: string[]): void {
    listOfIcons.forEach(icon => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `${ICON_PATH}/${icon}.svg`
        )
      );
    });
  }
}
