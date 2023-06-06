
import BaseGradientMaterial from './BaseGradientMaterial.js'
import LinearGradientMaterial from './LinearGradientMaterial.js'
import LineFlowMaterial from './LineFlowMaterial.js'
import ScrollMaterial from './ScrollMaterial.js'
import MaterialTypes from "./MaterialTypes.js";


const createMaterialWrap = {
createMaterial: function (materialType, options) {
    switch (materialType) {
    case MaterialTypes.BASEGRADIENT:
        return new BaseGradientMaterial(options.color);

    case MaterialTypes.LINEARGRADIENT:
        return new LinearGradientMaterial(options.colorStops);

    case MaterialTypes.LINEFLOW:
        return new LineFlowMaterial(options);

    case MaterialTypes.SCROLL:
        return new ScrollMaterial(options);
    }
}
};

export default class FlowWall {
  constructor(viewer, positions, options) {
    this.viewer = viewer;
    options = options || {};
    this.wallHeight = options.wallHeight || 200;
    this.materialType = options.materialType || 1;
    this.setPositions(positions);

    if (this.materialType === MaterialTypes.LINEFLOW) {
      this.flowWallMaterial = createMaterialWrap.createMaterial(this.materialType, {
        color: options.wallColor || Cesium.Color.RED,
        duration: options.duration || 1000
      });
      this.addFlowWall();
      this.wallMaterial = createMaterialWrap.createMaterial(MaterialTypes.BASEGRADIENT, {
        color: options.wallColor || Cesium.Color.RED
      });
      this.addWall();
      return;
    }

    this.wallMaterial = createMaterialWrap.createMaterial(this.materialType, {
      color: options.wallColor || Cesium.Color.RED,
      duration: options.duration || 1000,
      count: options.count || 2,
      colorStops: options.colorStops
    });
    this.addWall();
  }

  setPositions(positions) {
    this.positions = positions || [];
    this.initHeights();
  }

  initHeights() {
    const self = this;
    const minimumHeights = [];
    const maximumHeights = [];
    this.positions.forEach(function (position) {
      position = Cesium.Cartographic.fromCartesian(position);
      minimumHeights.push(position.height);
      maximumHeights.push(position.height + self.wallHeight);
    });
    this.minimumHeights = minimumHeights;
    this.maximumHeights = maximumHeights;
  }

  addWall() {
    this.wallEntity = this.viewer.entities.add({
      wall: {
        positions: this.positions,
        minimumHeights: this.minimumHeights,
        maximumHeights: this.maximumHeights,
        material: this.wallMaterial
      }
    });
  }

  addFlowWall() {
    this.flowWallEntity = this.viewer.entities.add({
      wall: {
        positions: this.positions,
        minimumHeights: this.minimumHeights,
        maximumHeights: this.maximumHeights,
        material: this.flowWallMaterial
      }
    });
  }

  remove() {
    this.viewer.entities.remove(this.wallEntity);
    this.viewer.entities.remove(this.flowWallEntity);
  }
}