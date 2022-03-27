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

  itemClass = 'rowSelected';

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
    // {
    //   iconClass: 'fas fa-edit',
    //   title: 'Editar',
    // },
    {
      iconClass: 'fas fa-paper-plane',
      title: 'Eliminar',
    },
    {
      iconClass: 'fas fa-edit',
      title: 'Eliminar',
    },
    {
      iconClass: 'fas fa-paper-plane',
      title: 'Eliminar',
    },
    {
      iconClass: 'fas fa-trash',
      title: 'Eliminar',
    },
    {
      iconClass: 'fas fa-trash',
      title: 'Eliminar',
    },
    {
      iconClass: 'fas fa-redo-alt',
      title: 'Eliminar',
    },
    // {
    //   iconClass: 'fas fa-paper-plane',
    //   title: 'Compartir',
    // },
    // {
    //   iconClass: 'fas fa-redo-alt',
    //   title: 'Deshacer',
    // },
    // {
    //   iconClass: 'fas fa-paper-plane',
    //   title: 'Compartir',
    // },
    // {
    //   iconClass: 'fas fa-redo-alt',
    //   title: 'Deshacer',
    // }
  ]

  message = '';

  showContextMenu(event: any, data?: any): boolean {
    const compoInput = {
      event: event,
      icons: this.icons,
      theme: 'light'
    };
    const customInfo = data;
    this.loadComponent(this.viewContainerRef, compoInput, customInfo);
    return false;
  }

  loadComponent(vcr: ViewContainerRef, compoInput: any, customInfo: any) {
    vcr.clear();
    let component: any = MenuComponent;
    let cmpRef: ComponentRef<any> = vcr.createComponent(this.cfr.resolveComponentFactory(component));
    // Inputs //
    cmpRef.instance.data = compoInput;
    cmpRef.instance.customInfo = customInfo;
    // Outputs //
    cmpRef.instance.close.subscribe((_res: any) => this.hideContextMenu());
    // Setting icon actions //
    cmpRef.instance.outPut1.subscribe((res: any) => {this.updateCustomer(res); this.hideContextMenu();});
    cmpRef.instance.outPut2.subscribe((res: any) => {this.deleteCustomer(res); this.hideContextMenu();});
    cmpRef.instance.outPut3.subscribe((_res: any) => {this.shareInfo(); this.hideContextMenu();});
    cmpRef.instance.outPut4.subscribe((_res: any) => {this.reloadInfo(); this.hideContextMenu();});
    //////////////////////////
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
    console.log(this.message);
  }

  reloadInfo(): void {
    console.log('Reloading...');
  }

}
