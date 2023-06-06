export default class LinearGradientMaterial {
    constructor(options) {
      this._definitionChanged = new Cesium.Event();
      this._color = undefined;
      this._colorSubscription = undefined;
  
      options = options || [
        { stop: 0, color: "rgba(238,103,98,0.5)" },
        { stop: 1, color: "rgba(32,153,230,0.5)" }
      ];
  
      this.image = this.createGradientImage(options);
      this.color = Cesium.Color.RED.withAlpha(0.2);
    }
  
    createGradientImage(stops) {
      const canvas = document.createElement("canvas");
      canvas.height = 100;
      canvas.width = 200;
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createLinearGradient(200, 50, 0, 50);
  
      stops.forEach(function (stop) {
        gradient.addColorStop(stop.stop, stop.color);
      });
  
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 200, 100);
      ctx.restore();
  
      return canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    }
  
    get isConstant() {
      return false;
    }
  
    get definitionChanged() {
      return this._definitionChanged;
    }
  
    get color() {
      return Cesium.createPropertyDescriptor("color").get;
    }

    set color(value) {
      return Cesium.createPropertyDescriptor("color").set.bind(this)(value);
    }
  
    getType() {
      return "LinearGradient";
    }
  
    getValue(time, result) {
      if (!Cesium.defined(result)) {
        result = {};
      }
  
      result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
      result.image = this.image;
  
      return result;
    }
  
    equals(other) {
      return this === other || (other instanceof LinearGradientMaterial && Cesium.Property.equals(this._color, other._color));
    }
  }
  
Cesium.Material.LinearGradientType = `LinearGradient`;
Cesium.Material.LinearGradientSource = `czm_material czm_getMaterial(czm_materialInput materialInput)
{
   czm_material material = czm_getDefaultMaterial(materialInput);
   vec2 st = materialInput.st;
   vec4 colorImage = texture(image, vec2(fract(st.t - time), st.t));
   material.alpha = colorImage.a;
   material.diffuse = colorImage.rgb * 1.3 ;
   return material;
}`;

Cesium.Material._materialCache.addMaterial(Cesium.Material.LinearGradientType, {
  'fabric': {
    'type': Cesium.Material.LinearGradientType,
    'uniforms': {
      'image': '',
      'time': 0
    },
    'source': Cesium.Material.LinearGradientSource
  },
  'translucent': function () {
    return true;
  }
});