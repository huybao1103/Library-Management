import { Component, Input, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { IEmployee } from 'src/app/models/employee-account';

@Component({
  selector: 'employee-account-panel',
  templateUrl: './employee-account-panel.component.html',
  styleUrls: ['./employee-account-panel.component.css']
})
export class EmployeeAccountPanelComponent {
  @Input() employee: IEmployee | undefined;

  @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;

  showOverlayPanel(event: Event) {
    this.overlayPanel.show(event);
  }
}
