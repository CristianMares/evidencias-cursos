// ol-ext viene en JavaScript sin tipos: se declara lo minimo que se usa.
declare module 'ol-ext/control/LayerSwitcher' {
  import Control from 'ol/control/Control';
  import BaseLayer from 'ol/layer/Base';

  interface LayerSwitcherOptions {
    // Boton para quitar la capa.
    trash?: boolean;
    // Boton para hacer zoom a la extension de la capa.
    extent?: boolean;
    // Abre el panel al pasar el mouse.
    mouseover?: boolean;
    // Muestra una barra de progreso mientras la capa pide datos.
    show_progress?: boolean;
    // Permite cambiar el orden de las capas arrastrando.
    reordering?: boolean;
    // Muestra un boton de informacion y llama a esta funcion al pulsarlo.
    oninfo?: (layer: BaseLayer) => void;
  }

  export default class LayerSwitcher extends Control {
    constructor(options?: LayerSwitcherOptions);
  }
}
