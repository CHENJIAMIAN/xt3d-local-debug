export default class LineFlowMaterial {
  constructor(options) {
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = options.color;
    this.duration = options.duration;
    this._time = new Date().getTime();
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
    return "LineFlowWall";
  }

  getValue(time, result = {}) {
    result.color = Cesium.Property.getValueOrClonedDefault(
      this._color,
      time,
      Cesium.Color.WHITE,
      result.color
    );
    result.image = Cesium.Material.LineFlowWallImage;
    result.time =
      ((new Date().getTime() - this._time) % this.duration) / this.duration;

    return result;
  }

  equals(other) {
    return (
      this === other ||
      (other instanceof LineFlowMaterial &&
        Cesium.Property.equals(this._color, other._color))
    );
  }
}


Cesium.Material.LineFlowWallType = "LineFlowWall";
Cesium.Material.LineFlowWallImage = `data:image/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAABCAYAAAAo2wu9AAAAOklEQVQoU2P8//+/McMoIDsEfv/+zcLKysrOwMDAAcVg9t+/fzmYmZkxxP/9+8fBxMSEIc7AwAAWAwD/kwzHVTmPqQAAAABJRU5ErkJggg==`;
Cesium.Material.LineFlowWallSource = `czm_material czm_getMaterial(czm_materialInput materialInput)
 {
      czm_material material = czm_getDefaultMaterial(materialInput);
      vec2 st = materialInput.st;
      vec4 colorImage = texture(image, vec2(fract(st.t - time), st.t));
      material.alpha = colorImage.a * color.a;
      material.diffuse =  1.5* color.rgb  ;
      return material;
  }`;

Cesium.Material._materialCache.addMaterial(Cesium.Material.LineFlowWallType, {
  fabric: {
    type: Cesium.Material.LineFlowWallType,
    uniforms: {
      color: new Cesium.Color(1, 0, 0, 0.5),
      image: Cesium.Material.LineFlowWallImage,
      time: 0
    },
    source: Cesium.Material.LineFlowWallSource
  },
  translucent: function () {
    return true;
  }
});
