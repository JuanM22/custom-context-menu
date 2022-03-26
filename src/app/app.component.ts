import { Component, ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public viewContainerRef: ViewContainerRef, private cfr: ComponentFactoryResolver) {
  }

  customerList = [
    {
      customerId: 1,
      name: "Juan"
    },
    {
      customerId: 2,
      name: "Sebastian"
    }
  ]

  icons = [
    {
      iconClass: 'fas fa-edit',
      title: 'Editar',
      hasParameters: true,
      callBack: this.updateCustomer
    },
    {
      iconClass: 'fas fa-trash',
      title: 'Eliminar',
      hasParameters: true,
      callBack: this.deleteCustomer
    },
    {
      iconClass: 'fas fa-paper-plane',
      title: 'Compartir',
      hasParameters: false,
      callBack: this.shareInfo
    },
    {
      iconClass: 'fas fa-redo-alt',
      title: 'Deshacer',
      hasParameters: false,
      callBack: this.reloadInfo
    },
    {
      iconClass: 'fas fa-redo-alt',
      title: 'Deshacer',
      hasParameters: false,
      callBack: this.reloadInfo
    },
    {
      iconClass: 'fas fa-redo-alt',
      title: 'Deshacer',
      hasParameters: false,
      callBack: this.reloadInfo
    }
  ]

  showContextMenu(event: any, data?: any): boolean {
    const compoInput = {
      event: event,
      icons: this.icons,
      theme: 'dark'
    };
    const customInfo = data;
    this.loadComponent(this.viewContainerRef, compoInput, customInfo);
    return false;
  }

  async loadComponent(vcr: ViewContainerRef, compoInput: any, customInfo: any) {
    vcr.clear();
    let component: any = MenuComponent;
    let cmpRef: ComponentRef<any> = vcr.createComponent(this.cfr.resolveComponentFactory(component));
    // Inputs //
    cmpRef.instance.data = compoInput;
    cmpRef.instance.customInfo = customInfo;
    // Outputs //
    cmpRef.instance.close.subscribe((_res: any) => this.hideContextMenu());
    return cmpRef;
  }

  hideContextMenu(): void {
    this.viewContainerRef.clear();
  }

  updateCustomer(customer: any): void {
    console.log("Implementar lógica de actualizad cliente");
    console.log(customer);
  }

  deleteCustomer(customer: any): void {
    const customerId = customer.customerId;
    if (confirm('¿Está seguro de que desea borrar la información del cliente #' + customerId + "?")) {
      alert('Información borrada...');
    }
  }

  shareInfo(): void {
    console.log('Sharing...');
  }

  reloadInfo(): void {
    console.log('Reloading...');
  }

}
