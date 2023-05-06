webpackJsonp([1], {
    "+gb7": function(e, t) {},
    "38DG": function(e, t) {},
    "51bD": function(e, t) {},
    "8BQ4": function(e, t) {},
    Jp5o: function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        i("+gb7"),
        i("EypN");
        var n = i("Zrlr")
          , o = i.n(n)
          , s = i("wxAW")
          , r = i.n(s)
          , a = function() {
            function e(t) {
                o()(this, e),
                this.viewer = t,
                this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK),
                this.initEvents()
            }
            return r()(e, [{
                key: "activate",
                value: function(e) {
                    this.deactivate(),
                    this.clear(),
                    this.drawType = e,
                    this.positions = [],
                    this.tempPositions = [],
                    this.registerEvents(),
                    this.viewer.enableCursorStyle = !1,
                    this.viewer._element.style.cursor = "default"
                }
            }, {
                key: "deactivate",
                value: function() {
                    this.unRegisterEvents(),
                    this.drawType = void 0,
                    this.drawEntity = void 0,
                    this.viewer._element.style.cursor = "pointer",
                    this.viewer.enableCursorStyle = !0
                }
            }, {
                key: "clear",
                value: function() {
                    this.drawEntity && (this.viewer.entities.remove(this.drawEntity),
                    this.drawEntity = void 0)
                }
            }, {
                key: "initEvents",
                value: function() {
                    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas),
                    this.DrawStartEvent = new Cesium.Event,
                    this.DrawEndEvent = new Cesium.Event
                }
            }, {
                key: "registerEvents",
                value: function() {
                    this.leftClickEvent(),
                    this.rightClickEvent(),
                    this.mouseMoveEvent()
                }
            }, {
                key: "leftClickEvent",
                value: function() {
                    var e = this;
                    this.handler.setInputAction(function(t) {
                        e.viewer._element.style.cursor = "default";
                        var i = e.viewer.scene.pickPosition(t.position);
                        i || (i = e.viewer.scene.camera.pickEllipsoid(t.position, e.viewer.scene.globe.ellipsoid)),
                        i && (e.positions.push(i),
                        1 == e.positions.length && e.handleFirstPosition())
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                }
            }, {
                key: "handleFirstPosition",
                value: function() {
                    switch (this.drawType) {
                    case "Point":
                        this.generatePoint(),
                        this.drawEnd();
                        break;
                    case "Polyline":
                        this.generatePolyline();
                        break;
                    case "Polygon":
                        this.generatePolygon()
                    }
                }
            }, {
                key: "generatePoint",
                value: function() {
                    this.drawEntity = this.viewer.entities.add({
                        position: this.positions[0],
                        point: {
                            pixelSize: 4,
                            color: Cesium.Color.RED
                        }
                    })
                }
            }, {
                key: "generatePolyline",
                value: function() {
                    var e = this;
                    this.drawEntity = this.viewer.entities.add({
                        polyline: {
                            positions: new Cesium.CallbackProperty(function(t) {
                                return e.tempPositions
                            }
                            ,!1),
                            width: 2,
                            material: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.YELLOW
                            }),
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.YELLOW
                            })
                        }
                    })
                }
            }, {
                key: "generatePolygon",
                value: function() {
                    var e = this;
                    this.drawEntity = this.viewer.entities.add({
                        polygon: {
                            hierarchy: new Cesium.CallbackProperty(function(t) {
                                return new Cesium.PolygonHierarchy(e.tempPositions)
                            }
                            ,!1),
                            material: Cesium.Color.RED.withAlpha(.4),
                            perPositionHeight: !0
                        },
                        polyline: {
                            positions: new Cesium.CallbackProperty(function(t) {
                                return e.tempPositions.concat(e.tempPositions[0])
                            }
                            ,!1),
                            width: 1,
                            material: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.YELLOW
                            }),
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.YELLOW
                            })
                        }
                    })
                }
            }, {
                key: "mouseMoveEvent",
                value: function() {
                    var e = this;
                    this.handler.setInputAction(function(t) {
                        e.viewer._element.style.cursor = "default";
                        var i = e.viewer.scene.pickPosition(t.endPosition);
                        i || (i = e.viewer.scene.camera.pickEllipsoid(t.startPosition, e.viewer.scene.globe.ellipsoid)),
                        i && e.drawEntity && (e.tempPositions = e.positions.concat([i]))
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "rightClickEvent",
                value: function() {
                    var e = this;
                    this.handler.setInputAction(function(t) {
                        if (e.drawEntity) {
                            switch (e.drawType) {
                            case "Polyline":
                                e.drawEntity.polyline.positions = e.positions,
                                e.minPositionCount = 2;
                                break;
                            case "Polygon":
                                e.drawEntity.polygon.hierarchy = e.positions,
                                e.drawEntity.polyline.positions = e.positions.concat(e.positions[0]),
                                e.minPositionCount = 3
                            }
                            if (e.positions.length < e.minPositionCount)
                                return e.clear(),
                                void e.deactivate();
                            e.drawEnd()
                        } else
                            e.deactivate()
                    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
                }
            }, {
                key: "unRegisterEvents",
                value: function() {
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE),
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
                }
            }, {
                key: "drawEnd",
                value: function() {
                    var e = this;
                    this.drawEntity.remove = function() {
                        e.viewer.entities.remove(e.drawEntity)
                    }
                    ,
                    this.DrawEndEvent.raiseEvent(this.drawEntity, this.positions, this.drawType),
                    this.deactivate()
                }
            }]),
            e
        }()
          , l = function() {
            function e(t) {
                o()(this, e),
                this.viewer = t,
                this.initEventHandler()
            }
            return r()(e, [{
                key: "initEventHandler",
                value: function() {
                    this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas),
                    this.EditEndEvent = new Cesium.Event
                }
            }, {
                key: "activate",
                value: function() {
                    this.deactivate(),
                    this.initLeftClickEventHandler()
                }
            }, {
                key: "deactivate",
                value: function() {
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
                    this.unRegisterEvents(),
                    this.clearAllEditVertex()
                }
            }, {
                key: "clearAllEditVertex",
                value: function() {
                    this.clearEditVertex(),
                    this.clearMidVertex()
                }
            }, {
                key: "initLeftClickEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pick(t.position);
                        i && i.id ? i.id && i.id.Type && (e.editEntity && e.editEntity.id == i.id.id || (e.handleEditEntity(),
                        e.handlePickEditEntity(i.id))) : e.handleEditEntity()
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                }
            }, {
                key: "handleEditEntity",
                value: function() {
                    this.unRegisterEvents(),
                    this.clearAllEditVertex();
                    var e = this.editEntity;
                    e && (this.closeEntityEditMode(),
                    this.editEntity = void 0,
                    this.isEdited && (this.EditEndEvent.raiseEvent(e),
                    this.isEdited = !1,
                    this.isEditing = !1))
                }
            }, {
                key: "handlePickEditEntity",
                value: function(e) {
                    -1 != ["EditableMarker", "EditablePolyline", "EditablePolygon"].indexOf(e.Type) && (this.editEntity = e,
                    this.isEditing = !1,
                    this.isEdited = !1,
                    this.editPositions = this.getEditEntityPositions(),
                    this.EditMoveCenterPositoin = this.getCenterPosition(),
                    this.openEntityEditModel(),
                    this.clearAllEditVertex(),
                    this.unRegisterEvents(),
                    this.createEditVertex(),
                    this.createMidVertex(),
                    this.registerEvents())
                }
            }, {
                key: "openEntityEditModel",
                value: function() {
                    var e = this;
                    switch (this.editEntity.Type) {
                    case "EditableMarker":
                        this.editEntity.position = new Cesium.CallbackProperty(function(t) {
                            return e.editPositions[0]
                        }
                        ,!1);
                        break;
                    case "EditablePolyline":
                        this.editEntity.polyline.positions = new Cesium.CallbackProperty(function(t) {
                            return e.editPositions
                        }
                        ,!1);
                        break;
                    case "EditablePolygon":
                        this.editEntity.polygon.hierarchy = new Cesium.CallbackProperty(function(t) {
                            return new Cesium.PolygonHierarchy(e.editPositions)
                        }
                        ,!1),
                        this.editEntity.polyline && (this.editEntity.polyline.positions = new Cesium.CallbackProperty(function(t) {
                            return e.editPositions.concat(e.editPositions[0])
                        }
                        ,!1))
                    }
                }
            }, {
                key: "closeEntityEditMode",
                value: function() {
                    switch (this.editEntity.Type) {
                    case "EditableMarker":
                        this.editEntity.position = this.editPositions[0];
                        break;
                    case "EditablePolyline":
                        this.editEntity.polyline.positions = this.editPositions;
                        break;
                    case "EditablePolygon":
                        this.editEntity.polygon.hierarchy = this.editPositions,
                        this.editEntity.polyline && (this.editEntity.polyline.positions = this.editPositions.concat(this.editPositions[0]))
                    }
                }
            }, {
                key: "getEditEntityPositions",
                value: function() {
                    switch (this.editEntity.Type) {
                    case "EditableMarker":
                        return [this.editEntity.position._value];
                    case "EditablePolyline":
                        return this.editEntity.polyline.positions._value;
                    case "EditablePolygon":
                        return this.editEntity.polygon.hierarchy._value.positions
                    }
                }
            }, {
                key: "registerEvents",
                value: function() {
                    this.initLeftDownEventHandler(),
                    this.initMouseMoveEventHandler(),
                    this.initLeftUpEventHandler()
                }
            }, {
                key: "unRegisterEvents",
                value: function() {
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "initLeftDownEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pick(t.position);
                        i && i.id && i.id.type && ("EditVertex" == i.id.type || "EditMove" == i.id.type ? (e.isEditing = !0,
                        e.viewer.scene.screenSpaceCameraController.enableRotate = !1,
                        e.viewer.enableCursorStyle = !1,
                        e.viewer._element.style.cursor = "",
                        document.body.style.cursor = "move",
                        e.editVertext = i.id,
                        e.editVertext.show = !1,
                        e.clearMidVertex()) : "EditMidVertex" == i.id.type && (e.editPositions.splice(i.id.vertexIndex, 0, i.id.position._value),
                        e.clearAllEditVertex(),
                        e.createEditVertex(),
                        e.createMidVertex(),
                        e.isEdited = !0))
                    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
                }
            }, {
                key: "initLeftUpEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        e.isEditing && (e.viewer.enableCursorStyle = !0,
                        document.body.style.cursor = "default",
                        e.viewer.scene.screenSpaceCameraController.enableRotate = !0,
                        e.editVertext.show = !0,
                        e.isEditing = !1,
                        e.clearMidVertex(),
                        e.createMidVertex())
                    }, Cesium.ScreenSpaceEventType.LEFT_UP)
                }
            }, {
                key: "initMouseMoveEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pickPosition(t.endPosition);
                        if (i || (i = e.viewer.scene.camera.pickEllipsoid(t.endPosition, e.viewer.scene.globe.ellipsoid)),
                        i && e.isEditing) {
                            if ("EditMove" == e.editVertext.type) {
                                var n = e.EditMoveCenterPositoin;
                                if (!n)
                                    return;
                                e.moveEntityByOffset(n, i)
                            } else
                                e.editPositions[e.editVertext.vertexIndex] = i;
                            e.isEdited = !0,
                            e.EditMoveCenterPositoin = e.getCenterPosition()
                        }
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "getCenterPosition",
                value: function() {
                    var e = this
                      , t = []
                      , i = 0;
                    if ("EditableMarker" == this.editEntity.Type)
                        return this.editPositions[0];
                    this.editPositions.forEach(function(n) {
                        var o = e.cartesian3ToPoint3D(n);
                        t.push([o.x, o.y]),
                        i < o.z && (i = o.z)
                    });
                    var n = turf.lineString(t)
                      , o = turf.bbox(n)
                      , s = turf.bboxPolygon(o)
                      , r = turf.center(s).geometry.coordinates;
                    return Cesium.Cartesian3.fromDegrees(r[0], r[1], i)
                }
            }, {
                key: "moveEntityByOffset",
                value: function(e, t) {
                    for (var i = this.cartesian3ToPoint3D(e), n = this.cartesian3ToPoint3D(t), o = n.x - i.x, s = n.y - i.y, r = void 0, a = 0; a < this.editPositions.length; a++)
                        (r = this.cartesian3ToPoint3D(this.editPositions[a])).x += o,
                        r.y += s,
                        this.editPositions[a] = Cesium.Cartesian3.fromDegrees(r.x, r.y, r.z)
                }
            }, {
                key: "createEditVertex",
                value: function() {
                    var e = this;
                    this.vertexEntities = [],
                    this.editPositions.forEach(function(t, i) {
                        var n = e.viewer.entities.add({
                            position: new Cesium.CallbackProperty(function(t) {
                                return e.editPositions[i]
                            }
                            ,!1),
                            type: "EditVertex",
                            vertexIndex: i,
                            point: {
                                color: Cesium.Color.DARKBLUE.withAlpha(.4),
                                pixelSize: 10,
                                outlineColor: Cesium.Color.YELLOW.withAlpha(.4),
                                outlineWidth: 3,
                                disableDepthTestDistance: 2e3
                            }
                        });
                        e.vertexEntities.push(n)
                    }),
                    1 != this.editPositions.length && this.createEditMoveCenterEntity()
                }
            }, {
                key: "createEditMoveCenterEntity",
                value: function() {
                    var e = this;
                    this.EditMoveCenterEntity = this.viewer.entities.add({
                        position: new Cesium.CallbackProperty(function(t) {
                            return e.EditMoveCenterPositoin
                        }
                        ,!1),
                        type: "EditMove",
                        point: {
                            color: Cesium.Color.RED.withAlpha(.4),
                            pixelSize: 10,
                            outlineColor: Cesium.Color.WHITE.withAlpha(.3),
                            outlineWidth: 3,
                            disableDepthTestDistance: 2e3
                        }
                    })
                }
            }, {
                key: "clearEditVertex",
                value: function() {
                    var e = this;
                    this.vertexEntities && this.vertexEntities.forEach(function(t) {
                        e.viewer.entities.remove(t)
                    }),
                    this.vertexEntities = [],
                    this.viewer.entities.remove(this.EditMoveCenterEntity)
                }
            }, {
                key: "createMidVertex",
                value: function() {
                    this.midVertexEntities = [];
                    for (var e = 0; e < this.editPositions.length; e++) {
                        var t = this.editPositions[e]
                          , i = this.editPositions[e + 1]
                          , n = this.midPosition(t, i)
                          , o = this.viewer.entities.add({
                            position: n,
                            type: "EditMidVertex",
                            vertexIndex: e + 1,
                            point: {
                                color: Cesium.Color.LIMEGREEN.withAlpha(.4),
                                pixelSize: 10,
                                outlineColor: Cesium.Color.YELLOW.withAlpha(.4),
                                outlineWidth: 3,
                                disableDepthTestDistance: 2e3
                            }
                        });
                        this.midVertexEntities.push(o)
                    }
                }
            }, {
                key: "clearMidVertex",
                value: function() {
                    var e = this;
                    this.midVertexEntities && this.midVertexEntities.forEach(function(t) {
                        e.viewer.entities.remove(t)
                    }),
                    this.midVertexEntities = []
                }
            }, {
                key: "cartesian3ToPoint3D",
                value: function(e) {
                    var t = Cesium.Cartographic.fromCartesian(e);
                    return {
                        x: Cesium.Math.toDegrees(t.longitude),
                        y: Cesium.Math.toDegrees(t.latitude),
                        z: t.height
                    }
                }
            }, {
                key: "midPosition",
                value: function(e, t) {
                    if (!e || !t)
                        return null;
                    var i = this.cartesian3ToPoint3D(e)
                      , n = this.cartesian3ToPoint3D(t)
                      , o = {
                        x: (i.x + n.x) / 2,
                        y: (i.y + n.y) / 2,
                        z: (i.z + n.z) / 2
                    };
                    return Cesium.Cartesian3.fromDegrees(o.x, o.y, o.z)
                }
            }]),
            e
        }()
          , h = (i("mgaH"),
        function() {
            function e(t, i, n) {
                o()(this, e),
                this.viewer = t,
                this.position = i,
                this.label = n,
                this.initDom(),
                this.initEvent()
            }
            return r()(e, [{
                key: "initDom",
                value: function() {
                    this.$htmlContainer = document.createElement("div"),
                    this.$htmlContainer.classList.add("moveAnimation");
                    var e = document.createElement("div");
                    e.classList.add("is-shulie-item1"),
                    e.innerHTML = this.label,
                    this.$htmlContainer.appendChild(e);
                    var t = document.createElement("div");
                    t.classList.add("sanjiao_arrow"),
                    this.$htmlContainer.appendChild(t);
                    var i = document.createElement("div");
                    i.classList.add("pre-topCard-list-item-line1"),
                    this.$htmlContainer.appendChild(i),
                    this.viewer.cesiumWidget.container.appendChild(this.$htmlContainer),
                    this.viewer.scene.postRender.addEventListener(this.postRenderEvent, this)
                }
            }, {
                key: "initEvent",
                value: function() {
                    this.viewer.scene.postRender.addEventListener(this.postRenderEventHandle, this)
                }
            }, {
                key: "postRenderEventHandle",
                value: function() {
                    var e = this.viewer.scene.canvas.height
                      , t = new Cesium.Cartesian2;
                    Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, t),
                    this.$htmlContainer.style.bottom = e + 30 - t.y + "px";
                    var i = this.$htmlContainer.offsetWidth;
                    this.$htmlContainer.style.left = t.x - i / 2 + "px";
                    var n = this.viewer.camera.position
                      , o = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(n).height;
                    o += this.viewer.scene.globe.ellipsoid.maximumRadius,
                    Cesium.Cartesian3.distance(n, this.position) > o ? this.$htmlContainer.style.display = "none" : (this.$htmlContainer.style.display = "block",
                    this.viewer.camera.positionCartographic.height > 6e3 ? this.$htmlContainer.style.display = "none" : this.$htmlContainer.style.display = "block")
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.scene.postRender.removeEventListener(this.postRenderEventHandle, this)
                }
            }]),
            e
        }())
          , c = (i("R/UJ"),
        i("8BQ4"),
        function() {
            function e(t, i, n) {
                o()(this, e),
                this.viewer = t,
                this.position = i,
                this.label = n,
                this.initDom(),
                this.initEvent()
            }
            return r()(e, [{
                key: "initDom",
                value: function() {
                    this.$htmlContainer = document.createElement("h3"),
                    this.$htmlContainer.classList.add("label-led-container"),
                    this.$htmlContainer.innerHTML = this.label,
                    this.viewer.cesiumWidget.container.appendChild(this.$htmlContainer),
                    this.viewer.scene.postRender.addEventListener(this.postRenderEvent, this)
                }
            }, {
                key: "initEvent",
                value: function() {
                    this.viewer.scene.postRender.addEventListener(this.postRenderEventHandle, this)
                }
            }, {
                key: "postRenderEventHandle",
                value: function() {
                    var e = this.viewer.scene.canvas.height
                      , t = new Cesium.Cartesian2;
                    Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, t),
                    this.$htmlContainer.style.bottom = e + 30 - t.y + "px";
                    var i = this.$htmlContainer.offsetWidth;
                    this.$htmlContainer.style.left = t.x - i / 2 + "px";
                    var n = this.viewer.camera.position
                      , o = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(n).height;
                    o += this.viewer.scene.globe.ellipsoid.maximumRadius,
                    Cesium.Cartesian3.distance(n, this.position) > o ? this.$htmlContainer.style.display = "none" : (this.$htmlContainer.style.display = "block",
                    this.viewer.camera.positionCartographic.height > 4e5 ? this.$htmlContainer.style.display = "none" : this.$htmlContainer.style.display = "block")
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.scene.postRender.removeEventListener(this.postRenderEventHandle, this)
                }
            }]),
            e
        }())
          , u = i("dlWm")
          , p = (i("38DG"),
        function() {
            function e(t) {
                o()(this, e),
                this.viewer = t,
                this.createDom(),
                this.addPostRender()
            }
            return r()(e, [{
                key: "setContent",
                value: function(e) {
                    var t = this;
                    if (e) {
                        this.removeAllChild();
                        var i = void 0;
                        e.forEach(function(e) {
                            (i = document.createElement("div")).innerHTML = e,
                            t.container.appendChild(i)
                        })
                    }
                }
            }, {
                key: "updatePosition",
                value: function(e) {
                    this.position = e
                }
            }, {
                key: "addPostRender",
                value: function() {
                    this.viewer.scene.postRender.addEventListener(this.postRender, this)
                }
            }, {
                key: "postRender",
                value: function() {
                    if (this.container && this.container.style && this.position) {
                        var e = this.viewer.scene.canvas.height
                          , t = new Cesium.Cartesian2;
                        Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, t),
                        this.container.style.bottom = e - t.y - 20 + "px";
                        this.container.offsetWidth;
                        this.container.style.left = t.x + 50 + "px"
                    }
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.cesiumWidget.container.removeChild(this.container),
                    this.viewer.scene.postRender.removeEventListener(this.postRender, this)
                }
            }, {
                key: "createDom",
                value: function() {
                    this.container = document.createElement("div"),
                    this.container.classList.add("plot-draw-tip-container"),
                    this.viewer.cesiumWidget.container.appendChild(this.container)
                }
            }, {
                key: "removeAllChild",
                value: function() {
                    for (; this.container.hasChildNodes(); )
                        this.container.removeChild(this.container.firstChild)
                }
            }]),
            e
        }())
          , d = function() {
            function e(t) {
                o()(this, e),
                this.viewer = t,
                this.addPoint()
            }
            return r()(e, [{
                key: "addPoint",
                value: function() {
                    this.mousePointEntity = this.viewer.entities.add({
                        point: {
                            pixelSize: 8,
                            color: Cesium.Color.AQUA,
                            outlineWidth: 1,
                            outlineColor: Cesium.Color.WHITE
                        }
                    })
                }
            }, {
                key: "updatePosition",
                value: function(e) {
                    this.mousePointEntity.position = e
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.entities.remove(this.mousePointEntity)
                }
            }]),
            e
        }()
          , v = function() {
            function e(t) {
                o()(this, e),
                this.viewer = t,
                this.initEvents()
            }
            return r()(e, [{
                key: "initEvents",
                value: function() {
                    this.DrawEndEvent = new Cesium.Event
                }
            }, {
                key: "activate",
                value: function() {
                    this.registerEvents(),
                    this.plotDrawTip = new p(this.viewer),
                    this.plotDrawTip.setContent(["左键点击确定模型位置", "右键点击取消"]),
                    this.mousePoint = new d(this.viewer),
                    this.viewer.enableCursorStyle = !1,
                    this.viewer._element.style.cursor = "default"
                }
            }, {
                key: "registerEvents",
                value: function() {
                    var e = this;
                    this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas),
                    this.initLeftClickEvent(),
                    this.initMouseMoveEvent(),
                    this.eventHandler.setInputAction(function(t) {
                        e.deactivate()
                    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
                }
            }, {
                key: "initLeftClickEvent",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pickPosition(t.position);
                        i || (i = e.viewer.scene.camera.pickEllipsoid(t.startPosition, e.viewer.scene.globe.ellipsoid)),
                        i && (e.DrawEndEvent.raiseEvent(i),
                        e.deactivate())
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                }
            }, {
                key: "initMouseMoveEvent",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pickPosition(t.startPosition);
                        i || (i = e.viewer.scene.camera.pickEllipsoid(t.startPosition, e.viewer.scene.globe.ellipsoid)),
                        i && (e.plotDrawTip.updatePosition(i),
                        e.mousePoint.updatePosition(i))
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "unRegisterEvents",
                value: function() {
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
                }
            }, {
                key: "deactivate",
                value: function() {
                    this.unRegisterEvents(),
                    this.plotDrawTip.remove(),
                    this.plotDrawTip = void 0,
                    this.mousePoint.remove(),
                    this.mousePoint = void 0,
                    this.viewer._element.style.cursor = "pointer",
                    this.viewer.enableCursorStyle = !0
                }
            }]),
            e
        }()
          , y = function() {
            function e(t, i) {
                o()(this, e),
                this.viewer = t,
                this.gltfPlotLayer = i,
                this.registerMouseEvents()
            }
            return r()(e, [{
                key: "registerMouseEvents",
                value: function() {
                    this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas),
                    this.initLeftDownEventHandler(),
                    this.initMouseMoveEventHandler(),
                    this.initLeftUpEventHandler()
                }
            }, {
                key: "unRegisterMouseEvents",
                value: function() {
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "destroy",
                value: function() {
                    this.unRegisterMouseEvents(),
                    this.viewer = void 0,
                    this.gltfPlotLayer = void 0,
                    this.eventHandler = void 0
                }
            }, {
                key: "initLeftDownEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        if (e.gltfPlotLayer.selectedPlot) {
                            var i = e.viewer.scene.pick(t.position);
                            i && i.id && "GltfPlot" === i.id.type && e.gltfPlotLayer.selectedPlot.properties.plotCode == i.id.plotCode && (e.viewer.enableCursorStyle = !1,
                            document.body.style.cursor = "move",
                            e.moveing = !0,
                            e.gltfPlotLayer.selectedPlot.setVisible(!1),
                            e.mousePoint = new d(e.viewer),
                            e.viewer.scene.screenSpaceCameraController.enableRotate = !1)
                        }
                    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
                }
            }, {
                key: "initLeftUpEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        e.moveing && (e.viewer.enableCursorStyle = !0,
                        document.body.style.cursor = "default",
                        e.moveing = !1,
                        e.viewer.scene.screenSpaceCameraController.enableRotate = !0,
                        e.mousePoint.remove(),
                        e.mousePoint = void 0,
                        e.gltfPlotLayer.selectedPlot && e.gltfPlotLayer.selectedPlot.setVisible(!0))
                    }, Cesium.ScreenSpaceEventType.LEFT_UP)
                }
            }, {
                key: "initMouseMoveEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        if (e.moveing) {
                            var i = e.viewer.scene.pickPosition(t.endPosition);
                            i && (e.mousePoint.updatePosition(i),
                            e.gltfPlotLayer.selectedPlot.updatePosition(i))
                        }
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }]),
            e
        }()
          , C = i("Zx67")
          , E = i.n(C)
          , f = i("zwoO")
          , P = i.n(f)
          , m = i("Pf15")
          , g = i.n(m)
          , w = i("luZS")
          , k = function() {
            function e(t, i) {
                o()(this, e),
                this.viewer = t,
                this.properties = i.properties,
                this.coordinates = i.geometry.coordinates,
                this.properties.plotType = "Gltf",
                this.properties.plotName = "Gltf",
                this.style = this.properties.style;
                var n = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(this.style.heading),Cesium.Math.toRadians(0),Cesium.Math.toRadians(0));
                this.position = Cesium.Cartesian3.fromDegrees(this.coordinates[0], this.coordinates[1], this.coordinates[2]),
                this.orientation = Cesium.Transforms.headingPitchRollQuaternion(this.position, n),
                this.addGltfEntity()
            }
            return r()(e, [{
                key: "addGltfEntity",
                value: function() {
                    this.gltfEntity = this.viewer.entities.add({
                        type: "GltfPlot",
                        plotCode: this.properties.plotCode,
                        position: this.position,
                        orientation: this.orientation,
                        model: {
                            uri: this.properties.modelUrl,
                            colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT,
                            color: Cesium.Color.WHITE,
                            scale: this.style.scale,
                            maximumScale: this.style.scale
                        }
                    })
                }
            }, {
                key: "setVisible",
                value: function(e) {
                    this.gltfEntity.show = e
                }
            }, {
                key: "setSelected",
                value: function(e) {
                    e ? (this.gltfEntity.model.silhouetteColor = Cesium.Color.fromAlpha(Cesium.Color.YELLOW, 1),
                    this.gltfEntity.model.silhouetteSize = 4) : (this.gltfEntity.model.silhouetteColor = Cesium.Color.fromAlpha(Cesium.Color.YELLOW, 1),
                    this.gltfEntity.model.silhouetteSize = 0)
                }
            }, {
                key: "setScale",
                value: function(e) {
                    this.gltfEntity.model.scale = e,
                    this.gltfEntity.model.maximumScale = e,
                    this.style.scale = e
                }
            }, {
                key: "getPosition",
                value: function() {
                    return this.gltfEntity.position
                }
            }, {
                key: "updatePosition",
                value: function(e) {
                    this.gltfEntity.position = e;
                    var t = Cesium.Cartographic.fromCartesian(e);
                    this.coordinates = [Cesium.Math.toDegrees(t.longitude), Cesium.Math.toDegrees(t.latitude), t.height]
                }
            }, {
                key: "updateHeading",
                value: function(e) {
                    this.style.heading = e;
                    var t = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(e),Cesium.Math.toRadians(0),Cesium.Math.toRadians(0));
                    this.gltfEntity.orientation = Cesium.Transforms.headingPitchRollQuaternion(this.position, t)
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.entities.remove(this.gltfEntity)
                }
            }, {
                key: "toGeoJson",
                value: function() {
                    return {
                        type: "Feature",
                        properties: this.properties,
                        geometry: {
                            type: "Point",
                            coordinates: this.coordinates
                        }
                    }
                }
            }]),
            e
        }()
          , T = function(e) {
            function t(e) {
                o()(this, t);
                var i = P()(this, (t.__proto__ || E()(t)).call(this, e));
                return i.viewer.selectedEntityChanged.addEventListener(i.selectedEntityChanged, i),
                i.selectedPlotChanged = new Cesium.Event,
                i
            }
            return g()(t, e),
            r()(t, [{
                key: "addPlot",
                value: function(e) {
                    var t = new k(this.viewer,e);
                    this.plots.push(t)
                }
            }, {
                key: "selectedEntityChanged",
                value: function(e) {
                    if (this.plotSelecteable) {
                        if (!e)
                            return this.clearSelectedPlot(),
                            void this.selectedPlotChanged.raiseEvent(void 0);
                        var t = this.getByPlotCode(e.plotCode);
                        if (!t)
                            return this.clearSelectedPlot(),
                            void this.selectedPlotChanged.raiseEvent(void 0);
                        if (this.selectedPlot) {
                            if (this.selectedPlot.properties.plotCode == t.properties.plotCode)
                                return;
                            this.clearSelectedPlot()
                        }
                        this.selectedPlot = t,
                        this.selectedPlot.setSelected(!0),
                        this.selectedPlotChanged.raiseEvent(t)
                    }
                }
            }, {
                key: "flyToByPlotCode",
                value: function(e) {
                    var t = this.getByPlotCode(e);
                    t && (this.viewer.flyTo(t.gltfEntity),
                    this.setSelectedPlotByCode(e))
                }
            }, {
                key: "setSelectedPlotByCode",
                value: function(e) {
                    this.clearSelectedPlot();
                    var t = this.getByPlotCode(e);
                    t && (this.viewer.selectedEntity = t.gltfEntity,
                    this.selectedPlot = t,
                    this.selectedPlot.setSelected(!0))
                }
            }, {
                key: "clearSelectedPlot",
                value: function() {
                    this.selectedPlot && (this.selectedPlot.setVisible(!0),
                    this.selectedPlot.setSelected(!1),
                    this.selectedPlot = void 0)
                }
            }]),
            t
        }(w.a)
          , L = {
            ARC: "arc",
            ELLIPSE: "ellipse",
            CURVE: "curve",
            CLOSED_CURVE: "closedcurve",
            LUNE: "lune",
            SECTOR: "sector",
            GATHERING_PLACE: "gatheringplace",
            STRAIGHT_ARROW: "straightarrow",
            ASSAULT_DIRECTION: "assaultdirection",
            ATTACK_ARROW: "attackarrow",
            TAILED_ATTACK_ARROW: "tailedattackarrow",
            SQUAD_COMBAT: "squadcombat",
            TAILED_SQUAD_COMBAT: "tailedsquadcombat",
            FINE_ARROW: "finearrow",
            CIRCLE: "circle",
            DOUBLE_ARROW: "doublearrow",
            POLYLINE: "polyline",
            FREEHAND_LINE: "freehandline",
            POLYGON: "polygon",
            FREEHAND_POLYGON: "freehandpolygon",
            RECTANGLE: "rectangle",
            MARKER: "marker",
            TRIANGLE: "triangle"
        };
        function S(e, t) {
            return Cesium.Cartesian3.fromDegrees(e[0], e[1], t)
        }
        function M(e) {
            var t = Cesium.Cartographic.fromCartesian(e);
            return [Cesium.Math.toDegrees(t.longitude), Cesium.Math.toDegrees(t.latitude)]
        }
        function A(e) {
            for (var t = [], i = 0; i < e.length; i++)
                t.push(M(e[i]));
            return t
        }
        var x = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = L.POLYGON,
                n.properties.plotName = "面",
                n.generateEntity(),
                n.minPointCount = 3,
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "generateEntity",
                value: function() {
                    this.polygonEntity = this.viewer.entities.add({
                        plotType: this.properties.plotBase,
                        plotCode: this.properties.plotCode,
                        polygon: {
                            hierarchy: new Cesium.PolygonHierarchy(this.positions || []),
                            material: Cesium.Color.YELLOW.withAlpha(.6),
                            classificationType: Cesium.ClassificationType.BOTH
                        }
                    })
                }
            }, {
                key: "setSelected",
                value: function(e) {
                    this.polygonEntity.polygon.material = e ? Cesium.Color.RED.withAlpha(.8) : Cesium.Color.YELLOW.withAlpha(.6)
                }
            }, {
                key: "generate",
                value: function() {
                    this.getPointCount() < 2 || this.generatePositions(this.coordinates[0])
                }
            }, {
                key: "openEditMode",
                value: function(e) {
                    var t = this;
                    e ? (this.polygonEntity.polygon.hierarchy = new Cesium.CallbackProperty(function(e) {
                        return new Cesium.PolygonHierarchy(t.positions || [])
                    }
                    ,!1),
                    this.polygonEntity.polyline = {
                        positions: new Cesium.CallbackProperty(function(e) {
                            return t.positions && t.positions.length > 0 ? t.positions.concat(t.positions[0]) : []
                        }
                        ,!1),
                        width: 2,
                        clampToGround: !0,
                        material: new Cesium.PolylineDashMaterialProperty({
                            color: Cesium.Color.YELLOW
                        }),
                        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                            color: Cesium.Color.YELLOW
                        })
                    }) : (this.polygonEntity.polygon.hierarchy = new Cesium.PolygonHierarchy(this.positions || []),
                    this.polygonEntity.polyline && (this.polygonEntity.polyline.width = 0))
                }
            }, {
                key: "toGeoJson",
                value: function() {
                    return {
                        type: "Feature",
                        properties: this.properties,
                        geometry: {
                            type: "Polygon",
                            coordinates: this.coordinates
                        }
                    }
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.entities.remove(this.polygonEntity)
                }
            }]),
            t
        }(function() {
            function e(t, i) {
                o()(this, e),
                this.viewer = t,
                this.properties = i.properties,
                this.properties.plotBase = "MilitaryPlot",
                this.coordinates = i.geometry.coordinates,
                this.style = this.properties.style,
                this.initConsts(),
                this.setPoints(this.coordinates[0])
            }
            return r()(e, [{
                key: "initConsts",
                value: function() {}
            }, {
                key: "openEditMode",
                value: function(e) {}
            }, {
                key: "setHeight",
                value: function(e) {
                    this.style.height = e
                }
            }, {
                key: "getHeight",
                value: function() {
                    return this.style.height
                }
            }, {
                key: "setPoints",
                value: function(e) {
                    this.coordinates[0] = e || [],
                    this.coordinates[0].length >= 1 && this.generate()
                }
            }, {
                key: "getPoints",
                value: function() {
                    return this.coordinates[0].slice(0)
                }
            }, {
                key: "getPointCount",
                value: function() {
                    return this.coordinates[0].length
                }
            }, {
                key: "generate",
                value: function() {}
            }, {
                key: "generatePositions",
                value: function(e) {
                    this.positions = function(e, t) {
                        var i = [];
                        t = t || 0;
                        for (var n = 0; n < e.length; n++)
                            i.push(S(e[n], t));
                        return i
                    }(e, this.getHeight())
                }
            }]),
            e
        }())
          , b = (i("pFYg"),
        Math.PI / 2)
          , D = (Math.PI,
        function(e, t) {
            return Math.sqrt(Math.pow(e[0] - t[0], 2) + Math.pow(e[1] - t[1], 2))
        }
        )
          , I = function(e) {
            var t = 0;
            return e && Array.isArray(e) && e.length > 0 && e.forEach(function(i, n) {
                n < e.length - 1 && (t += D(i, e[n + 1]))
            }),
            t
        }
          , _ = function(e) {
            return Math.pow(I(e), .99)
        }
          , H = function(e, t) {
            return [(e[0] + t[0]) / 2, (e[1] + t[1]) / 2]
        }
          , O = function(e, t) {
            var i = void 0
              , n = Math.asin(Math.abs(t[1] - e[1]) / D(e, t));
            return t[1] >= e[1] && t[0] >= e[0] ? i = n + Math.PI : t[1] >= e[1] && t[0] < e[0] ? i = 2 * Math.PI - n : t[1] < e[1] && t[0] < e[0] ? i = n : t[1] < e[1] && t[0] >= e[0] && (i = Math.PI - n),
            i
        }
          , R = function(e, t, i) {
            var n = O(t, e) - O(t, i);
            return n < 0 ? n + 2 * Math.PI : n
        }
          , F = function(e, t, i) {
            return (i[1] - e[1]) * (t[0] - e[0]) > (t[1] - e[1]) * (i[0] - e[0])
        }
          , W = function(e, t, i, n, o) {
            var s = 1 - (e = Math.max(Math.min(e, 1), 0))
              , r = e * e
              , a = r * e
              , l = s * s
              , h = l * s;
            return [h * t[0] + 3 * l * e * i[0] + 3 * s * r * n[0] + a * o[0], h * t[1] + 3 * l * e * i[1] + 3 * s * r * n[1] + a * o[1]]
        }
          , N = function(e, t, i, n, o) {
            var s = O(e, t)
              , r = o ? s + i : s - i
              , a = n * Math.cos(r)
              , l = n * Math.sin(r);
            return [t[0] + a, t[1] + l]
        }
          , V = function(e, t, i, n) {
            var o = G(t, i, n)
              , s = null
              , r = null
              , a = null
              , l = Math.sqrt(o[0] * o[0] + o[1] * o[1])
              , h = o[0] / l
              , c = o[1] / l
              , u = D(t, i)
              , p = D(i, n);
            return l > 3e-6 ? F(t, i, n) ? (a = e * u,
            s = [i[0] - a * c, i[1] + a * h],
            a = e * p,
            r = [i[0] + a * c, i[1] - a * h]) : (a = e * u,
            s = [i[0] + a * c, i[1] - a * h],
            a = e * p,
            r = [i[0] - a * c, i[1] + a * h]) : (s = [i[0] + e * (t[0] - i[0]), i[1] + e * (t[1] - i[1])],
            r = [i[0] + e * (n[0] - i[0]), i[1] + e * (n[1] - i[1])]),
            [s, r]
        }
          , G = function(e, t, i) {
            var n = e[0] - t[0]
              , o = e[1] - t[1]
              , s = Math.sqrt(n * n + o * o);
            n /= s,
            o /= s;
            var r = i[0] - t[0]
              , a = i[1] - t[1]
              , l = Math.sqrt(r * r + a * a);
            return [n + (r /= l), o + (a /= l)]
        }
          , B = function(e) {
            if (e.length <= 2)
                return e;
            for (var t = [], i = e.length - 1, n = 0; n <= 1; n += .01) {
                for (var o = 0, s = 0, r = 0; r <= i; r++) {
                    var a = Y(i, r)
                      , l = Math.pow(n, r)
                      , h = Math.pow(1 - n, i - r);
                    o += a * l * h * e[r][0],
                    s += a * l * h * e[r][1]
                }
                t.push([o, s])
            }
            return t.push(e[i]),
            t
        }
          , U = function(e) {
            var t = 1;
            switch (e) {
            case e <= 1:
                t = 1;
                break;
            case 2 === e:
                t = 2;
                break;
            case 3 === e:
                t = 6;
                break;
            case 24 === e:
                t = 24;
                break;
            case 5 === e:
                t = 120;
                break;
            default:
                for (var i = 1; i <= e; i++)
                    t *= i
            }
            return t
        }
          , Y = function(e, t) {
            return U(e) / (U(t) * U(e - t))
        }
          , K = function(e) {
            if (e.length <= 2)
                return e;
            var t = []
              , i = e.length - 2 - 1;
            t.push(e[0]);
            for (var n = 0; n <= i; n++)
                for (var o = 0; o <= 1; o += .05) {
                    for (var s = 0, r = 0, a = 0; a <= 2; a++) {
                        var l = j(a, o);
                        s += l * e[n + a][0],
                        r += l * e[n + a][1]
                    }
                    t.push([s, r])
                }
            return t.push(e[e.length - 1]),
            t
        }
          , j = function(e, t) {
            var i = 0;
            return 0 === e ? i = Math.pow(t - 1, 2) / 2 : 1 === e ? i = (-2 * Math.pow(t, 2) + 2 * t + 1) / 2 : 2 === e && (i = Math.pow(t, 2) / 2),
            i
        };
        var z = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = L.CLOSED_CURVE,
                n.properties.plotName = "曲线面",
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "initConsts",
                value: function() {
                    this.t = .3
                }
            }, {
                key: "generate",
                value: function() {
                    if (!((e = this.getPointCount()) < 2))
                        if (2 == e)
                            this.generatePositions(this.coordinates[0]);
                        else {
                            var e, t = this.getPoints();
                            t.push(t[0], t[1]);
                            for (var i = [], n = 0; n < t.length - 2; n++) {
                                var o = V(this.t, t[n], t[n + 1], t[n + 2]);
                                i = i.concat(o)
                            }
                            i = [i[(e = i.length) - 1]].concat(i.slice(0, e - 1));
                            var s = [];
                            for (n = 0; n < t.length - 2; n++) {
                                var r = t[n]
                                  , a = t[n + 1];
                                s.push(r);
                                for (var l = 0; l <= 100; l++) {
                                    var h = W(l / 100, r, i[2 * n], i[2 * n + 1], a);
                                    s.push(h)
                                }
                                s.push(a)
                            }
                            this.generatePositions(s)
                        }
                }
            }]),
            t
        }(x);
        i("//Fk");
        function $(e, t, i) {
            var n = [];
            i = i || 360;
            for (var o = parseInt(360 / i), s = 0; s <= 360; s += o)
                n.push(Q(e[0], e[1], s, t));
            return n
        }
        function Q(e, t, i, n) {
            var o = n * Math.sin(i * Math.PI / 180)
              , s = n * Math.cos(i * Math.PI / 180)
              , r = 6356725 + 21412 * (90 - t) / 90;
            return [180 * (o / (r * Math.cos(t * Math.PI / 180)) + e * Math.PI / 180) / Math.PI, 180 * (s / r + t * Math.PI / 180) / Math.PI]
        }
        var J = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = L.CIRCLE,
                n.properties.plotName = "正圆",
                n.fixPointCount = 2,
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "generate",
                value: function() {
                    if (!(this.getPointCount() < 2)) {
                        var e = this.coordinates[0][0]
                          , t = this.distance(e, this.coordinates[0][1]);
                        this.generatePositions($(e, t))
                    }
                }
            }, {
                key: "distance",
                value: function(e, t) {
                    var i = e[1] * Math.PI / 180
                      , n = t[1] * Math.PI / 180
                      , o = i - n
                      , s = e[0] * Math.PI / 180 - t[0] * Math.PI / 180
                      , r = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(o / 2), 2) + Math.cos(i) * Math.cos(n) * Math.pow(Math.sin(s / 2), 2)));
                    return r *= 6378.137,
                    r = Math.round(1e4 * r) / 10
                }
            }]),
            t
        }(x)
          , q = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = L.ELLIPSE,
                n.properties.plotName = "椭圆",
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "initConsts",
                value: function() {
                    this.fixPointCount = 2
                }
            }, {
                key: "generate",
                value: function() {
                    if (!(this.getPointCount() < 2)) {
                        var e = this.coordinates[0][0]
                          , t = this.coordinates[0][1]
                          , i = H(e, t)
                          , n = Math.abs((e[0] - t[0]) / 2)
                          , o = Math.abs((e[1] - t[1]) / 2);
                        this.generatePositions(this.generatePoints(i, n, o))
                    }
                }
            }, {
                key: "generatePoints",
                value: function(e, t, i) {
                    for (var n, o, s, r = [], a = 0; a <= 100; a++)
                        s = 2 * Math.PI * a / 100,
                        n = e[0] + t * Math.cos(s),
                        o = e[1] + i * Math.sin(s),
                        r.push([n, o]);
                    return r
                }
            }]),
            t
        }(x)
          , X = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = L.SECTOR,
                n.properties.plotName = "扇形",
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "initConsts",
                value: function() {
                    this.fixPointCount = 3
                }
            }, {
                key: "generate",
                value: function() {
                    if (!(this.getPointCount() < 2))
                        if (2 == this.getPointCount())
                            this.generatePositions(this.coordinates[0]);
                        else {
                            var e = this.getPoints()
                              , t = e[0]
                              , i = e[1]
                              , n = e[2]
                              , o = (D(i, t),
                            180 * O(i, t) / 3.14)
                              , s = 180 * O(n, t) / 3.14
                              , r = this.distance(i, t)
                              , a = this.generatSectorPoints(t, r, o, s);
                            a.push(t, a[0]),
                            this.generatePositions(a)
                        }
                }
            }, {
                key: "distance",
                value: function(e, t) {
                    var i = e[1] * Math.PI / 180
                      , n = t[1] * Math.PI / 180
                      , o = i - n
                      , s = e[0] * Math.PI / 180 - t[0] * Math.PI / 180
                      , r = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(o / 2), 2) + Math.cos(i) * Math.cos(n) * Math.pow(Math.sin(s / 2), 2)));
                    return r *= 6378.137,
                    r = Math.round(1e4 * r) / 10
                }
            }, {
                key: "generatSectorPoints",
                value: function(e, t, i, n) {
                    var o = [];
                    if ((i = 90 - i) < (n = 90 - n))
                        for (var s = i; s < n; s += 2)
                            o.push(this.getCirclePoint(e[0], e[1], s, t));
                    else
                        for (var r = i; r > n; r -= 2)
                            o.push(this.getCirclePoint(e[0], e[1], r, t));
                    return o
                }
            }, {
                key: "getCirclePoint",
                value: function(e, t, i, n) {
                    var o = n * Math.sin(i * Math.PI / 180)
                      , s = n * Math.cos(i * Math.PI / 180)
                      , r = 6356725 + 21412 * (90 - t) / 90;
                    return [180 * (o / (r * Math.cos(t * Math.PI / 180)) + e * Math.PI / 180) / Math.PI, 180 * (s / r + t * Math.PI / 180) / Math.PI]
                }
            }]),
            t
        }(x)
          , Z = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = L.RECTANGLE,
                n.properties.plotName = "矩形",
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "initConsts",
                value: function() {
                    this.fixPointCount = 2
                }
            }, {
                key: "generate",
                value: function() {
                    if (!(this.getPointCount() < 2)) {
                        var e = this.coordinates[0][0]
                          , t = this.coordinates[0][1]
                          , i = Math.min(e[0], t[0])
                          , n = Math.max(e[0], t[0])
                          , o = Math.min(e[1], t[1])
                          , s = Math.max(e[1], t[1])
                          , r = [i, s]
                          , a = [n, s]
                          , l = [n, o]
                          , h = [i, o];
                        this.generatePositions([r, a, l, h])
                    }
                }
            }]),
            t
        }(x)
          , ee = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = L.FINE_ARROW,
                n.properties.plotName = "直箭头",
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "initConsts",
                value: function() {
                    this.tailWidthFactor = .1,
                    this.neckWidthFactor = .2,
                    this.headWidthFactor = .25,
                    this.headAngle = Math.PI / 8.5,
                    this.neckAngle = Math.PI / 13,
                    this.fixPointCount = 2
                }
            }, {
                key: "generate",
                value: function() {
                    if (!(this.getPointCount() < 2)) {
                        var e = this.getPoints()
                          , t = e[0]
                          , i = e[1]
                          , n = _(e)
                          , o = n * this.tailWidthFactor
                          , s = n * this.neckWidthFactor
                          , r = n * this.headWidthFactor
                          , a = N(i, t, b, o, !0)
                          , l = N(i, t, b, o, !1)
                          , h = N(t, i, this.headAngle, r, !1)
                          , c = N(t, i, this.headAngle, r, !0)
                          , u = [a, N(t, i, this.neckAngle, s, !1), h, i, c, N(t, i, this.neckAngle, s, !0), l];
                        this.generatePositions(u)
                    }
                }
            }]),
            t
        }(x)
          , te = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = L.ASSAULT_DIRECTION,
                n.properties.plotName = "突击方向",
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "initConsts",
                value: function() {
                    this.tailWidthFactor = .2,
                    this.neckWidthFactor = .25,
                    this.headWidthFactor = .3,
                    this.headAngle = Math.PI / 4,
                    this.neckAngle = .17741 * Math.PI,
                    this.fixPointCount = 2
                }
            }]),
            t
        }(ee)
          , ie = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = L.ATTACK_ARROW,
                n.properties.plotName = "进攻方向",
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "initConsts",
                value: function() {
                    this.headHeightFactor = .18,
                    this.headWidthFactor = .3,
                    this.neckHeightFactor = .85,
                    this.neckWidthFactor = .15,
                    this.headTailFactor = .8
                }
            }, {
                key: "generate",
                value: function() {
                    if (!(this.getPointCount() < 2))
                        if (2 != this.getPointCount()) {
                            var e = this.getPoints()
                              , t = e[0]
                              , i = e[1];
                            F(e[0], e[1], e[2]) && (t = e[1],
                            i = e[0]);
                            var n = [H(t, i)].concat(e.slice(2))
                              , o = this.getArrowHeadPoints(n, t, i)
                              , s = o[0]
                              , r = o[4]
                              , a = D(t, i) / _(n)
                              , l = this.getArrowBodyPoints(n, s, r, a)
                              , h = l.length
                              , c = [t].concat(l.slice(0, h / 2));
                            c.push(s);
                            var u = [i].concat(l.slice(h / 2, h));
                            u.push(r),
                            c = K(c),
                            u = K(u),
                            this.generatePositions(c.concat(o, u.reverse()))
                        } else
                            this.generatePositions(this.coordinates[0])
                }
            }, {
                key: "getArrowHeadPoints",
                value: function(e, t, i) {
                    var n = _(e)
                      , o = n * this.headHeightFactor
                      , s = e[e.length - 1];
                    n = D(s, e[e.length - 2]);
                    var r = D(t, i);
                    o > r * this.headTailFactor && (o = r * this.headTailFactor);
                    var a = o * this.headWidthFactor
                      , l = o * this.neckWidthFactor
                      , h = (o = o > n ? n : o) * this.neckHeightFactor
                      , c = N(e[e.length - 2], s, 0, o, !0)
                      , u = N(e[e.length - 2], s, 0, h, !0)
                      , p = N(s, c, b, a, !1)
                      , d = N(s, c, b, a, !0);
                    return [N(s, u, b, l, !1), p, s, d, N(s, u, b, l, !0)]
                }
            }, {
                key: "getArrowBodyPoints",
                value: function(e, t, i, n) {
                    for (var o = I(e), s = _(e) * n, r = (s - D(t, i)) / 2, a = 0, l = [], h = [], c = 1; c < e.length - 1; c++) {
                        var u = R(e[c - 1], e[c], e[c + 1]) / 2
                          , p = (s / 2 - (a += D(e[c - 1], e[c])) / o * r) / Math.sin(u)
                          , d = N(e[c - 1], e[c], Math.PI - u, p, !0)
                          , v = N(e[c - 1], e[c], u, p, !1);
                        l.push(d),
                        h.push(v)
                    }
                    return l.concat(h)
                }
            }]),
            t
        }(x)
          , ne = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = L.TAILED_ATTACK_ARROW,
                n.properties.plotName = "进攻方向尾",
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "initConsts",
                value: function() {
                    this.headHeightFactor = .18,
                    this.headWidthFactor = .3,
                    this.neckHeightFactor = .85,
                    this.neckWidthFactor = .15,
                    this.tailWidthFactor = .1,
                    this.headTailFactor = .8,
                    this.swallowTailFactor = 1,
                    this.swallowTailPnt = null
                }
            }, {
                key: "generate",
                value: function() {
                    if (!((p = this.getPointCount()) < 2))
                        if (2 != this.getPointCount()) {
                            var e = this.getPoints()
                              , t = e[0]
                              , i = e[1];
                            F(e[0], e[1], e[2]) && (t = e[1],
                            i = e[0]);
                            var n = [H(t, i)].concat(e.slice(2))
                              , o = this.getArrowHeadPoints(n, t, i)
                              , s = o[0]
                              , r = o[4]
                              , a = D(t, i)
                              , l = _(n)
                              , h = l * this.tailWidthFactor * this.swallowTailFactor;
                            this.swallowTailPnt = N(n[1], n[0], 0, h, !0);
                            var c = a / l
                              , u = this.getArrowBodyPoints(n, s, r, c)
                              , p = u.length
                              , d = [t].concat(u.slice(0, p / 2));
                            d.push(s);
                            var v = [i].concat(u.slice(p / 2, p));
                            v.push(r),
                            d = K(d),
                            v = K(v),
                            this.generatePositions(d.concat(o, v.reverse(), [this.swallowTailPnt, d[0]]))
                        } else
                            this.generatePositions(this.coordinates[0])
                }
            }]),
            t
        }(ie)
          , oe = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = L.DOUBLE_ARROW,
                n.properties.plotName = "钳击",
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "initConsts",
                value: function() {
                    this.headHeightFactor = .25,
                    this.headWidthFactor = .3,
                    this.neckHeightFactor = .85,
                    this.neckWidthFactor = .15,
                    this.connPoint = null,
                    this.tempPoint4 = null,
                    this.fixPointCount = 4
                }
            }, {
                key: "generate",
                value: function() {
                    if (!((s = this.getPointCount()) < 2))
                        if (2 != s) {
                            var e, t, i = this.coordinates[0][0], n = this.coordinates[0][1], o = this.coordinates[0][2], s = this.getPointCount();
                            this.tempPoint4 = 3 == s ? this.getTempPoint4(i, n, o) : this.coordinates[0][3],
                            this.connPoint = 3 == s || 4 == s ? H(i, n) : this.coordinates[0][4],
                            F(i, n, o) ? (e = this.getArrowPoints(i, this.connPoint, this.tempPoint4, !1),
                            t = this.getArrowPoints(this.connPoint, n, o, !0)) : (e = this.getArrowPoints(n, this.connPoint, o, !1),
                            t = this.getArrowPoints(this.connPoint, i, this.tempPoint4, !0));
                            var r = e.length
                              , a = (r - 5) / 2
                              , l = e.slice(0, a)
                              , h = e.slice(a, a + 5)
                              , c = e.slice(a + 5, r)
                              , u = t.slice(0, a)
                              , p = t.slice(a, a + 5)
                              , d = t.slice(a + 5, r);
                            u = B(u);
                            var v = B(d.concat(l.slice(1)));
                            c = B(c);
                            var y = u.concat(p, v, h, c);
                            this.generatePositions(y)
                        } else
                            this.generatePositions(this.coordinates[0])
                }
            }, {
                key: "getArrowPoints",
                value: function(e, t, i, n) {
                    var o = H(e, t)
                      , s = D(o, i)
                      , r = N(i, o, 0, .3 * s, !0)
                      , a = N(i, o, 0, .5 * s, !0)
                      , l = [o, r = N(o, r, b, s / 5, n), a = N(o, a, b, s / 4, n), i]
                      , h = this.getArrowHeadPoints(l, this.headHeightFactor, this.headWidthFactor, this.neckHeightFactor, this.neckWidthFactor)
                      , c = h[0]
                      , u = h[4]
                      , p = D(e, t) / _(l) / 2
                      , d = this.getArrowBodyPoints(l, c, u, p)
                      , v = d.length
                      , y = d.slice(0, v / 2)
                      , C = d.slice(v / 2, v);
                    return y.push(c),
                    C.push(u),
                    (y = y.reverse()).push(t),
                    (C = C.reverse()).push(e),
                    y.reverse().concat(h, C)
                }
            }, {
                key: "getArrowHeadPoints",
                value: function(e, t, i) {
                    var n = _(e) * this.headHeightFactor
                      , o = e[e.length - 1]
                      , s = (D(t, i),
                    n * this.headWidthFactor)
                      , r = n * this.neckWidthFactor
                      , a = n * this.neckHeightFactor
                      , l = N(e[e.length - 2], o, 0, n, !0)
                      , h = N(e[e.length - 2], o, 0, a, !0)
                      , c = N(o, l, b, s, !1)
                      , u = N(o, l, b, s, !0);
                    return [N(o, h, b, r, !1), c, o, u, N(o, h, b, r, !0)]
                }
            }, {
                key: "getArrowBodyPoints",
                value: function(e, t, i, n) {
                    for (var o = I(e), s = _(e) * n, r = (s - D(t, i)) / 2, a = 0, l = [], h = [], c = 1; c < e.length - 1; c++) {
                        var u = R(e[c - 1], e[c], e[c + 1]) / 2
                          , p = (s / 2 - (a += D(e[c - 1], e[c])) / o * r) / Math.sin(u)
                          , d = N(e[c - 1], e[c], Math.PI - u, p, !0)
                          , v = N(e[c - 1], e[c], u, p, !1);
                        l.push(d),
                        h.push(v)
                    }
                    return l.concat(h)
                }
            }, {
                key: "getTempPoint4",
                value: function(e, t, i) {
                    var n, o, s, r, a = H(e, t), l = D(a, i), h = R(e, a, i);
                    return h < b ? (o = l * Math.sin(h),
                    s = l * Math.cos(h),
                    r = N(e, a, b, o, !1),
                    n = N(a, r, b, s, !0)) : h >= b && h < Math.PI ? (o = l * Math.sin(Math.PI - h),
                    s = l * Math.cos(Math.PI - h),
                    r = N(e, a, b, o, !1),
                    n = N(a, r, b, s, !1)) : h >= Math.PI && h < 1.5 * Math.PI ? (o = l * Math.sin(h - Math.PI),
                    s = l * Math.cos(h - Math.PI),
                    r = N(e, a, b, o, !0),
                    n = N(a, r, b, s, !0)) : (o = l * Math.sin(2 * Math.PI - h),
                    s = l * Math.cos(2 * Math.PI - h),
                    r = N(e, a, b, o, !0),
                    n = N(a, r, b, s, !1)),
                    n
                }
            }]),
            t
        }(x)
          , se = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = L.GATHERING_PLACE,
                n.properties.plotName = "集结地",
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "initConsts",
                value: function() {
                    this.t = .4,
                    this.fixPointCount = 3
                }
            }, {
                key: "generate",
                value: function() {
                    var e = this.getPoints();
                    if (!(e.length < 2)) {
                        if (2 == this.getPointCount()) {
                            var t = H(e[0], e[1])
                              , i = D(e[0], t) / .9
                              , n = N(e[0], t, b, i, !0);
                            e = [e[0], n, e[1]]
                        }
                        t = H(e[0], e[2]);
                        e.push(t, e[0], e[1]);
                        for (var o = [], s = 0; s < e.length - 2; s++) {
                            var r = e[s]
                              , a = e[s + 1]
                              , l = e[s + 2]
                              , h = V(this.t, r, a, l);
                            o = o.concat(h)
                        }
                        var c = o.length;
                        o = [o[c - 1]].concat(o.slice(0, c - 1));
                        var u = [];
                        for (s = 0; s < e.length - 2; s++) {
                            r = e[s],
                            a = e[s + 1],
                            u.push(r);
                            for (var p = 0; p <= 100; p++) {
                                n = W(p / 100, r, o[2 * s], o[2 * s + 1], a);
                                u.push(n)
                            }
                            u.push(a)
                        }
                        this.generatePositions(u)
                    }
                }
            }]),
            t
        }(x)
          , re = function(e) {
            function t(e, i, n) {
                o()(this, t);
                var s = P()(this, (t.__proto__ || E()(t)).call(this, e, i, n));
                return s.properties.plotType = L.SQUAD_COMBAT,
                s.properties.plotName = "分队战斗",
                s.minPointCount = 2,
                s
            }
            return g()(t, e),
            r()(t, [{
                key: "initConsts",
                value: function() {
                    this.headHeightFactor = .18,
                    this.headWidthFactor = .3,
                    this.neckHeightFactor = .85,
                    this.neckWidthFactor = .15,
                    this.tailWidthFactor = .1
                }
            }, {
                key: "generate",
                value: function() {
                    if (!((r = this.getPointCount()) < 2)) {
                        var e = this.getPoints()
                          , t = this.getTailPoints(e)
                          , i = this.getArrowHeadPoints(e, t[0], t[1])
                          , n = i[0]
                          , o = i[4]
                          , s = this.getArrowBodyPoints(e, n, o, this.tailWidthFactor)
                          , r = s.length
                          , a = [t[0]].concat(s.slice(0, r / 2));
                        a.push(n);
                        var l = [t[1]].concat(s.slice(r / 2, r));
                        l.push(o),
                        a = K(a),
                        l = K(l),
                        this.generatePositions(a.concat(i, l.reverse()))
                    }
                }
            }, {
                key: "getTailPoints",
                value: function(e) {
                    var t = _(e) * this.tailWidthFactor;
                    return [N(e[1], e[0], b, t, !1), N(e[1], e[0], b, t, !0)]
                }
            }]),
            t
        }(ie)
          , ae = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = L.TAILED_SQUAD_COMBAT,
                n.properties.plotName = "分队战斗尾",
                n.minPointCount = 2,
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "initConsts",
                value: function() {
                    this.headHeightFactor = .18,
                    this.headWidthFactor = .3,
                    this.neckHeightFactor = .85,
                    this.neckWidthFactor = .15,
                    this.tailWidthFactor = .1,
                    this.swallowTailFactor = 1,
                    this.swallowTailPnt = null
                }
            }, {
                key: "generate",
                value: function() {
                    if (!((r = this.getPointCount()) < 2)) {
                        var e = this.getPoints()
                          , t = this.getTailPoints(e)
                          , i = this.getArrowHeadPoints(e, t[0], t[2])
                          , n = i[0]
                          , o = i[4]
                          , s = this.getArrowBodyPoints(e, n, o, this.tailWidthFactor)
                          , r = s.length
                          , a = [t[0]].concat(s.slice(0, r / 2));
                        a.push(n);
                        var l = [t[2]].concat(s.slice(r / 2, r));
                        l.push(o),
                        a = K(a),
                        l = K(l),
                        this.generatePositions(a.concat(i, l.reverse(), [t[1], a[0]]))
                    }
                }
            }, {
                key: "getTailPoints",
                value: function(e) {
                    var t = _(e) * this.tailWidthFactor
                      , i = N(e[1], e[0], b, t, !1)
                      , n = N(e[1], e[0], b, t, !0)
                      , o = t * this.swallowTailFactor;
                    return [i, N(e[1], e[0], 0, o, !0), n]
                }
            }]),
            t
        }(ie)
          , le = {
            createPlot: function(e, t, i) {
                switch (t) {
                case L.POLYGON:
                    return new x(e,i);
                case L.DOUBLE_ARROW:
                    return new oe(e,i);
                case L.ATTACK_ARROW:
                    return new ie(e,i);
                case L.ELLIPSE:
                    return new q(e,i);
                case L.CIRCLE:
                    return new J(e,i);
                case L.FINE_ARROW:
                    return new ee(e,i);
                case L.TAILED_ATTACK_ARROW:
                    return new ne(e,i);
                case L.ASSAULT_DIRECTION:
                    return new te(e,i);
                case L.GATHERING_PLACE:
                    return new se(e,i);
                case L.CLOSED_CURVE:
                    return new z(e,i);
                case L.SECTOR:
                    return new X(e,i);
                case L.RECTANGLE:
                    return new Z(e,i);
                case L.SQUAD_COMBAT:
                    return new re(e,i);
                case L.TAILED_SQUAD_COMBAT:
                    return new ae(e,i)
                }
            }
        }
          , he = function() {
            function e(t) {
                o()(this, e),
                this.viewer = t,
                this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK),
                this.initEvents()
            }
            return r()(e, [{
                key: "activate",
                value: function(e) {
                    this.plotType = e,
                    this.clear(),
                    this.points = [],
                    this.plotDrawTip = new p(this.viewer),
                    this.MousePoint = new d(this.viewer),
                    this.registerEvents(),
                    this.viewer.enableCursorStyle = !1,
                    this.viewer._element.style.cursor = "default",
                    this.initMouseTip(),
                    this.PlotDrawStartEvent.raiseEvent()
                }
            }, {
                key: "initMouseTip",
                value: function() {
                    var e = this.getPlotNam();
                    switch (this.plotType) {
                    case L.MARKER:
                        this.plotDrawTip.setContent(["当前绘制类型：" + e + "，需要1个点", "按下鼠标左键确定位置", "按下鼠标右键取消绘制"]);
                        break;
                    case L.POLYLINE:
                    case L.SQUAD_COMBAT:
                    case L.TAILED_SQUAD_COMBAT:
                        this.plotDrawTip.setContent(["当前绘制类型：" + e + "，最少需要2个点", "按下鼠标左键确定第一个点的位置", "按下鼠标右键取消绘制"]);
                        break;
                    case L.ELLIPSE:
                    case L.CIRCLE:
                    case L.RECTANGLE:
                    case L.FINE_ARROW:
                    case L.ASSAULT_DIRECTION:
                        this.plotDrawTip.setContent(["当前绘制类型：" + e + "，需要2个点", "按下鼠标左键确定第一个点的位置", "按下鼠标右键取消绘制"]);
                        break;
                    case L.POLYGON:
                    case L.ATTACK_ARROW:
                    case L.TAILED_ATTACK_ARROW:
                    case L.CLOSED_CURVE:
                        this.plotDrawTip.setContent(["当前绘制类型：" + e + "，最少需要3个点", "按下鼠标左键确定第一个点的位置", "按下鼠标右键取消绘制"]);
                        break;
                    case L.GATHERING_PLACE:
                    case L.SECTOR:
                        this.plotDrawTip.setContent(["当前绘制类型：" + e + "，需要3个点", "按下鼠标左键确定第一个点的位置", "按下鼠标右键取消绘制"]);
                        break;
                    case L.DOUBLE_ARROW:
                        this.plotDrawTip.setContent(["当前绘制类型：" + e + "，需要4个点", "按下鼠标左键确定第一个点的位置", "按下鼠标右键取消绘制"])
                    }
                }
            }, {
                key: "getPlotNam",
                value: function() {
                    switch (this.plotType) {
                    case L.MARKER:
                        return "点";
                    case L.POLYLINE:
                        return "线";
                    case L.POLYGON:
                        return "面";
                    case L.ELLIPSE:
                        return "椭圆";
                    case L.CIRCLE:
                        return "正圆";
                    case L.RECTANGLE:
                        return "矩形";
                    case L.CLOSED_CURVE:
                        return "曲线面";
                    case L.SECTOR:
                        return "扇形";
                    case L.FINE_ARROW:
                        return "直箭头";
                    case L.ASSAULT_DIRECTION:
                        return "突击方向";
                    case L.ATTACK_ARROW:
                        return "点进攻方向";
                    case L.TAILED_ATTACK_ARROW:
                        return "进攻方向尾";
                    case L.GATHERING_PLACE:
                        return "集结地";
                    case L.SQUAD_COMBAT:
                        return "分队作战";
                    case L.TAILED_SQUAD_COMBAT:
                        return "分队作战尾";
                    case L.DOUBLE_ARROW:
                        return "钳击"
                    }
                }
            }, {
                key: "deactivate",
                value: function() {
                    this.unRegisterEvents(),
                    this.plotType = void 0,
                    this.viewer._element.style.cursor = "pointer",
                    this.viewer.enableCursorStyle = !0,
                    this.plotDrawTip && (this.plotDrawTip.remove(),
                    this.MousePoint.remove(),
                    this.plotDrawTip = void 0,
                    this.MousePoint = void 0)
                }
            }, {
                key: "clear",
                value: function() {
                    this.plot && (this.plot.remove(),
                    this.plot = void 0)
                }
            }, {
                key: "generatePlot",
                value: function(e, t) {
                    var i = {
                        type: "Feature",
                        properties: {
                            plotCode: Object(u.f)(),
                            style: {
                                height: t
                            }
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: [e]
                        }
                    };
                    this.plot = le.createPlot(this.viewer, this.plotType, i),
                    this.plot.openEditMode(!0)
                }
            }, {
                key: "initEvents",
                value: function() {
                    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas),
                    this.PlotDrawStartEvent = new Cesium.Event,
                    this.PlotDrawEndEvent = new Cesium.Event
                }
            }, {
                key: "registerEvents",
                value: function() {
                    this.leftClickEvent(),
                    this.rightClickEvent(),
                    this.mouseMoveEvent()
                }
            }, {
                key: "leftClickEvent",
                value: function() {
                    var e = this;
                    this.handler.setInputAction(function(t) {
                        e.viewer._element.style.cursor = "default";
                        var i = e.viewer.scene.pickPosition(t.position);
                        if (i || (i = e.viewer.scene.camera.pickEllipsoid(t.position, e.viewer.scene.globe.ellipsoid)),
                        i) {
                            var n = M(i)
                              , o = Cesium.Cartographic.fromCartesian(i);
                            if (0 == e.points.length)
                                e.points.push(n),
                                e.generatePlot(e.points, o.height);
                            else {
                                if (D(n, e.points[e.points.length - 1]) < 3e-6)
                                    return;
                                e.points.push(n),
                                e.plot.setPoints(e.points)
                            }
                            e.setMouseTipContent(),
                            e.plot.fixPointCount == e.points.length && (e.drawEnd(),
                            e.deactivate())
                        }
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                }
            }, {
                key: "setMouseTipContent",
                value: function() {
                    var e = this.getPlotNam();
                    switch (this.plotType) {
                    case L.POLYLINE:
                    case L.SQUAD_COMBAT:
                    case L.TAILED_SQUAD_COMBAT:
                        this.plotDrawTip.setContent(["当前绘制类型：" + e + "，最少需要2个点", "已有" + this.points.length + "个点，按下鼠标左键确定第" + (this.points.length + 1) + "个点", , this.points.length < 2 ? "按下鼠标右键取消绘制" : "按下鼠标右键结束绘制"]);
                        break;
                    case L.ELLIPSE:
                    case L.CIRCLE:
                    case L.RECTANGLE:
                    case L.FINE_ARROW:
                    case L.ASSAULT_DIRECTION:
                        this.plotDrawTip.setContent(["当前绘制类型：" + e + "，需要2个点", "已有" + this.points.length + "个点，按下鼠标左键确定第" + (this.points.length + 1) + "个点", , "按下鼠标右键取消绘制"]);
                        break;
                    case L.POLYGON:
                    case L.ATTACK_ARROW:
                    case L.TAILED_ATTACK_ARROW:
                    case L.CLOSED_CURVE:
                        this.plotDrawTip.setContent(["当前绘制类型：" + e + "，最少需要3个点", "已有" + this.points.length + "个点，按下鼠标左键确定第" + (this.points.length + 1) + "个点", , this.points.length < 3 ? "按下鼠标右键取消绘制" : "按下鼠标右键结束绘制"]);
                        break;
                    case L.GATHERING_PLACE:
                    case L.SECTOR:
                        this.plotDrawTip.setContent(["当前绘制类型：" + e + "，需要3个点", "已有" + this.points.length + "个点，按下鼠标左键确定第" + (this.points.length + 1) + "个点", , "按下鼠标右键取消绘制"]);
                        break;
                    case L.DOUBLE_ARROW:
                        this.plotDrawTip.setContent(["当前绘制类型：" + e + "，需要4个点", "已有" + this.points.length + "个点，按下鼠标左键确定第" + (this.points.length + 1) + "个点", , "按下鼠标右键取消绘制"])
                    }
                }
            }, {
                key: "mouseMoveEvent",
                value: function() {
                    var e = this;
                    this.handler.setInputAction(function(t) {
                        var i = e.viewer.scene.pickPosition(t.endPosition);
                        if (i || (i = e.viewer.scene.camera.pickEllipsoid(t.endPosition, e.viewer.scene.globe.ellipsoid)),
                        i && (e.plotDrawTip.updatePosition(i),
                        e.MousePoint.updatePosition(i),
                        e.plot)) {
                            var n = M(i);
                            if (!(D(n, e.points[e.points.length - 1]) < 3e-6)) {
                                var o = e.points.concat([n]);
                                e.plot.setPoints(o)
                            }
                        }
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "rightClickEvent",
                value: function() {
                    var e = this;
                    this.handler.setInputAction(function(t) {
                        0 != e.points.length ? e.plot.fixPointCount ? e.points.length == e.plot.fixPointCount ? (e.plot.setPoints(e.points),
                        e.drawEnd(),
                        e.deactivate()) : (e.deactivate(),
                        e.clear()) : e.points.length >= e.plot.minPointCount ? (e.plot.setPoints(e.points),
                        e.drawEnd(),
                        e.deactivate()) : (e.deactivate(),
                        e.clear()) : e.deactivate()
                    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
                }
            }, {
                key: "unRegisterEvents",
                value: function() {
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE),
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
                }
            }, {
                key: "drawEnd",
                value: function() {
                    this.plot.openEditMode(!1),
                    this.PlotDrawEndEvent.raiseEvent(this.plot, this.plotType)
                }
            }]),
            e
        }()
          , ce = function() {
            function e(t, i) {
                o()(this, e),
                this.viewer = t,
                this.militaryPlotLayer = i,
                this.initEventHandler()
            }
            return r()(e, [{
                key: "initEventHandler",
                value: function() {
                    this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas),
                    this.PlotEditEndEvent = new Cesium.Event
                }
            }, {
                key: "activate",
                value: function() {
                    this.deactivate(),
                    this.initLeftClickEventHandler()
                }
            }, {
                key: "deactivate",
                value: function() {
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
                    this.clear()
                }
            }, {
                key: "clear",
                value: function() {
                    this.clearEditVertex()
                }
            }, {
                key: "initLeftClickEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pick(t.position);
                        i && i.id && "MilitaryPlot" == i.id.plotType ? e.militaryPlot && e.militaryPlot.plotCode == i.id.plotCode || (e.handleEditMilitaryPlot(),
                        e.handlePickMilitaryPlot(i.id)) : e.handleEditMilitaryPlot()
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                }
            }, {
                key: "handleEditMilitaryPlot",
                value: function() {
                    this.clear();
                    var e = this.militaryPlot;
                    e && (this.militaryPlot = void 0,
                    e.openEditMode(!1),
                    this.isEdited && (this.PlotEditEndEvent.raiseEvent(e),
                    this.isEdited = !1,
                    this.isEditing = !1))
                }
            }, {
                key: "handlePickMilitaryPlot",
                value: function(e) {
                    this.militaryPlot = this.militaryPlotLayer.getByPlotCode(e.plotCode),
                    this.militaryPlot && (this.isEditing = !1,
                    this.isEdited = !1,
                    this.militaryPlot.openEditMode(!0),
                    this.editPositions = this.plotPointsToPositions(),
                    this.EditMoveCenterPositoin = this.getMilitaryPlotCenterPosition(),
                    this.clear(),
                    this.createEditVertex(),
                    this.registerEvents())
                }
            }, {
                key: "registerEvents",
                value: function() {
                    this.initLeftDownEventHandler(),
                    this.initMouseMoveEventHandler(),
                    this.initLeftUpEventHandler()
                }
            }, {
                key: "unRegisterEvents",
                value: function() {
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "initLeftDownEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pick(t.position);
                        i && i.id && i.id.type && ("MilitaryPlotEditVertex" != i.id.type && "MilitaryPlotEditMoveVertex" != i.id.type || (e.isEditing = !0,
                        e.viewer.scene.screenSpaceCameraController.enableRotate = !1,
                        e.viewer.enableCursorStyle = !1,
                        e.viewer._element.style.cursor = "",
                        document.body.style.cursor = "move",
                        e.editVertext = i.id,
                        e.editVertext.show = !1))
                    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
                }
            }, {
                key: "initLeftUpEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        e.isEditing && (e.viewer.enableCursorStyle = !0,
                        document.body.style.cursor = "default",
                        e.viewer.scene.screenSpaceCameraController.enableRotate = !0,
                        e.editVertext.show = !0,
                        e.isEditing = !1)
                    }, Cesium.ScreenSpaceEventType.LEFT_UP)
                }
            }, {
                key: "initMouseMoveEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pickPosition(t.endPosition);
                        if (i || (i = e.viewer.scene.camera.pickEllipsoid(t.endPosition, e.viewer.scene.globe.ellipsoid)),
                        i && e.isEditing) {
                            if ("MilitaryPlotEditMoveVertex" == e.editVertext.type) {
                                var n = e.EditMoveCenterPositoin;
                                if (!n)
                                    return;
                                e.moveEntityByOffset(n, i)
                            } else
                                e.editPositions[e.editVertext.vertexIndex] = i,
                                e.militaryPlot.properties.plotType == L.MARKER && e.militaryPlot.setHeight(e.getPositionHeight(e.editPositions[0])),
                                e.militaryPlot.setPoints(A(e.editPositions));
                            e.isEdited = !0,
                            e.EditMoveCenterPositoin = e.getMilitaryPlotCenterPosition()
                        }
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "getMilitaryPlotCenterPosition",
                value: function() {
                    switch (this.militaryPlot.properties.plotType) {
                    case L.CIRCLE:
                    case L.MARKER:
                        return this.editPositions[0]
                    }
                    var e = turf.lineString(this.militaryPlot.getPoints())
                      , t = turf.bbox(e)
                      , i = turf.bboxPolygon(t)
                      , n = turf.center(i).geometry.coordinates;
                    return Cesium.Cartesian3.fromDegrees(n[0], n[1], this.militaryPlot.getHeight())
                }
            }, {
                key: "moveEntityByOffset",
                value: function(e, t) {
                    for (var i = Object(u.c)(e), n = Object(u.c)(t), o = n.x - i.x, s = n.y - i.y, r = void 0, a = 0; a < this.editPositions.length; a++)
                        (r = Object(u.c)(this.editPositions[a])).x += o,
                        r.y += s,
                        this.editPositions[a] = Cesium.Cartesian3.fromDegrees(r.x, r.y, r.z);
                    this.militaryPlot.setPoints(A(this.editPositions))
                }
            }, {
                key: "getPositionHeight",
                value: function(e) {
                    return Cesium.Cartographic.fromCartesian(e).height
                }
            }, {
                key: "plotPointsToPositions",
                value: function() {
                    for (var e = this.militaryPlot.getPoints(), t = this.militaryPlot.getHeight(), i = [], n = 0; n < e.length; n++) {
                        var o = e[n];
                        i.push(o[0]),
                        i.push(o[1]),
                        i.push(t)
                    }
                    return Cesium.Cartesian3.fromDegreesArrayHeights(i)
                }
            }, {
                key: "createEditVertex",
                value: function() {
                    var e = this;
                    this.vertexEntities = [];
                    var t = this.plotPointsToPositions();
                    if (this.militaryPlot.properties.plotName == L.CIRCLE)
                        return this.createCircleEditVertex(),
                        void this.createEditMoveCenterEntity();
                    t.forEach(function(t, i) {
                        var n = e.viewer.entities.add({
                            position: new Cesium.CallbackProperty(function(t) {
                                return e.editPositions[i]
                            }
                            ,!1),
                            type: "MilitaryPlotEditVertex",
                            vertexIndex: i,
                            point: {
                                color: Cesium.Color.DARKBLUE.withAlpha(.4),
                                pixelSize: 10,
                                outlineColor: Cesium.Color.YELLOW.withAlpha(.4),
                                outlineWidth: 3,
                                disableDepthTestDistance: 2e3
                            }
                        });
                        e.vertexEntities.push(n)
                    }),
                    1 != this.editPositions.length && this.createEditMoveCenterEntity()
                }
            }, {
                key: "createCircleEditVertex",
                value: function() {
                    var e = this
                      , t = this.viewer.entities.add({
                        position: new Cesium.CallbackProperty(function(t) {
                            return e.editPositions[1]
                        }
                        ,!1),
                        type: "MilitaryPlotEditVertex",
                        vertexIndex: 1,
                        point: {
                            color: Cesium.Color.DARKBLUE.withAlpha(.4),
                            pixelSize: 10,
                            outlineColor: Cesium.Color.YELLOW.withAlpha(.4),
                            outlineWidth: 3,
                            disableDepthTestDistance: 2e3
                        }
                    });
                    this.vertexEntities.push(t)
                }
            }, {
                key: "createEditMoveCenterEntity",
                value: function() {
                    var e = this;
                    this.EditMoveCenterEntity = this.viewer.entities.add({
                        position: new Cesium.CallbackProperty(function(t) {
                            return e.EditMoveCenterPositoin
                        }
                        ,!1),
                        type: "MilitaryPlotEditMoveVertex",
                        point: {
                            color: Cesium.Color.RED.withAlpha(.4),
                            pixelSize: 10,
                            outlineColor: Cesium.Color.WHITE.withAlpha(.3),
                            outlineWidth: 3,
                            disableDepthTestDistance: 2e3
                        }
                    })
                }
            }, {
                key: "clearEditVertex",
                value: function() {
                    var e = this;
                    this.vertexEntities && this.vertexEntities.forEach(function(t) {
                        e.viewer.entities.remove(t)
                    }),
                    this.vertexEntities = [],
                    this.viewer.entities.remove(this.EditMoveCenterEntity)
                }
            }]),
            e
        }()
          , ue = function(e) {
            function t(e) {
                o()(this, t);
                var i = P()(this, (t.__proto__ || E()(t)).call(this, e));
                return i.selectedPlotChanged = new Cesium.Event,
                i.initEvent(),
                i
            }
            return g()(t, e),
            r()(t, [{
                key: "addPlot",
                value: function(e) {
                    var t = le.createPlot(this.viewer, e.properties.plotType, e);
                    return this.plots.push(t),
                    t
                }
            }, {
                key: "flyToByPlotCode",
                value: function(e) {
                    var t = this
                      , i = this.getByPlotCode(e);
                    if (i) {
                        this.setSelectedPlot(i);
                        var n = this.viewer.entities.add({
                            polygon: {
                                hierarchy: i.positions,
                                perPositionHeight: !0,
                                material: Cesium.Color.YELLOW.withAlpha(.001),
                                outline: !1
                            }
                        });
                        this.viewer.flyTo(n).then(function() {
                            t.viewer.entities.remove(n)
                        })
                    }
                }
            }, {
                key: "setSelectedPlot",
                value: function(e) {
                    this.plotSelecteable && (this.selectedPlot && this.selectedPlot.setSelected(!1),
                    this.selectedPlot = e,
                    this.selectedPlot.setSelected(!0),
                    this.selectedPlotChanged.raiseEvent(e))
                }
            }, {
                key: "clearSelectedPlot",
                value: function() {
                    this.selectedPlot && (this.selectedPlot.setSelected(!1),
                    this.selectedPlot.openEditMode(!1),
                    this.selectedPlot = void 0)
                }
            }, {
                key: "initEvent",
                value: function() {
                    var e = this;
                    new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas).setInputAction(function(t) {
                        if (e.plotSelecteable) {
                            var i = e.viewer.scene.pick(t.position);
                            if (i && i.id) {
                                if (i.id && i.id.type && "MilitaryPlot" == i.id.type || e.selectedPlot && (e.selectedPlot.setSelected(!1),
                                e.selectedPlot = void 0,
                                e.selectedPlotChanged.raiseEvent(void 0)),
                                !e.selectedPlot || e.selectedPlot.properties.plotCode != i.id.plotCode) {
                                    var n = e.getByPlotCode(i.id.plotCode);
                                    n ? (e.selectedPlot = n,
                                    e.selectedPlot.setSelected(!0),
                                    e.selectedPlotChanged.raiseEvent(n)) : (e.selectedPlot && (e.selectedPlot.setSelected(!1),
                                    e.selectedPlot = void 0),
                                    e.selectedPlotChanged.raiseEvent(void 0))
                                }
                            } else
                                e.selectedPlot && (e.selectedPlot.setSelected(!1),
                                e.selectedPlot = void 0,
                                e.selectedPlotChanged.raiseEvent(void 0))
                        }
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                }
            }]),
            t
        }(w.a)
          , pe = function() {
            function e(t, i) {
                o()(this, e),
                this.viewer = t,
                this.htmlPlotLayer = i,
                this.registerMouseEvents()
            }
            return r()(e, [{
                key: "registerMouseEvents",
                value: function() {
                    this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas),
                    this.initLeftDownEventHandler(),
                    this.initMouseMoveEventHandler(),
                    this.initLeftUpEventHandler()
                }
            }, {
                key: "unRegisterMouseEvents",
                value: function() {
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "destroy",
                value: function() {
                    this.unRegisterMouseEvents(),
                    this.viewer = void 0,
                    this.htmlPlotLayer = void 0,
                    this.eventHandler = void 0
                }
            }, {
                key: "initLeftDownEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        if (e.htmlPlotLayer.selectedPlot) {
                            var i = e.viewer.scene.pick(t.position);
                            i && i.id && "HtmlPlot" === i.id.type && e.htmlPlotLayer.selectedPlot.properties.plotCode == i.id.plotCode && (e.viewer.enableCursorStyle = !1,
                            document.body.style.cursor = "move",
                            e.moveing = !0,
                            e.mousePoint = new d(e.viewer),
                            e.viewer.scene.screenSpaceCameraController.enableRotate = !1)
                        }
                    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
                }
            }, {
                key: "initLeftUpEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        e.moveing && (e.viewer.enableCursorStyle = !0,
                        document.body.style.cursor = "default",
                        e.moveing = !1,
                        e.viewer.scene.screenSpaceCameraController.enableRotate = !0,
                        e.mousePoint.remove(),
                        e.mousePoint = void 0)
                    }, Cesium.ScreenSpaceEventType.LEFT_UP)
                }
            }, {
                key: "initMouseMoveEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        if (e.moveing) {
                            var i = e.viewer.scene.pickPosition(t.endPosition);
                            i && (e.mousePoint.updatePosition(i),
                            e.htmlPlotLayer.selectedPlot.updatePosition(i))
                        }
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }]),
            e
        }()
          , de = {
            SIMPLELABEL: "simplelabel",
            GRADIENTSLABEL: "gradientslabel",
            LOCATIONLABEL: "locationlabel"
        }
          , ve = (i("51bD"),
        function() {
            function e(t, i) {
                o()(this, e),
                this.properties = i.properties,
                this.coordinates = i.geometry.coordinates,
                this.style = this.properties.style || {},
                this.position = Cesium.Cartesian3.fromDegrees(this.coordinates[0], this.coordinates[1], this.coordinates[2]),
                this.properties.plotBase = "Html",
                this.viewer = t,
                this.addBillboard()
            }
            return r()(e, [{
                key: "setSelected",
                value: function(e) {
                    e ? this.container.classList.add("label-container-is-selected") : this.container.classList.remove("label-container-is-selected"),
                    this.setPointVisible(e)
                }
            }, {
                key: "addBillboard",
                value: function() {
                    this.billboardEntity = this.viewer.entities.add({
                        position: this.position,
                        type: "HtmlPlot",
                        plotCode: this.properties.plotCode,
                        point: {
                            color: Cesium.Color.DARKBLUE.withAlpha(.4),
                            pixelSize: 6,
                            outlineColor: Cesium.Color.YELLOW.withAlpha(.4),
                            outlineWidth: 2,
                            scaleByDistance: new Cesium.NearFarScalar(300,1,1200,.4),
                            disableDepthTestDistance: 500
                        }
                    })
                }
            }, {
                key: "setPointVisible",
                value: function(e) {
                    e ? (this.billboardEntity.point.pixelSize = 10,
                    this.billboardEntity.point.outlineWidth = 3,
                    this.billboardEntity.point.outlineColor = Cesium.Color.YELLOW) : (this.billboardEntity.point.pixelSize = 6,
                    this.billboardEntity.point.outlineWidth = 2,
                    this.billboardEntity.point.outlineColor = Cesium.Color.YELLOW.withAlpha(.4))
                }
            }, {
                key: "updatePosition",
                value: function(e) {
                    this.billboardEntity.position = e;
                    var t = Cesium.Cartographic.fromCartesian(e);
                    this.position = e,
                    this.coordinates = [Cesium.Math.toDegrees(t.longitude), Cesium.Math.toDegrees(t.latitude), t.height]
                }
            }, {
                key: "updateLabel",
                value: function(e) {
                    this.labelHtml.innerHTML = e,
                    this.properties.attr.label = e
                }
            }, {
                key: "toGeoJson",
                value: function() {
                    return {
                        type: "Feature",
                        properties: this.properties,
                        geometry: {
                            type: "Point",
                            coordinates: this.coordinates
                        }
                    }
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.entities.remove(this.billboardEntity),
                    this.viewer.cesiumWidget.container.removeChild(this.container),
                    this.viewer.scene.postRender.removeEventListener(this.postRender, this)
                }
            }]),
            e
        }())
          , ye = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = de.SIMPLELABEL,
                n.properties.plotName = "简单文本",
                n.label = n.properties.attr.label,
                n.createDom(),
                n.container.onclick = function(e) {
                    n.layer && n.layer.setSelectedPlot && n.layer.setSelectedPlot(n)
                }
                ,
                n.addPostRender(),
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "createDom",
                value: function() {
                    this.container = document.createElement("div"),
                    this.container.classList.add("simple-label-container");
                    var e = document.createElement("div");
                    e.innerHTML = this.label,
                    this.labelHtml = e,
                    this.container.appendChild(e),
                    this.viewer.cesiumWidget.container.appendChild(this.container)
                }
            }, {
                key: "addPostRender",
                value: function() {
                    this.viewer.scene.postRender.addEventListener(this.postRender, this)
                }
            }, {
                key: "postRender",
                value: function() {
                    if (this.container && this.container.style) {
                        var e = this.viewer.scene.canvas.height
                          , t = new Cesium.Cartesian2;
                        Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, t),
                        this.container.style.bottom = e - t.y + 40 + "px";
                        var i = this.container.offsetWidth;
                        this.container.style.left = t.x - i / 2 + "px",
                        this.viewer.camera.positionCartographic.height > 2e3 ? this.container.style.display = "none" : this.container.style.display = "block"
                    }
                }
            }]),
            t
        }(ve)
          , Ce = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = de.GRADIENTSLABEL,
                n.properties.plotName = "渐变文本",
                n.label = n.properties.attr.label,
                n.createDom(),
                n.container.onclick = function(e) {
                    n.layer && n.layer.setSelectedPlot && n.layer.setSelectedPlot(n)
                }
                ,
                n.addPostRender(),
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "createDom",
                value: function() {
                    this.container = document.createElement("div"),
                    this.container.classList.add("gradients-label-container");
                    var e = document.createElement("div");
                    e.innerHTML = this.label,
                    this.labelHtml = e,
                    this.container.appendChild(e),
                    this.viewer.cesiumWidget.container.appendChild(this.container)
                }
            }, {
                key: "addPostRender",
                value: function() {
                    this.viewer.scene.postRender.addEventListener(this.postRender, this)
                }
            }, {
                key: "postRender",
                value: function() {
                    if (this.container && this.container.style) {
                        var e = this.viewer.scene.canvas.height
                          , t = new Cesium.Cartesian2;
                        Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, t),
                        this.container.style.bottom = e - t.y + 40 + "px";
                        var i = this.container.offsetWidth;
                        this.container.style.left = t.x - i / 2 + "px",
                        this.viewer.camera.positionCartographic.height > 2e3 ? this.container.style.display = "none" : this.container.style.display = "block"
                    }
                }
            }]),
            t
        }(ve)
          , Ee = {
            createPlot: function(e, t, i) {
                switch (t) {
                case de.SIMPLELABEL:
                    return new ye(e,i);
                case de.GRADIENTSLABEL:
                    return new Ce(e,i)
                }
            }
        }
          , fe = function(e) {
            function t(e) {
                o()(this, t);
                var i = P()(this, (t.__proto__ || E()(t)).call(this, e));
                return i.selectedPlotChanged = new Cesium.Event,
                i.initEvent(),
                i
            }
            return g()(t, e),
            r()(t, [{
                key: "initEvent",
                value: function() {
                    var e = this;
                    new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas).setInputAction(function(t) {
                        if (e.plotSelecteable) {
                            var i = e.viewer.scene.pick(t.position);
                            if (i && i.id) {
                                if (i.id && i.id.type && "HtmlPlot" == i.id.type || e.selectedPlot && (e.selectedPlot.setSelected(!1),
                                e.selectedPlot = void 0,
                                e.selectedPlotChanged.raiseEvent(void 0)),
                                !e.selectedPlot || e.selectedPlot.properties.plotCode != i.id.plotCode) {
                                    var n = e.getByPlotCode(i.id.plotCode);
                                    n ? (e.clearSelectedPlot(),
                                    e.selectedPlot = n,
                                    e.selectedPlot.setSelected(!0),
                                    e.selectedPlotChanged.raiseEvent(n)) : (e.selectedPlot && (e.selectedPlot.setSelected(!1),
                                    e.selectedPlot = void 0),
                                    e.selectedPlotChanged.raiseEvent(void 0))
                                }
                            } else
                                e.selectedPlot && (e.selectedPlot.setSelected(!1),
                                e.selectedPlot = void 0,
                                e.selectedPlotChanged.raiseEvent(void 0))
                        }
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                }
            }, {
                key: "addPlot",
                value: function(e) {
                    var t = Ee.createPlot(this.viewer, e.properties.plotType, e);
                    return this.plots.push(t),
                    t.layer = this,
                    t
                }
            }, {
                key: "setSelectedPlot",
                value: function(e) {
                    this.plotSelecteable && (this.selectedPlot && this.selectedPlot.setSelected(!1),
                    this.selectedPlot = e,
                    this.selectedPlot.setSelected(!0),
                    this.selectedPlotChanged.raiseEvent(e))
                }
            }, {
                key: "clearSelectedPlot",
                value: function() {
                    this.selectedPlot && (this.selectedPlot.setSelected(!1),
                    this.selectedPlot = void 0)
                }
            }, {
                key: "flyToByPlotCode",
                value: function(e) {
                    var t = this.getByPlotCode(e);
                    t && (this.setSelectedPlot(t),
                    this.viewer.flyTo(t.billboardEntity))
                }
            }]),
            t
        }(w.a)
          , Pe = {
            POLYHEDRON: "polyhedron",
            HEMISPHERE: "hemisphere",
            CYLINDER: "cylinder"
        }
          , me = function() {
            function e(t, i) {
                o()(this, e),
                this.viewer = t,
                this.properties = i.properties,
                this.properties.plotBase = "HedronPlot",
                this.properties.attr = this.properties.attr || {
                    name: "未命名"
                },
                this.geometry = i.geometry,
                this.coordinates = i.geometry.coordinates,
                this.style = this.properties.style || {},
                this.generatePositions()
            }
            return r()(e, [{
                key: "generatePositions",
                value: function() {
                    var e = this;
                    this.positions = [];
                    var t = void 0;
                    switch (this.geometry.type) {
                    case "Point":
                        t = [this.coordinates];
                        break;
                    case "LineString":
                        t = this.coordinates;
                        break;
                    case "Polygon":
                        t = this.coordinates[0]
                    }
                    t.forEach(function(t) {
                        e.positions.push(Cesium.Cartesian3.fromDegrees(t[0], t[1], t[2]))
                    })
                }
            }, {
                key: "setPositions",
                value: function(e) {
                    switch (this.positions = e || [],
                    this.coordinates = [],
                    this.geometry.type) {
                    case "Point":
                        this.setPointCoordinates();
                        break;
                    case "LineString":
                        this.setLineStringCoordinates();
                        break;
                    case "Polygon":
                        this.setPolygonCoordinates()
                    }
                    this.updatePositionAction && this.updatePositionAction()
                }
            }, {
                key: "setPointCoordinates",
                value: function() {
                    var e = Cesium.Cartographic.fromCartesian(this.positions[0]);
                    this.coordinates = [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude), e.height]
                }
            }, {
                key: "setLineStringCoordinates",
                value: function() {
                    var e = this;
                    this.positions.forEach(function(t) {
                        var i = Cesium.Cartographic.fromCartesian(t)
                          , n = [Cesium.Math.toDegrees(i.longitude), Cesium.Math.toDegrees(i.latitude), i.height];
                        e.coordinates.push(n)
                    })
                }
            }, {
                key: "setPolygonCoordinates",
                value: function() {
                    var e = this;
                    this.coordinates.push([]),
                    this.positions.forEach(function(t) {
                        var i = Cesium.Cartographic.fromCartesian(t)
                          , n = [Cesium.Math.toDegrees(i.longitude), Cesium.Math.toDegrees(i.latitude), i.height];
                        e.coordinates[0].push(n)
                    })
                }
            }, {
                key: "getPositions",
                value: function() {
                    return this.positions.slice(0)
                }
            }, {
                key: "getPositionCount",
                value: function() {
                    return this.positions.length
                }
            }, {
                key: "setSelected",
                value: function(e) {}
            }, {
                key: "openEditMode",
                value: function(e) {}
            }, {
                key: "remove",
                value: function() {}
            }]),
            e
        }();
        function ge(e, t, i) {
            var n = Object(u.b)(e)
              , o = Object(u.g)(e)
              , s = turf.point(n)
              , r = Object(u.d)(t);
            r.push(r[0]);
            var a = turf.polygon([r]);
            if (!turf.booleanContains(a, s))
                return !1;
            var l = Object(u.g)(t[0]);
            return o > l && o < l + i
        }
        var we = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotName = "多边体",
                n.properties.plotType = Pe.POLYHEDRON,
                n.minPositionCount = 3,
                n.style.color = n.style.color || Cesium.Color.LIME.withAlpha(.5).toCssColorString(),
                n.style.extrudedHeight = n.style.extrudedHeight || 100,
                n.properties.style = n.style,
                n.createEntity(),
                n.createLabelEntity(),
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "createEntity",
                value: function() {
                    this.entity = this.viewer.entities.add({
                        plotType: "HedronPlot",
                        plotCode: this.properties.plotCode,
                        polygon: {
                            hierarchy: this.positions,
                            material: Cesium.Color.fromCssColorString(this.style.color),
                            perPositionHeight: !0,
                            extrudedHeight: Object(u.g)(this.positions[0]) + this.style.extrudedHeight
                        }
                    })
                }
            }, {
                key: "createLabelEntity",
                value: function() {
                    this.textEntity = this.viewer.entities.add({
                        position: this.getLabelEntityPosition(),
                        show: !1,
                        plotType: "HedronPlot",
                        plotCode: this.properties.plotCode,
                        label: {
                            text: this.properties.attr.name,
                            fillColor: Cesium.Color.WHITE,
                            scale: .5,
                            font: "normal 40px MicroSoft YaHei",
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0,5e5),
                            scaleByDistance: new Cesium.NearFarScalar(5e4,1,5e5,.4),
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            pixelOffset: new Cesium.Cartesian2(0,-10),
                            outlineWidth: 20,
                            outlineColor: Cesium.Color.BLACK
                        }
                    })
                }
            }, {
                key: "getLabelEntityPosition",
                value: function() {
                    var e = Object(u.d)(this.getPositions());
                    if (e.push(e[0]),
                    e.length < 4)
                        return this.positions[0];
                    var t = turf.polygon([e])
                      , i = turf.bbox(t)
                      , n = turf.bboxPolygon(i)
                      , o = turf.center(n).geometry.coordinates
                      , s = Object(u.g)(this.positions[0]) + this.style.extrudedHeight;
                    return Cesium.Cartesian3.fromDegrees(o[0], o[1], s)
                }
            }, {
                key: "openEditMode",
                value: function(e) {
                    var t = this;
                    e ? (this.entity.polygon.hierarchy = new Cesium.CallbackProperty(function(e) {
                        return new Cesium.PolygonHierarchy(t.positions)
                    }
                    ,!1),
                    this.entity.polygon.extrudedHeight = new Cesium.CallbackProperty(function(e) {
                        return Object(u.g)(t.positions[0]) + t.style.extrudedHeight
                    }
                    ),
                    this.entity.polyline = {
                        positions: new Cesium.CallbackProperty(function(e) {
                            return t.positions.concat(t.positions[0])
                        }
                        ,!1),
                        width: 1,
                        material: new Cesium.PolylineDashMaterialProperty({
                            color: Cesium.Color.YELLOW
                        }),
                        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                            color: Cesium.Color.YELLOW
                        })
                    }) : (this.entity.polygon.hierarchy = this.positions,
                    this.entity.polygon.extrudedHeight = Object(u.g)(this.positions[0]) + this.style.extrudedHeight,
                    this.entity.polyline = {
                        positions: new Cesium.CallbackProperty(function(e) {
                            return t.positions.concat(t.positions[0])
                        }
                        ,!1),
                        width: 0
                    })
                }
            }, {
                key: "updatePositionAction",
                value: function() {
                    Object(u.i)(this.positions),
                    this.textEntity.position = this.getLabelEntityPosition(),
                    this.setPolygonCenter()
                }
            }, {
                key: "updateStyle",
                value: function(e) {
                    this.entity.polygon.extrudedHeight = this.style.extrudedHeight,
                    this.entity.polygon.material = Cesium.Color.fromCssColorString(this.style.color),
                    this.textEntity.label.text = this.properties.attr.name
                }
            }, {
                key: "setSelected",
                value: function(e) {
                    e ? (this.entity.polygon.outline = !0,
                    this.entity.polygon.outlineColor = Cesium.Color.YELLOW) : (this.entity.polygon.outline = !1,
                    this.entity.polygon.outlineColor = Cesium.Color.YELLOW)
                }
            }, {
                key: "toGeoJson",
                value: function() {
                    return {
                        type: "Feature",
                        properties: this.properties,
                        geometry: {
                            type: "Polygon",
                            coordinates: this.coordinates
                        }
                    }
                }
            }, {
                key: "checkTargetIsIntersect",
                value: function(e) {
                    return this.targetPosition = e,
                    ge(e, this.getPositions(), this.style.extrudedHeight)
                }
            }, {
                key: "createLineEntity",
                value: function() {
                    var e = this;
                    this.setPolygonCenter(),
                    this.lineEntity = this.viewer.entities.add({
                        polyline: {
                            positions: new Cesium.CallbackProperty(function(t) {
                                return [e.targetPosition, e.hedronCenter]
                            }
                            ,!1),
                            show: new Cesium.CallbackProperty(function(t) {
                                return Cesium.Cartesian3.distance(e.targetPosition, e.hedronCenter) < 4e3
                            }
                            ,!1),
                            material: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.YELLOW
                            }),
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.YELLOW
                            })
                        }
                    })
                }
            }, {
                key: "setPolygonCenter",
                value: function() {
                    var e = Object(u.d)(this.getPositions());
                    if (e.push(e[0]),
                    e.length < 4)
                        this.hedronCenter = this.positions[0];
                    else {
                        var t = turf.polygon([e])
                          , i = turf.bbox(t)
                          , n = turf.bboxPolygon(i)
                          , o = turf.center(n).geometry.coordinates
                          , s = Object(u.g)(this.positions[0]);
                        this.hedronCenter = Cesium.Cartesian3.fromDegrees(o[0], o[1], s)
                    }
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.entities.remove(this.entity),
                    this.viewer.entities.remove(this.textEntity),
                    this.viewer.entities.remove(this.lineEntity)
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.entities.remove(this.entity)
                }
            }]),
            t
        }(me)
          , ke = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotName = "半球体",
                n.properties.plotType = Pe.HEMISPHERE,
                n.fixPositionCount = 1,
                n.style.color = n.style.color || Cesium.Color.LIME.withAlpha(.5).toCssColorString(),
                n.style.radius = n.style.radius || 200,
                n.properties.style = n.style,
                n.createEntity(),
                n.createLabelEntity(),
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "createEntity",
                value: function() {
                    this.entity = this.viewer.entities.add({
                        plotType: "HedronPlot",
                        plotCode: this.properties.plotCode,
                        position: this.positions[0],
                        ellipsoid: {
                            radii: new Cesium.Cartesian3(this.style.radius,this.style.radius,this.style.radius),
                            maximumCone: Cesium.Math.toRadians(90),
                            material: Cesium.Color.fromCssColorString(this.style.color),
                            subdivisions: 128,
                            stackPartitions: 24,
                            slicePartitions: 24,
                            outline: !0,
                            outlineColor: Cesium.Color.YELLOW.withAlpha(.4)
                        }
                    })
                }
            }, {
                key: "createLabelEntity",
                value: function() {
                    this.textEntity = this.viewer.entities.add({
                        position: this.getLabelEntityPosition(),
                        show: !1,
                        plotType: "HedronPlot",
                        plotCode: this.properties.plotCode,
                        label: {
                            text: this.properties.attr.name,
                            fillColor: Cesium.Color.WHITE,
                            scale: .5,
                            font: "normal 40px MicroSoft YaHei",
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0,5e5),
                            scaleByDistance: new Cesium.NearFarScalar(5e4,1,5e5,.4),
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            pixelOffset: new Cesium.Cartesian2(0,-10),
                            outlineWidth: 20,
                            outlineColor: Cesium.Color.BLACK
                        }
                    })
                }
            }, {
                key: "getLabelEntityPosition",
                value: function() {
                    var e = Object(u.b)(this.positions[0])
                      , t = Object(u.g)(this.positions[0]) + this.style.radius;
                    return Cesium.Cartesian3.fromDegrees(e[0], e[1], t)
                }
            }, {
                key: "updatePositionAction",
                value: function() {
                    this.textEntity.position = this.getLabelEntityPosition()
                }
            }, {
                key: "setVisible",
                value: function(e) {
                    this.entity.show = e
                }
            }, {
                key: "updateStyle",
                value: function(e) {
                    this.entity.ellipsoid.radii = new Cesium.Cartesian3(this.style.radius,this.style.radius,this.style.radius),
                    this.entity.ellipsoid.material = Cesium.Color.fromCssColorString(this.style.color),
                    this.textEntity.label.text = this.properties.attr.name,
                    this.textEntity.position = this.getLabelEntityPosition()
                }
            }, {
                key: "openEditMode",
                value: function(e) {
                    var t = this;
                    this.entity.position = e ? new Cesium.CallbackProperty(function(e) {
                        return t.positions[0]
                    }
                    ) : this.positions[0]
                }
            }, {
                key: "setSelected",
                value: function(e) {
                    e ? (this.entity.ellipsoid.outlineColor = Cesium.Color.YELLOW,
                    this.entity.ellipsoid.stackPartitions = 64,
                    this.entity.ellipsoid.slicePartitions = 64) : (this.setVisible(!0),
                    this.openEditMode(!1),
                    this.entity.ellipsoid.outlineColor = Cesium.Color.YELLOW.withAlpha(.4),
                    this.entity.ellipsoid.stackPartitions = 24,
                    this.entity.ellipsoid.slicePartitions = 24)
                }
            }, {
                key: "toGeoJson",
                value: function() {
                    return {
                        type: "Feature",
                        properties: this.properties,
                        geometry: {
                            type: "Point",
                            coordinates: this.coordinates
                        }
                    }
                }
            }, {
                key: "checkTargetIsIntersect",
                value: function(e) {
                    return this.targetPosition = e,
                    Cesium.Cartesian3.distance(this.positions[0], e) < this.style.radius
                }
            }, {
                key: "createLineEntity",
                value: function() {
                    var e = this;
                    this.lineEntity = this.viewer.entities.add({
                        polyline: {
                            positions: new Cesium.CallbackProperty(function(t) {
                                return [e.targetPosition, e.positions[0]]
                            }
                            ,!1),
                            show: new Cesium.CallbackProperty(function(t) {
                                return Cesium.Cartesian3.distance(e.targetPosition, e.positions[0]) < 4e3
                            }
                            ,!1),
                            material: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.YELLOW
                            }),
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.YELLOW
                            })
                        }
                    })
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.entities.remove(this.entity),
                    this.viewer.entities.remove(this.textEntity),
                    this.viewer.entities.remove(this.lineEntity)
                }
            }]),
            t
        }(me)
          , Te = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotName = "圆柱体",
                n.properties.plotType = Pe.CYLINDER,
                n.fixPositionCount = 1,
                n.style.radius = n.style.radius || 200,
                n.style.color = n.style.color || Cesium.Color.LIME.withAlpha(.5).toCssColorString(),
                n.style.extrudedHeight = n.style.extrudedHeight || 100,
                n.properties.style = n.style,
                n.createEntity(),
                n.createLabelEntity(),
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "createEntity",
                value: function() {
                    this.entity = this.viewer.entities.add({
                        plotType: "HedronPlot",
                        plotCode: this.properties.plotCode,
                        polygon: {
                            hierarchy: this.getHierarchy(),
                            material: Cesium.Color.fromCssColorString(this.style.color),
                            perPositionHeight: !0,
                            extrudedHeight: Object(u.g)(this.positions[0]) + this.style.extrudedHeight
                        }
                    })
                }
            }, {
                key: "createLabelEntity",
                value: function() {
                    this.textEntity = this.viewer.entities.add({
                        position: this.getLabelEntityPosition(),
                        show: !1,
                        plotType: "HedronPlot",
                        plotCode: this.properties.plotCode,
                        label: {
                            text: this.properties.attr.name,
                            fillColor: Cesium.Color.WHITE,
                            scale: .5,
                            font: "normal 40px MicroSoft YaHei",
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0,5e5),
                            scaleByDistance: new Cesium.NearFarScalar(5e4,1,5e5,.4),
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            pixelOffset: new Cesium.Cartesian2(0,-10),
                            outlineWidth: 20,
                            outlineColor: Cesium.Color.BLACK
                        }
                    })
                }
            }, {
                key: "getLabelEntityPosition",
                value: function() {
                    var e = Object(u.b)(this.positions[0])
                      , t = Object(u.g)(this.positions[0]) + this.style.extrudedHeight;
                    return Cesium.Cartesian3.fromDegrees(e[0], e[1], t)
                }
            }, {
                key: "updatePositionAction",
                value: function() {
                    this.textEntity.position = this.getLabelEntityPosition()
                }
            }, {
                key: "setVisible",
                value: function(e) {
                    this.entity.show = e
                }
            }, {
                key: "updateStyle",
                value: function(e) {
                    this.entity.polygon.extrudedHeight = Object(u.g)(this.positions[0]) + this.style.extrudedHeight,
                    this.entity.polygon.hierarchy = this.getHierarchy(),
                    this.entity.polygon.material = Cesium.Color.fromCssColorString(this.style.color),
                    this.textEntity.label.text = this.properties.attr.name,
                    this.textEntity.position = this.getLabelEntityPosition()
                }
            }, {
                key: "getHierarchy",
                value: function() {
                    var e = $([this.coordinates[0], this.coordinates[1]], this.style.radius);
                    return this.circleDsToPositions(e)
                }
            }, {
                key: "circleDsToPositions",
                value: function(e) {
                    var t = this
                      , i = [];
                    return e.map(function(e) {
                        i.push(Cesium.Cartesian3.fromDegrees(e[0], e[1], t.coordinates[2]))
                    }),
                    i
                }
            }, {
                key: "openEditMode",
                value: function(e) {
                    var t = this;
                    e ? (this.entity.polygon.hierarchy = new Cesium.CallbackProperty(function(e) {
                        return t.getHierarchy()
                    }
                    ),
                    this.entity.polygon.extrudedHeight = new Cesium.CallbackProperty(function(e) {
                        return Object(u.g)(t.positions[0]) + t.style.extrudedHeight
                    }
                    )) : (this.entity.polygon.hierarchy = this.getHierarchy(),
                    this.entity.polygon.extrudedHeight = Object(u.g)(this.positions[0]) + this.style.extrudedHeight)
                }
            }, {
                key: "setSelected",
                value: function(e) {
                    e ? (this.entity.polygon.outline = !0,
                    this.entity.polygon.outlineColor = Cesium.Color.YELLOW) : (this.setVisible(!0),
                    this.openEditMode(!1),
                    this.entity.polygon.outline = !1,
                    this.entity.polygon.outlineColor = Cesium.Color.YELLOW)
                }
            }, {
                key: "toGeoJson",
                value: function() {
                    return {
                        type: "Feature",
                        properties: this.properties,
                        geometry: {
                            type: "Point",
                            coordinates: this.coordinates
                        }
                    }
                }
            }, {
                key: "checkTargetIsIntersect",
                value: function(e) {
                    return this.targetPosition = e,
                    ge(e, this.getHierarchy(), this.style.extrudedHeight)
                }
            }, {
                key: "createLineEntity",
                value: function() {
                    var e = this;
                    this.lineEntity = this.viewer.entities.add({
                        polyline: {
                            positions: new Cesium.CallbackProperty(function(t) {
                                return [e.targetPosition, e.positions[0]]
                            }
                            ,!1),
                            show: new Cesium.CallbackProperty(function(t) {
                                return Cesium.Cartesian3.distance(e.targetPosition, e.positions[0]) < 4e3
                            }
                            ,!1),
                            material: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.YELLOW
                            }),
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.YELLOW
                            })
                        }
                    })
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.entities.remove(this.entity),
                    this.viewer.entities.remove(this.textEntity),
                    this.viewer.entities.remove(this.lineEntity)
                }
            }]),
            t
        }(me)
          , Le = {
            createPlot: function(e, t, i) {
                switch (t) {
                case Pe.POLYHEDRON:
                    return new we(e,i);
                case Pe.HEMISPHERE:
                    return new ke(e,i);
                case Pe.CYLINDER:
                    return new Te(e,i)
                }
            }
        }
          , Se = function() {
            function e(t) {
                o()(this, e),
                this.viewer = t,
                this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK),
                this.initEvents()
            }
            return r()(e, [{
                key: "activate",
                value: function(e) {
                    this.deactivate(),
                    this.clear(),
                    this.plotType = e,
                    this.positions = [],
                    this.plotDrawTip = new p(this.viewer),
                    this.MousePoint = new d(this.viewer),
                    this.registerEvents(),
                    this.viewer.enableCursorStyle = !1,
                    this.viewer._element.style.cursor = "default",
                    this.initTip()
                }
            }, {
                key: "initTip",
                value: function() {
                    switch (this.plotType) {
                    case Pe.POLYHEDRON:
                        this.plotDrawTip.setContent(["当前绘制类型：多边体，至少需要3个点", "按下鼠标左键确定第1个点", "按下鼠标右键取消绘制"]);
                        break;
                    case Pe.HEMISPHERE:
                        this.plotDrawTip.setContent(["当前绘制类型：半球体，需要1个点", "按下鼠标左键确定位置", "按下鼠标右键取消绘制"]);
                        break;
                    case Pe.CYLINDER:
                        this.plotDrawTip.setContent(["当前绘制类型：圆柱体，需要1个点", "按下鼠标左键确定位置", "按下鼠标右键取消绘制"])
                    }
                }
            }, {
                key: "deactivate",
                value: function() {
                    this.unRegisterEvents(),
                    this.plotType = void 0,
                    this.viewer._element.style.cursor = "pointer",
                    this.viewer.enableCursorStyle = !0,
                    this.plotDrawTip && (this.plotDrawTip.remove(),
                    this.MousePoint.remove(),
                    this.plotDrawTip = void 0,
                    this.MousePoint = void 0)
                }
            }, {
                key: "clear",
                value: function() {
                    this.plot && (this.plot.remove(),
                    this.plot = void 0)
                }
            }, {
                key: "generatePlot",
                value: function(e) {
                    var t = Object(u.f)()
                      , i = this.generateGeoFeature(t, e);
                    this.plot = Le.createPlot(this.viewer, this.plotType, i),
                    this.plot.openEditMode(!0)
                }
            }, {
                key: "generateGeoFeature",
                value: function(e, t) {
                    var i = void 0
                      , n = void 0;
                    switch (this.plotType) {
                    case Pe.HEMISPHERE:
                    case Pe.CYLINDER:
                        i = "Point",
                        n = this.getPointCoordinates(t);
                        break;
                    case Pe.POLYLINE:
                    case Pe.CIRCLE:
                        i = "LineString",
                        n = this.getLineStringCoordinates(t);
                        break;
                    case Pe.POLYHEDRON:
                        i = "Polygon",
                        n = this.getPolygonCoordinates(t)
                    }
                    return {
                        type: "Feature",
                        properties: {
                            plotCode: e,
                            style: void 0
                        },
                        geometry: {
                            type: i,
                            coordinates: n
                        }
                    }
                }
            }, {
                key: "getPointCoordinates",
                value: function(e) {
                    var t = Cesium.Cartographic.fromCartesian(e[0]);
                    return [Cesium.Math.toDegrees(t.longitude), Cesium.Math.toDegrees(t.latitude), t.height]
                }
            }, {
                key: "getLineStringCoordinates",
                value: function(e) {
                    var t = [];
                    return e.forEach(function(e) {
                        var i = Cesium.Cartographic.fromCartesian(e)
                          , n = [Cesium.Math.toDegrees(i.longitude), Cesium.Math.toDegrees(i.latitude), i.height];
                        t.push(n)
                    }),
                    t
                }
            }, {
                key: "getPolygonCoordinates",
                value: function(e) {
                    var t = [[]];
                    return e.forEach(function(e) {
                        var i = Cesium.Cartographic.fromCartesian(e)
                          , n = [Cesium.Math.toDegrees(i.longitude), Cesium.Math.toDegrees(i.latitude), i.height];
                        t[0].push(n)
                    }),
                    t
                }
            }, {
                key: "initEvents",
                value: function() {
                    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas),
                    this.PlotDrawStartEvent = new Cesium.Event,
                    this.PlotDrawEndEvent = new Cesium.Event
                }
            }, {
                key: "registerEvents",
                value: function() {
                    this.leftClickEvent(),
                    this.rightClickEvent(),
                    this.mouseMoveEvent()
                }
            }, {
                key: "leftClickEvent",
                value: function() {
                    var e = this;
                    this.handler.setInputAction(function(t) {
                        e.viewer._element.style.cursor = "default";
                        var i = e.viewer.scene.pickPosition(t.position);
                        i && (e.positions.push(i),
                        1 == e.positions.length ? e.generatePlot(e.positions) : e.plot.setPositions(e.positions),
                        e.setTipContent(),
                        e.plot.fixPositionCount == e.positions.length && (e.drawEnd(),
                        e.deactivate()))
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                }
            }, {
                key: "setTipContent",
                value: function() {
                    switch (this.plotType) {
                    case Pe.POLYHEDRON:
                        this.plotDrawTip.setContent(["当前绘制类型：多边体，最少需要3个点。", "已有" + this.positions.length + "个点，按下鼠标左键确定第" + (this.positions.length + 1) + "个点", this.positions.length < 3 ? "按下鼠标右键取消绘制" : "按下鼠标右键结束绘制"])
                    }
                }
            }, {
                key: "mouseMoveEvent",
                value: function() {
                    var e = this;
                    this.handler.setInputAction(function(t) {
                        e.viewer._element.style.cursor = "default";
                        var i = e.viewer.scene.pickPosition(t.endPosition);
                        if (i && (e.plotDrawTip.updatePosition(i),
                        e.MousePoint.updatePosition(i),
                        e.plot)) {
                            var n = e.positions.concat([i]);
                            e.plot.setPositions(n)
                        }
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "rightClickEvent",
                value: function() {
                    var e = this;
                    this.handler.setInputAction(function(t) {
                        0 != e.positions.length ? e.plot.fixPositionCount ? e.positions.length == e.plot.fixPositionCount ? (e.plot.setPositions(e.positions),
                        e.drawEnd(),
                        e.deactivate()) : (e.deactivate(),
                        e.clear()) : e.positions.length >= e.plot.minPositionCount ? (e.plot.setPositions(e.positions),
                        e.drawEnd(),
                        e.deactivate()) : (e.deactivate(),
                        e.clear()) : e.deactivate()
                    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
                }
            }, {
                key: "unRegisterEvents",
                value: function() {
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE),
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
                }
            }, {
                key: "drawEnd",
                value: function() {
                    this.plot.openEditMode(!1),
                    this.PlotDrawEndEvent.raiseEvent(this.plot, this.plotType)
                }
            }]),
            e
        }()
          , Me = function() {
            function e(t, i) {
                o()(this, e),
                this.viewer = t,
                this.plotLayer = i,
                this.registerMouseEvents()
            }
            return r()(e, [{
                key: "registerMouseEvents",
                value: function() {
                    this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas),
                    this.initLeftDownEventHandler(),
                    this.initMouseMoveEventHandler(),
                    this.initLeftUpEventHandler()
                }
            }, {
                key: "unRegisterMouseEvents",
                value: function() {
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "destroy",
                value: function() {
                    this.unRegisterMouseEvents(),
                    this.viewer = void 0,
                    this.plotLayer = void 0,
                    this.eventHandler = void 0
                }
            }, {
                key: "initLeftDownEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        if (e.plotLayer.selectedPlot) {
                            var i = e.viewer.scene.pick(t.position);
                            i && i.id && "HedronPlot" === i.id.plotType && e.plotLayer.selectedPlot.properties.plotCode == i.id.plotCode && (["hemisphere", "cylinder"].indexOf(e.plotLayer.selectedPlot.properties.plotType) < 0 || (e.viewer.enableCursorStyle = !1,
                            document.body.style.cursor = "move",
                            e.moveing = !0,
                            e.mousePoint = new d(e.viewer),
                            e.plotLayer.selectedPlot.openEditMode(!0),
                            e.plotLayer.selectedPlot.setVisible(!1),
                            e.viewer.scene.screenSpaceCameraController.enableRotate = !1))
                        }
                    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
                }
            }, {
                key: "initLeftUpEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        e.plotLayer.selectedPlot && ["hemisphere", "cylinder"].indexOf(e.plotLayer.selectedPlot.properties.plotType) > -1 && (e.plotLayer.selectedPlot.setVisible(!0),
                        e.plotLayer.selectedPlot.openEditMode(!1)),
                        e.moveing && (e.viewer.enableCursorStyle = !0,
                        document.body.style.cursor = "default",
                        e.moveing = !1,
                        e.viewer.scene.screenSpaceCameraController.enableRotate = !0,
                        e.mousePoint.remove(),
                        e.mousePoint = void 0)
                    }, Cesium.ScreenSpaceEventType.LEFT_UP)
                }
            }, {
                key: "initMouseMoveEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        if (e.moveing) {
                            var i = e.viewer.scene.pickPosition(t.endPosition);
                            i || (i = e.viewer.scene.camera.pickEllipsoid(t.position, e.viewer.scene.globe.ellipsoid)),
                            i && (e.mousePoint.updatePosition(i),
                            e.plotLayer.selectedPlot.setPositions([i]))
                        }
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }]),
            e
        }()
          , Ae = function() {
            function e(t, i) {
                o()(this, e),
                this.viewer = t,
                this.plotLayer = i,
                this.initEventHandler()
            }
            return r()(e, [{
                key: "initEventHandler",
                value: function() {
                    this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
                }
            }, {
                key: "activate",
                value: function() {
                    this.deactivate(),
                    this.initLeftClickEventHandler()
                }
            }, {
                key: "deactivate",
                value: function() {
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
                    this.unRegisterEvents(),
                    this.clear()
                }
            }, {
                key: "clear",
                value: function() {
                    this.clearEditVertex()
                }
            }, {
                key: "initLeftClickEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pick(t.position);
                        i && i.id && "HedronPlot" == i.id.plotType ? e.plotLayer.selectedPlot && (["polyhedron"].indexOf(e.plotLayer.selectedPlot.properties.plotType) < 0 ? e.handleEditPlot() : e.editPlot && e.editPlot.plotCode == i.id.plotCode || (e.handleEditPlot(),
                        e.handlePickPlot(i.id))) : e.handleEditPlot()
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                }
            }, {
                key: "handleEditPlot",
                value: function() {
                    this.clear(),
                    this.editPlot && (this.editPlot.openEditMode(!1),
                    this.editPlot = void 0,
                    this.isEdited && (this.isEdited = !1,
                    this.isEditing = !1))
                }
            }, {
                key: "handlePickPlot",
                value: function(e) {
                    this.editPlot = this.plotLayer.getByPlotCode(e.plotCode),
                    this.editPlot && (this.isEditing = !1,
                    this.isEdited = !1,
                    this.editPlot.openEditMode(!0),
                    this.editPositions = this.editPlot.getPositions(),
                    this.clear(),
                    this.createEditVertex(),
                    this.registerEvents())
                }
            }, {
                key: "registerEvents",
                value: function() {
                    this.initLeftDownEventHandler(),
                    this.initMouseMoveEventHandler(),
                    this.initLeftUpEventHandler()
                }
            }, {
                key: "unRegisterEvents",
                value: function() {
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "initLeftDownEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pick(t.position);
                        i && i.id && i.id.type && "PlotEditVertex" == i.id.type && (e.isEditing = !0,
                        e.viewer.scene.screenSpaceCameraController.enableRotate = !1,
                        e.viewer.enableCursorStyle = !1,
                        e.viewer._element.style.cursor = "",
                        document.body.style.cursor = "move",
                        e.editVertext = i.id,
                        e.editVertext.show = !1)
                    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
                }
            }, {
                key: "initLeftUpEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        e.isEditing && (e.viewer.enableCursorStyle = !0,
                        document.body.style.cursor = "default",
                        e.viewer.scene.screenSpaceCameraController.enableRotate = !0,
                        e.editVertext.show = !0,
                        e.isEditing = !1)
                    }, Cesium.ScreenSpaceEventType.LEFT_UP)
                }
            }, {
                key: "initMouseMoveEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pickPosition(t.endPosition);
                        i && e.isEditing && (e.editPositions[e.editVertext.vertexIndex] = i,
                        e.editPlot.setPositions(e.editPositions),
                        e.isEdited = !0)
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "createEditVertex",
                value: function() {
                    var e = this;
                    this.vertexEntities = [],
                    this.editPlot.getPositions().forEach(function(t, i) {
                        var n = e.viewer.entities.add({
                            position: new Cesium.CallbackProperty(function(t) {
                                return e.editPositions[i]
                            }
                            ,!1),
                            type: "PlotEditVertex",
                            vertexIndex: i,
                            point: {
                                color: Cesium.Color.DARKBLUE.withAlpha(.4),
                                pixelSize: 10,
                                outlineColor: Cesium.Color.YELLOW.withAlpha(.4),
                                outlineWidth: 3,
                                disableDepthTestDistance: 2e4
                            }
                        });
                        e.vertexEntities.push(n)
                    })
                }
            }, {
                key: "clearEditVertex",
                value: function() {
                    var e = this;
                    this.vertexEntities && this.vertexEntities.forEach(function(t) {
                        e.viewer.entities.remove(t)
                    }),
                    this.vertexEntities = []
                }
            }]),
            e
        }()
          , xe = function e(t, i) {
            o()(this, e),
            this.pointEdit = new Me(t,i),
            this.polygonEdit = new Ae(t,i),
            this.polygonEdit.activate()
        }
          , be = function(e) {
            function t(e) {
                o()(this, t);
                var i = P()(this, (t.__proto__ || E()(t)).call(this, e));
                return i.selectedPlotChanged = new Cesium.Event,
                i.initEvent(),
                i.targetEnterHedronEvent = new Cesium.Event,
                i.targetLeaveHedronEvent = new Cesium.Event,
                i.enterPlotCodes = {},
                i
            }
            return g()(t, e),
            r()(t, [{
                key: "addPlot",
                value: function(e) {
                    var t = Le.createPlot(this.viewer, e.properties.plotType, e);
                    return this.plots.push(t),
                    t
                }
            }, {
                key: "initEvent",
                value: function() {
                    var e = this;
                    new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas).setInputAction(function(t) {
                        if (e.plotSelecteable) {
                            var i = e.viewer.scene.pick(t.position);
                            if (i && i.id) {
                                if (i.id && i.id.type && "HedronPlot" == i.id.type || e.selectedPlot && (e.selectedPlot.setSelected(!1),
                                e.selectedPlot = void 0,
                                e.selectedPlotChanged.raiseEvent(void 0)),
                                !e.selectedPlot || e.selectedPlot.properties.plotCode != i.id.plotCode) {
                                    var n = e.getByPlotCode(i.id.plotCode);
                                    n ? (e.selectedPlot = n,
                                    e.selectedPlot.setSelected(!0),
                                    e.selectedPlotChanged.raiseEvent(n)) : (e.selectedPlot && (e.selectedPlot.setSelected(!1),
                                    e.selectedPlot = void 0),
                                    e.selectedPlotChanged.raiseEvent(void 0))
                                }
                            } else
                                e.selectedPlot && (e.selectedPlot.setSelected(!1),
                                e.selectedPlot = void 0,
                                e.selectedPlotChanged.raiseEvent(void 0))
                        }
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                }
            }, {
                key: "updateTargetPosition",
                value: function(e) {
                    var t = this;
                    this.plots.forEach(function(i) {
                        if (i.checkTargetIsIntersect(e)) {
                            if (t.enterPlotCodes[i.properties.plotCode])
                                return;
                            t.enterPlotCodes[i.properties.plotCode] = !0,
                            i.setSelected(!0),
                            t.targetEnterHedronEvent.raiseEvent(i)
                        } else {
                            if (!t.enterPlotCodes[i.properties.plotCode])
                                return;
                            t.enterPlotCodes[i.properties.plotCode] = !1,
                            i.setSelected(!1),
                            t.targetLeaveHedronEvent.raiseEvent(i)
                        }
                    })
                }
            }]),
            t
        }(w.a)
          , De = {
            POLYGON: "polygon",
            WALL: "wall"
        }
          , Ie = function() {
            function e(t, i) {
                o()(this, e),
                this.viewer = t,
                this.properties = i.properties,
                this.properties.plotBase = "TextMapPlot",
                this.geometry = i.geometry,
                this.coordinates = i.geometry.coordinates,
                this.generatePositions()
            }
            return r()(e, [{
                key: "generatePositions",
                value: function() {
                    var e = this;
                    this.positions = [];
                    var t = void 0;
                    switch (this.geometry.type) {
                    case "LineString":
                        t = this.coordinates;
                        break;
                    case "Polygon":
                        t = this.coordinates[0]
                    }
                    t.forEach(function(t) {
                        e.positions.push(Cesium.Cartesian3.fromDegrees(t[0], t[1], t[2]))
                    })
                }
            }, {
                key: "setPositions",
                value: function(e) {
                    switch (this.positions = e || [],
                    this.coordinates = [],
                    this.geometry.type) {
                    case "LineString":
                        this.setLineStringCoordinates();
                        break;
                    case "Polygon":
                        this.setPolygonCoordinates()
                    }
                    this.updatePositionAction && this.updatePositionAction()
                }
            }, {
                key: "setLineStringCoordinates",
                value: function() {
                    var e = this;
                    this.positions.forEach(function(t) {
                        var i = Cesium.Cartographic.fromCartesian(t)
                          , n = [Cesium.Math.toDegrees(i.longitude), Cesium.Math.toDegrees(i.latitude), i.height];
                        e.coordinates.push(n)
                    })
                }
            }, {
                key: "setPolygonCoordinates",
                value: function() {
                    var e = this;
                    this.coordinates.push([]),
                    this.positions.forEach(function(t) {
                        var i = Cesium.Cartographic.fromCartesian(t)
                          , n = [Cesium.Math.toDegrees(i.longitude), Cesium.Math.toDegrees(i.latitude), i.height];
                        e.coordinates[0].push(n)
                    })
                }
            }, {
                key: "getPositions",
                value: function() {
                    var e = []
                      , t = void 0;
                    switch (this.geometry.type) {
                    case "LineString":
                        t = this.coordinates;
                        break;
                    case "Polygon":
                        t = this.coordinates[0]
                    }
                    return t.forEach(function(t) {
                        e.push(Cesium.Cartesian3.fromDegrees(t[0], t[1], t[2]))
                    }),
                    e
                }
            }, {
                key: "getPositionCount",
                value: function() {
                    return this.positions.length
                }
            }, {
                key: "setSelected",
                value: function(e) {}
            }, {
                key: "openEditMode",
                value: function(e) {}
            }, {
                key: "remove",
                value: function() {}
            }]),
            e
        }();
        function _e(e) {
            var t = e.text
              , i = document.createElement("canvas")
              , n = (t + "").length * e.fontSize;
            i.width = n,
            i.height = e.fontSize;
            var o = i.getContext("2d");
            return o.fillStyle = e.color,
            o.font = "bold " + e.fontSize + "px 微软雅黑",
            o.textBaseline = "hanging",
            o.fillText(t, 0, 0),
            i
        }
        var He = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotName = "多边形文字贴图",
                n.properties.plotType = De.POLYGON,
                n.minPositionCount = 3,
                n.style = n.properties.style || n.getDefaultStyle(),
                n.properties.style = n.style,
                n.createEntity(),
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "createEntity",
                value: function() {
                    this.polygonEntity = this.viewer.entities.add({
                        plotType: this.properties.plotBase,
                        plotCode: this.properties.plotCode,
                        polygon: {
                            hierarchy: this.getPositions(),
                            material: new Cesium.ImageMaterialProperty({
                                image: _e(this.style),
                                transparent: !0,
                                color: Cesium.Color.WHITE
                            }),
                            stRotation: Cesium.Math.toRadians(this.style.stRotation),
                            classificationType: Cesium.ClassificationType.BOTH
                        }
                    })
                }
            }, {
                key: "getStyle",
                value: function() {
                    return this.style
                }
            }, {
                key: "updateStyle",
                value: function() {
                    var e = this;
                    this.polygonEntity.polygon.material.image = _e(this.style),
                    this.polygonEntity.polygon.stRotation = new Cesium.CallbackProperty(function(t) {
                        return Cesium.Math.toRadians(e.style.stRotation)
                    }
                    ,!1)
                }
            }, {
                key: "openEditMode",
                value: function(e) {
                    var t = this;
                    this.polygonEntity.polygon.hierarchy = e ? new Cesium.CallbackProperty(function(e) {
                        return new Cesium.PolygonHierarchy(t.getPositions())
                    }
                    ,!1) : this.getPositions()
                }
            }, {
                key: "setSelected",
                value: function(e) {
                    var t = this;
                    this.polygonEntity.polyline = e ? {
                        positions: new Cesium.CallbackProperty(function(e) {
                            return t.getPositions()
                        }
                        ,!1),
                        width: 1,
                        material: Cesium.Color.AQUA,
                        depthFailMaterial: Cesium.Color.AQUA
                    } : {
                        positions: [],
                        width: 0,
                        material: Cesium.Color.AQUA,
                        depthFailMaterial: Cesium.Color.AQUA
                    }
                }
            }, {
                key: "getDefaultStyle",
                value: function() {
                    return {
                        text: "多边形文字贴图",
                        fontSize: 84,
                        color: "#FFFF00",
                        stRotation: 0
                    }
                }
            }, {
                key: "toGeoJson",
                value: function() {
                    return {
                        type: "Feature",
                        properties: this.properties,
                        geometry: {
                            type: "Polygon",
                            coordinates: this.coordinates
                        }
                    }
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.entities.remove(this.polygonEntity)
                }
            }]),
            t
        }(Ie)
          , Oe = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotName = "立体墙文字贴图",
                n.properties.plotType = De.WALL,
                n.fixPositionCount = 2,
                n.style = n.properties.style || n.getDefaultStyle(),
                n.properties.style = n.style,
                n.createEntity(),
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "createEntity",
                value: function() {
                    this.initHeights(),
                    this.initWall()
                }
            }, {
                key: "getStyle",
                value: function() {
                    return this.style
                }
            }, {
                key: "updateStyle",
                value: function() {
                    this.initHeights(),
                    this.wallEntity.wall.material.image = _e(this.style)
                }
            }, {
                key: "updatePositionAction",
                value: function() {
                    this.initHeights()
                }
            }, {
                key: "initHeights",
                value: function() {
                    this.style.baseHeight = Object(u.i)(this.positions, this.style.baseHeight),
                    this.style.baseHeight < 0 && (this.style.baseHeight = 0);
                    for (var e = new Array(this.positions.length).fill(this.style.baseHeight), t = [], i = 0; i < e.length; i++)
                        t.push(e[i] + this.style.wallHeight);
                    this.minimumHeights = e,
                    this.maximumHeights = t
                }
            }, {
                key: "initWall",
                value: function() {
                    var e = this;
                    this.wallEntity = this.viewer.entities.add({
                        plotType: this.properties.plotBase,
                        plotCode: this.properties.plotCode,
                        wall: {
                            positions: new Cesium.CallbackProperty(function(t) {
                                return e.positions
                            }
                            ,!1),
                            minimumHeights: new Cesium.CallbackProperty(function(t) {
                                return e.minimumHeights
                            }
                            ,!1),
                            maximumHeights: new Cesium.CallbackProperty(function(t) {
                                return e.maximumHeights
                            }
                            ,!1),
                            material: new Cesium.ImageMaterialProperty({
                                image: _e(this.style),
                                transparent: !0,
                                color: Cesium.Color.WHITE
                            }),
                            outline: !1,
                            outlineWidth: 10,
                            outlineColor: Cesium.Color.AQUA
                        }
                    })
                }
            }, {
                key: "setSelected",
                value: function(e) {
                    this.wallEntity.wall.outline = e
                }
            }, {
                key: "getDefaultStyle",
                value: function() {
                    return {
                        wallHeight: 10,
                        color: "#FFFF00",
                        fontSize: 84,
                        text: "立体墙文字贴图"
                    }
                }
            }, {
                key: "toGeoJson",
                value: function() {
                    return {
                        type: "Feature",
                        properties: this.properties,
                        geometry: {
                            type: "LineString",
                            coordinates: this.coordinates
                        }
                    }
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.entities.remove(this.wallEntity)
                }
            }]),
            t
        }(Ie)
          , Re = {
            createPlot: function(e, t, i) {
                switch (t) {
                case De.POLYGON:
                    return new He(e,i);
                case De.WALL:
                    return new Oe(e,i)
                }
            }
        }
          , Fe = function() {
            function e(t) {
                o()(this, e),
                this.viewer = t,
                this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK),
                this.initEvents()
            }
            return r()(e, [{
                key: "activate",
                value: function(e) {
                    this.deactivate(),
                    this.clear(),
                    this.plotType = e,
                    this.positions = [],
                    this.plotDrawTip = new p(this.viewer),
                    this.MousePoint = new d(this.viewer),
                    this.registerEvents(),
                    this.viewer.enableCursorStyle = !1,
                    this.viewer._element.style.cursor = "default",
                    this.initTip()
                }
            }, {
                key: "initTip",
                value: function() {
                    switch (this.plotType) {
                    case De.WALL:
                        this.plotDrawTip.setContent(["当前绘制类型：立体墙文字贴图，需要2个点", "按下鼠标左键确定第1个点", "按下鼠标右键取消绘制"]);
                        break;
                    case De.POLYGON:
                        this.plotDrawTip.setContent(["当前绘制类型：贴地多边形文字贴图，至少需要3个点", "按下鼠标左键确定第1个点", "按下鼠标右键取消绘制"])
                    }
                }
            }, {
                key: "deactivate",
                value: function() {
                    this.unRegisterEvents(),
                    this.plotType = void 0,
                    this.viewer._element.style.cursor = "pointer",
                    this.viewer.enableCursorStyle = !0,
                    this.plotDrawTip && (this.plotDrawTip.remove(),
                    this.MousePoint.remove(),
                    this.plotDrawTip = void 0,
                    this.MousePoint = void 0)
                }
            }, {
                key: "clear",
                value: function() {
                    this.plot && (this.plot.remove(),
                    this.plot = void 0)
                }
            }, {
                key: "generatePlot",
                value: function(e) {
                    var t = Object(u.f)()
                      , i = this.generateGeoFeature(t, e);
                    this.plot = Re.createPlot(this.viewer, this.plotType, i),
                    this.plot.openEditMode(!0)
                }
            }, {
                key: "generateGeoFeature",
                value: function(e, t) {
                    var i = void 0
                      , n = void 0;
                    switch (this.plotType) {
                    case De.WALL:
                        i = "LineString",
                        n = this.getLineStringCoordinates(t);
                        break;
                    case De.POLYGON:
                        i = "Polygon",
                        n = this.getPolygonCoordinates(t)
                    }
                    return {
                        type: "Feature",
                        properties: {
                            plotCode: e,
                            style: void 0
                        },
                        geometry: {
                            type: i,
                            coordinates: n
                        }
                    }
                }
            }, {
                key: "getLineStringCoordinates",
                value: function(e) {
                    var t = [];
                    return e.forEach(function(e) {
                        var i = Cesium.Cartographic.fromCartesian(e)
                          , n = [Cesium.Math.toDegrees(i.longitude), Cesium.Math.toDegrees(i.latitude), i.height];
                        t.push(n)
                    }),
                    t
                }
            }, {
                key: "getPolygonCoordinates",
                value: function(e) {
                    var t = [[]];
                    return e.forEach(function(e) {
                        var i = Cesium.Cartographic.fromCartesian(e)
                          , n = [Cesium.Math.toDegrees(i.longitude), Cesium.Math.toDegrees(i.latitude), i.height];
                        t[0].push(n)
                    }),
                    t
                }
            }, {
                key: "initEvents",
                value: function() {
                    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas),
                    this.PlotDrawStartEvent = new Cesium.Event,
                    this.PlotDrawEndEvent = new Cesium.Event
                }
            }, {
                key: "registerEvents",
                value: function() {
                    this.leftClickEvent(),
                    this.rightClickEvent(),
                    this.mouseMoveEvent()
                }
            }, {
                key: "leftClickEvent",
                value: function() {
                    var e = this;
                    this.handler.setInputAction(function(t) {
                        e.viewer._element.style.cursor = "default";
                        var i = e.viewer.scene.pickPosition(t.position);
                        i && (e.positions.push(i),
                        1 == e.positions.length ? e.generatePlot(e.positions) : e.plot.setPositions(e.positions),
                        e.setTipContent(),
                        e.plot.fixPositionCount == e.positions.length && (e.drawEnd(),
                        e.deactivate()))
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                }
            }, {
                key: "setTipContent",
                value: function() {
                    switch (this.plotType) {
                    case De.WALL:
                        this.plotDrawTip.setContent(["当前绘制类型：立体墙文字贴图，需要2个点。", "已有" + this.positions.length + "个点，按下鼠标左键确定第" + (this.positions.length + 1) + "个点", this.positions.length < 2 ? "按下鼠标右键取消绘制" : "按下鼠标右键结束绘制"]);
                        break;
                    case De.POLYGON:
                        this.plotDrawTip.setContent(["当前绘制类型：贴地多边形文字贴图，最少需要3个点。", "已有" + this.positions.length + "个点，按下鼠标左键确定第" + (this.positions.length + 1) + "个点", this.positions.length < 3 ? "按下鼠标右键取消绘制" : "按下鼠标右键结束绘制"])
                    }
                }
            }, {
                key: "mouseMoveEvent",
                value: function() {
                    var e = this;
                    this.handler.setInputAction(function(t) {
                        e.viewer._element.style.cursor = "default";
                        var i = e.viewer.scene.pickPosition(t.endPosition);
                        if (i && (e.plotDrawTip.updatePosition(i),
                        e.MousePoint.updatePosition(i),
                        e.plot)) {
                            var n = e.positions.concat([i]);
                            e.plot.setPositions(n)
                        }
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "rightClickEvent",
                value: function() {
                    var e = this;
                    this.handler.setInputAction(function(t) {
                        0 != e.positions.length ? e.plot.fixPositionCount ? e.positions.length == e.plot.fixPositionCount ? (e.plot.setPositions(e.positions),
                        e.drawEnd(),
                        e.deactivate()) : (e.deactivate(),
                        e.clear()) : e.positions.length >= e.plot.minPositionCount ? (e.plot.setPositions(e.positions),
                        e.drawEnd(),
                        e.deactivate()) : (e.deactivate(),
                        e.clear()) : e.deactivate()
                    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
                }
            }, {
                key: "unRegisterEvents",
                value: function() {
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE),
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
                }
            }, {
                key: "drawEnd",
                value: function() {
                    this.plot.openEditMode(!1),
                    this.PlotDrawEndEvent.raiseEvent(this.plot, this.plotType)
                }
            }]),
            e
        }()
          , We = function() {
            function e(t, i) {
                o()(this, e),
                this.viewer = t,
                this.textMapPlotLayer = i,
                this.initEventHandler()
            }
            return r()(e, [{
                key: "initEventHandler",
                value: function() {
                    this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
                }
            }, {
                key: "activate",
                value: function() {
                    this.deactivate(),
                    this.initLeftClickEventHandler()
                }
            }, {
                key: "deactivate",
                value: function() {
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
                    this.unRegisterEvents(),
                    this.clear()
                }
            }, {
                key: "clear",
                value: function() {
                    this.editTextMapPlot && this.editTextMapPlot.openEditMode(!0),
                    this.clearEditVertex(),
                    this.clearMidVertex()
                }
            }, {
                key: "initLeftClickEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pick(t.position);
                        i ? i.id && "TextMapPlot" == i.id.plotType ? e.editTextMapPlot && e.editTextMapPlot.plotCode == i.id.plotCode || (e.handleEditTextMapPlot(),
                        e.handlePickTextMapPlot(i.id)) : e.clear() : e.handleEditTextMapPlot()
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                }
            }, {
                key: "handleEditTextMapPlot",
                value: function() {
                    this.clear(),
                    this.editTextMapPlot = void 0,
                    this.isEdited && (this.isEdited = !1,
                    this.isEditing = !1)
                }
            }, {
                key: "handlePickTextMapPlot",
                value: function(e) {
                    this.editTextMapPlot = this.textMapPlotLayer.getByPlotCode(e.plotCode),
                    this.editTextMapPlot && (this.isEditing = !1,
                    this.isEdited = !1,
                    this.editTextMapPlot.openEditMode(!0),
                    this.editPositions = this.editTextMapPlot.getPositions(),
                    this.EditMoveCenterPositoin = this.getTextMapPlotCenterPosition(),
                    this.clear(),
                    this.createEditVertex(),
                    this.createMidVertex(),
                    this.registerEvents())
                }
            }, {
                key: "registerEvents",
                value: function() {
                    this.initLeftDownEventHandler(),
                    this.initMouseMoveEventHandler(),
                    this.initLeftUpEventHandler()
                }
            }, {
                key: "unRegisterEvents",
                value: function() {
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "initLeftDownEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pick(t.position);
                        i && i.id && i.id.type && ("TextMapPlotEditVertex" == i.id.type || "TextMapPlotEditMove" == i.id.type ? (e.isEditing = !0,
                        e.viewer.scene.screenSpaceCameraController.enableRotate = !1,
                        e.viewer.enableCursorStyle = !1,
                        e.viewer._element.style.cursor = "",
                        document.body.style.cursor = "move",
                        e.editVertext = i.id,
                        e.editVertext.show = !1,
                        e.clearMidVertex()) : "TextMapPlotEditMidVertex" == i.id.type && (e.editPositions.splice(i.id.vertexIndex, 0, i.id.position._value),
                        e.editTextMapPlot.setPositions(e.editPositions),
                        e.clear(),
                        e.createEditVertex(),
                        e.createMidVertex(),
                        e.isEdited = !0))
                    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
                }
            }, {
                key: "initLeftUpEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        e.isEditing && (e.viewer.enableCursorStyle = !0,
                        document.body.style.cursor = "default",
                        e.viewer.scene.screenSpaceCameraController.enableRotate = !0,
                        e.editVertext.show = !0,
                        e.isEditing = !1,
                        e.clearMidVertex(),
                        e.createMidVertex(),
                        "FencePlot" == e.editTextMapPlot.PlotType && e.editTextMapPlot.initHeights())
                    }, Cesium.ScreenSpaceEventType.LEFT_UP)
                }
            }, {
                key: "initMouseMoveEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pickPosition(t.endPosition);
                        if (i && e.isEditing) {
                            if ("TextMapPlotEditMove" == e.editVertext.type) {
                                var n = e.EditMoveCenterPositoin;
                                if (!n)
                                    return;
                                e.moveEntityByOffset(n, i)
                            } else
                                e.editPositions[e.editVertext.vertexIndex] = i,
                                e.editTextMapPlot.setPositions(e.editPositions);
                            e.isEdited = !0,
                            e.EditMoveCenterPositoin = e.getTextMapPlotCenterPosition()
                        }
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "getTextMapPlotCenterPosition",
                value: function() {
                    var e = []
                      , t = 0;
                    this.editPositions.forEach(function(i) {
                        var n = Object(u.c)(i);
                        e.push([n.x, n.y]),
                        t < n.z && (t = n.z)
                    });
                    var i = turf.lineString(e)
                      , n = turf.bbox(i)
                      , o = turf.bboxPolygon(n)
                      , s = turf.center(o).geometry.coordinates;
                    return Cesium.Cartesian3.fromDegrees(s[0], s[1], t)
                }
            }, {
                key: "moveEntityByOffset",
                value: function(e, t) {
                    for (var i = Object(u.c)(e), n = Object(u.c)(t), o = n.x - i.x, s = n.y - i.y, r = n.z - i.z, a = this.editTextMapPlot.properties.plotType, l = void 0, h = 0; h < this.editPositions.length; h++)
                        (l = Object(u.c)(this.editPositions[h])).x += o,
                        l.y += s,
                        a != De.CIRCLE && a != De.RECTANGLE || (l.z += r),
                        this.editPositions[h] = Cesium.Cartesian3.fromDegrees(l.x, l.y, l.z);
                    this.editTextMapPlot.setPositions(this.editPositions)
                }
            }, {
                key: "createEditVertex",
                value: function() {
                    var e = this;
                    this.vertexEntities = [],
                    this.editTextMapPlot.getPositions().forEach(function(t, i) {
                        var n = e.viewer.entities.add({
                            position: new Cesium.CallbackProperty(function(t) {
                                return e.editPositions[i]
                            }
                            ,!1),
                            type: "TextMapPlotEditVertex",
                            vertexIndex: i,
                            point: {
                                color: Cesium.Color.DARKBLUE.withAlpha(.4),
                                pixelSize: 10,
                                outlineColor: Cesium.Color.YELLOW.withAlpha(.4),
                                outlineWidth: 3,
                                disableDepthTestDistance: 2e3
                            }
                        });
                        e.vertexEntities.push(n)
                    }),
                    1 != this.editPositions.length && this.createEditMoveCenterEntity()
                }
            }, {
                key: "createEditMoveCenterEntity",
                value: function() {
                    var e = this;
                    this.EditMoveCenterEntity = this.viewer.entities.add({
                        position: new Cesium.CallbackProperty(function(t) {
                            return e.EditMoveCenterPositoin
                        }
                        ,!1),
                        type: "TextMapPlotEditMove",
                        point: {
                            color: Cesium.Color.RED.withAlpha(.4),
                            pixelSize: 10,
                            outlineColor: Cesium.Color.WHITE.withAlpha(.3),
                            outlineWidth: 3,
                            disableDepthTestDistance: 2e3
                        }
                    })
                }
            }, {
                key: "clearEditVertex",
                value: function() {
                    var e = this;
                    this.vertexEntities && this.vertexEntities.forEach(function(t) {
                        e.viewer.entities.remove(t)
                    }),
                    this.vertexEntities = [],
                    this.viewer.entities.remove(this.EditMoveCenterEntity)
                }
            }, {
                key: "createMidVertex",
                value: function() {
                    if (this.editTextMapPlot.properties.plotType != De.WALL) {
                        this.midVertexEntities = [];
                        for (var e = 0; e < this.editPositions.length; e++) {
                            var t = this.editPositions[e]
                              , i = this.editPositions[e + 1]
                              , n = Object(u.h)(t, i)
                              , o = this.viewer.entities.add({
                                position: n,
                                type: "TextMapPlotEditMidVertex",
                                vertexIndex: e + 1,
                                point: {
                                    color: Cesium.Color.LIMEGREEN.withAlpha(.4),
                                    pixelSize: 10,
                                    outlineColor: Cesium.Color.YELLOW.withAlpha(.4),
                                    outlineWidth: 3,
                                    disableDepthTestDistance: 2e3
                                }
                            });
                            this.midVertexEntities.push(o)
                        }
                    }
                }
            }, {
                key: "clearMidVertex",
                value: function() {
                    var e = this;
                    this.midVertexEntities && this.midVertexEntities.forEach(function(t) {
                        e.viewer.entities.remove(t)
                    }),
                    this.midVertexEntities = []
                }
            }]),
            e
        }()
          , Ne = function(e) {
            function t(e) {
                o()(this, t);
                var i = P()(this, (t.__proto__ || E()(t)).call(this, e));
                return i.initEvent(),
                i.selectedPlotChanged = new Cesium.Event,
                i
            }
            return g()(t, e),
            r()(t, [{
                key: "addPlot",
                value: function(e) {
                    var t = Re.createPlot(this.viewer, e.properties.plotType, e);
                    return this.plots.push(t),
                    t
                }
            }, {
                key: "flyToByPlotCode",
                value: function(e) {
                    var t = this.getByPlotCode(e);
                    if (t) {
                        switch (t.properties.plotType) {
                        case De.WALL:
                            this.viewer.flyTo(t.wallEntity);
                            break;
                        case De.POLYGON:
                            this.viewer.flyTo(t.polygonEntity)
                        }
                        this.setSelectedPlotByCode(e)
                    }
                }
            }, {
                key: "initEvent",
                value: function() {
                    var e = this;
                    new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas).setInputAction(function(t) {
                        if (e.plotSelecteable) {
                            var i = e.viewer.scene.pick(t.position);
                            if (i && i.id) {
                                if (i.id && i.id.type && "TextMapPlot" == i.id.type || e.selectedPlot && (e.selectedPlot.setSelected(!1),
                                e.selectedPlot = void 0,
                                e.selectedPlotChanged.raiseEvent(void 0)),
                                !e.selectedPlot || e.selectedPlot.properties.plotCode != i.id.plotCode) {
                                    var n = e.getByPlotCode(i.id.plotCode);
                                    n ? (e.clearSelectedPlot(),
                                    e.selectedPlot = n,
                                    e.selectedPlot.setSelected(!0),
                                    e.selectedPlotChanged.raiseEvent(n)) : (e.selectedPlot && (e.selectedPlot.setSelected(!1),
                                    e.selectedPlot = void 0),
                                    e.selectedPlotChanged.raiseEvent(void 0))
                                }
                            } else
                                e.selectedPlot && (e.selectedPlot.setSelected(!1),
                                e.selectedPlot = void 0,
                                e.selectedPlotChanged.raiseEvent(void 0))
                        }
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                }
            }, {
                key: "setSelectedPlotByCode",
                value: function(e) {
                    this.clearSelectedPlot();
                    var t = this.getByPlotCode(e);
                    t && (this.selectedPlot = t,
                    this.selectedPlot.setSelected(!0),
                    this.selectedPlotChanged.raiseEvent(t))
                }
            }, {
                key: "clearSelectedPlot",
                value: function() {
                    this.selectedPlot && (this.selectedPlot.setSelected(!1),
                    this.selectedPlot = void 0)
                }
            }]),
            t
        }(w.a)
          , Ve = {
            MARKER: "marker",
            TEXT: "text",
            POLYLINE: "polyline",
            POLYGON: "polygon",
            CIRCLE: "circle",
            RECTANGLE: "rectangle",
            DYNAMICFENCE: "dynamicfence",
            NORMALFENCE: "normalfence",
            CORRIDOR: "corridor",
            POLYLINEVOLUME: "polylinevolume"
        }
          , Ge = function() {
            function e(t, i) {
                o()(this, e),
                this.viewer = t,
                this.properties = i.properties,
                this.properties.plotBase = "GeoPlot",
                this.geometry = i.geometry,
                this.coordinates = i.geometry.coordinates,
                this.style = this.properties.style,
                this.generatePositions()
            }
            return r()(e, [{
                key: "generatePositions",
                value: function() {
                    var e = this;
                    this.positions = [];
                    var t = void 0;
                    switch (this.geometry.type) {
                    case "Point":
                        t = [this.coordinates];
                        break;
                    case "LineString":
                        t = this.coordinates;
                        break;
                    case "Polygon":
                        t = this.coordinates[0]
                    }
                    t.forEach(function(t) {
                        e.positions.push(Cesium.Cartesian3.fromDegrees(t[0], t[1], t[2]))
                    })
                }
            }, {
                key: "setPositions",
                value: function(e) {
                    switch (this.positions = e || [],
                    this.coordinates = [],
                    this.geometry.type) {
                    case "Point":
                        this.setPointCoordinates();
                        break;
                    case "LineString":
                        this.setLineStringCoordinates();
                        break;
                    case "Polygon":
                        this.setPolygonCoordinates()
                    }
                    this.updatePositionAction && this.updatePositionAction()
                }
            }, {
                key: "setPointCoordinates",
                value: function() {
                    var e = Cesium.Cartographic.fromCartesian(this.positions[0]);
                    this.coordinates = [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude), e.height]
                }
            }, {
                key: "setLineStringCoordinates",
                value: function() {
                    var e = this;
                    this.positions.forEach(function(t) {
                        var i = Cesium.Cartographic.fromCartesian(t)
                          , n = [Cesium.Math.toDegrees(i.longitude), Cesium.Math.toDegrees(i.latitude), i.height];
                        e.coordinates.push(n)
                    })
                }
            }, {
                key: "setPolygonCoordinates",
                value: function() {
                    var e = this;
                    this.coordinates.push([]),
                    this.positions.forEach(function(t) {
                        var i = Cesium.Cartographic.fromCartesian(t)
                          , n = [Cesium.Math.toDegrees(i.longitude), Cesium.Math.toDegrees(i.latitude), i.height];
                        e.coordinates[0].push(n)
                    })
                }
            }, {
                key: "getPositions",
                value: function() {
                    return this.positions.slice(0)
                }
            }, {
                key: "getPositionCount",
                value: function() {
                    return this.positions.length
                }
            }, {
                key: "setSelected",
                value: function(e) {}
            }, {
                key: "openEditMode",
                value: function(e) {}
            }, {
                key: "remove",
                value: function() {}
            }]),
            e
        }()
          , Be = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = Ve.MARKER,
                n.properties.plotName = "图标点",
                n.style = n.properties.style || n.getDefaultStyle(),
                n.createEntity(),
                n.fixPositionCount = 1,
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "createEntity",
                value: function() {
                    this.markerEntity = this.viewer.entities.add({
                        position: this.positions[0],
                        plotType: "GeoPlot",
                        plotCode: this.properties.plotCode,
                        billboard: {
                            image: this.style.img,
                            scaleByDistance: new Cesium.NearFarScalar(1300,.4,12e3,.1),
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0,1e4),
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            disableDepthTestDistance: 500
                        },
                        point: {
                            color: Cesium.Color.DARKBLUE.withAlpha(.4),
                            pixelSize: 0,
                            outlineColor: Cesium.Color.YELLOW.withAlpha(.4),
                            outlineWidth: 0,
                            scaleByDistance: new Cesium.NearFarScalar(1e3,1,4200,.4),
                            disableDepthTestDistance: 500
                        }
                    })
                }
            }, {
                key: "setSelected",
                value: function(e) {}
            }, {
                key: "getDefaultStyle",
                value: function() {
                    return {
                        img: "../../static/images/poi/sp.png"
                    }
                }
            }, {
                key: "openEditMode",
                value: function(e) {
                    var t = this;
                    this.markerEntity.position = e ? new Cesium.CallbackProperty(function(e) {
                        return t.positions[0]
                    }
                    ,!1) : this.positions[0]
                }
            }, {
                key: "toGeoJson",
                value: function() {
                    return {
                        type: "Feature",
                        properties: this.properties,
                        geometry: {
                            type: "Point",
                            coordinates: this.coordinates
                        }
                    }
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.entities.remove(this.markerEntity)
                }
            }]),
            t
        }(Ge)
          , Ue = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotType = Ve.TEXT,
                n.properties.plotName = "文本",
                n.properties.attr = n.properties.attr || {
                    text: "文本"
                },
                n.style = n.properties.style || n.getDefaultStyle(),
                n.createEntity(),
                n.fixPositionCount = 1,
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "createEntity",
                value: function() {
                    this.textEntity = this.viewer.entities.add({
                        position: this.positions[0],
                        plotType: "GeoPlot",
                        plotCode: this.properties.plotCode,
                        label: {
                            text: this.properties.attr.text,
                            fillColor: Cesium.Color.fromCssColorString(this.style.fillColor),
                            scale: .5,
                            font: "normal 40px MicroSoft YaHei",
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0,5e3),
                            scaleByDistance: new Cesium.NearFarScalar(500,1,1500,.4),
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            pixelOffset: new Cesium.Cartesian2(0,-10),
                            outlineWidth: 9,
                            disableDepthTestDistance: 500,
                            outlineColor: Cesium.Color.fromCssColorString(this.style.outlineColor)
                        },
                        point: {
                            color: Cesium.Color.DARKBLUE.withAlpha(.4),
                            pixelSize: 0,
                            outlineColor: Cesium.Color.YELLOW.withAlpha(.4),
                            outlineWidth: 0,
                            scaleByDistance: new Cesium.NearFarScalar(1e3,1,4200,.4),
                            disableDepthTestDistance: 500
                        }
                    })
                }
            }, {
                key: "setSelected",
                value: function(e) {}
            }, {
                key: "updateText",
                value: function() {
                    this.textEntity.label.text = this.properties.attr.text
                }
            }, {
                key: "getDefaultStyle",
                value: function() {
                    return {
                        fillColor: "#FFFF00",
                        outlineColor: "#FF0000"
                    }
                }
            }, {
                key: "openEditMode",
                value: function(e) {
                    var t = this;
                    this.textEntity.position = e ? new Cesium.CallbackProperty(function(e) {
                        return t.positions[0]
                    }
                    ,!1) : this.positions[0]
                }
            }, {
                key: "toGeoJson",
                value: function() {
                    return {
                        type: "Feature",
                        properties: this.properties,
                        geometry: {
                            type: "Point",
                            coordinates: this.coordinates
                        }
                    }
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.entities.remove(this.textEntity)
                }
            }]),
            t
        }(Ge)
          , Ye = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotName = "线",
                n.properties.plotType = Ve.POLYLINE,
                n.minPositionCount = 2,
                n.createEntity(),
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "createEntity",
                value: function() {
                    this.polylineEntity = this.viewer.entities.add({
                        plotType: "GeoPlot",
                        plotCode: this.properties.plotCode,
                        polyline: {
                            positions: this.positions,
                            width: 2,
                            material: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.RED
                            }),
                            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                                color: Cesium.Color.RED
                            })
                        }
                    })
                }
            }, {
                key: "openEditMode",
                value: function(e) {
                    var t = this;
                    this.polylineEntity.polyline.positions = e ? new Cesium.CallbackProperty(function(e) {
                        return t.positions
                    }
                    ,!1) : this.positions
                }
            }, {
                key: "setSelected",
                value: function(e) {
                    e ? (this.polylineEntity.polyline.material = new Cesium.PolylineDashMaterialProperty({
                        color: Cesium.Color.YELLOW
                    }),
                    this.polylineEntity.polyline.depthFailMaterial = new Cesium.PolylineDashMaterialProperty({
                        color: Cesium.Color.YELLOW
                    })) : (this.polylineEntity.polyline.material = Cesium.Color.RED.withAlpha(.5),
                    this.polylineEntity.polyline.depthFailMaterial = Cesium.Color.RED.withAlpha(.5))
                }
            }, {
                key: "toGeoJson",
                value: function() {
                    return {
                        type: "Feature",
                        properties: this.properties,
                        geometry: {
                            type: "LineString",
                            coordinates: this.coordinates
                        }
                    }
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.entities.remove(this.polylineEntity)
                }
            }]),
            t
        }(Ge)
          , Ke = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotName = "面",
                n.properties.plotType = Ve.POLYGON,
                n.minPositionCount = 3,
                n.createEntity(),
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "createEntity",
                value: function() {
                    this.polygonEntity = this.viewer.entities.add({
                        plotType: "GeoPlot",
                        plotCode: this.properties.plotCode,
                        polygon: {
                            hierarchy: this.positions,
                            material: Cesium.Color.RED.withAlpha(.5),
                            perPositionHeight: !0
                        }
                    })
                }
            }, {
                key: "openEditMode",
                value: function(e) {
                    var t = this;
                    e ? (this.polygonEntity.polygon = {
                        hierarchy: new Cesium.CallbackProperty(function(e) {
                            return new Cesium.PolygonHierarchy(t.positions)
                        }
                        ,!1),
                        material: Cesium.Color.RED.withAlpha(.5),
                        perPositionHeight: !0
                    },
                    this.polygonEntity.polyline = {
                        positions: new Cesium.CallbackProperty(function(e) {
                            return t.positions.concat(t.positions[0])
                        }
                        ,!1),
                        width: 1,
                        material: new Cesium.PolylineDashMaterialProperty({
                            color: Cesium.Color.YELLOW
                        }),
                        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                            color: Cesium.Color.YELLOW
                        })
                    }) : (this.polygonEntity.polygon.hierarchy = this.positions,
                    this.polygonEntity.polyline = {
                        positions: new Cesium.CallbackProperty(function(e) {
                            return t.positions.concat(t.positions[0])
                        }
                        ,!1),
                        width: 0
                    })
                }
            }, {
                key: "setSelected",
                value: function(e) {
                    var t = this;
                    this.polygonEntity.polyline = e ? {
                        positions: new Cesium.CallbackProperty(function(e) {
                            return t.positions.concat(t.positions[0])
                        }
                        ,!1),
                        width: 1,
                        material: new Cesium.PolylineDashMaterialProperty({
                            color: Cesium.Color.YELLOW
                        }),
                        depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                            color: Cesium.Color.YELLOW
                        })
                    } : {
                        positions: new Cesium.CallbackProperty(function(e) {
                            return t.positions.concat(t.positions[0])
                        }
                        ,!1),
                        width: 0
                    }
                }
            }, {
                key: "toGeoJson",
                value: function() {
                    return {
                        type: "Feature",
                        properties: this.properties,
                        geometry: {
                            type: "Polygon",
                            coordinates: this.coordinates
                        }
                    }
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.entities.remove(this.polygonEntity)
                }
            }]),
            t
        }(Ge)
          , je = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotName = "正圆",
                n.properties.plotType = Ve.CIRCLE,
                n.fixPositionCount = 2,
                n.createEntity(),
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "updatePositionAction",
                value: function() {
                    Object(u.i)(this.positions)
                }
            }, {
                key: "createEntity",
                value: function() {
                    this.circleEntity = this.viewer.entities.add({
                        plotType: "GeoPlot",
                        plotCode: this.properties.plotCode,
                        position: this.positions[0],
                        ellipse: {
                            height: this.getHeight(),
                            semiMinorAxis: this.getAxis(),
                            semiMajorAxis: this.getAxis(),
                            material: Cesium.Color.RED.withAlpha(.6)
                        }
                    })
                }
            }, {
                key: "getHeight",
                value: function() {
                    return Object(u.g)(this.positions[0])
                }
            }, {
                key: "getAxis",
                value: function() {
                    var e = this.positions[0]
                      , t = this.positions[0];
                    return this.positions.length > 1 && (t = this.positions[1]),
                    Object(u.e)(e, t)
                }
            }, {
                key: "openEditMode",
                value: function(e) {
                    var t = this;
                    e ? (this.circleEntity.position = new Cesium.CallbackProperty(function(e) {
                        return t.positions[0]
                    }
                    ,!1),
                    this.circleEntity.ellipse.semiMinorAxis = new Cesium.CallbackProperty(function(e) {
                        return t.getAxis()
                    }
                    ,!1),
                    this.circleEntity.ellipse.semiMajorAxis = new Cesium.CallbackProperty(function(e) {
                        return t.getAxis()
                    }
                    ,!1),
                    this.circleEntity.ellipse.height = new Cesium.CallbackProperty(function(e) {
                        return t.getHeight()
                    }
                    ,!1)) : (this.circleEntity.position = this.positions[0],
                    this.circleEntity.ellipse.height = this.getHeight(),
                    this.circleEntity.ellipse.semiMajorAxis = this.getAxis())
                }
            }, {
                key: "toGeoJson",
                value: function() {
                    return {
                        type: "Feature",
                        properties: this.properties,
                        geometry: {
                            type: "LineString",
                            coordinates: this.coordinates
                        }
                    }
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.entities.remove(this.circleEntity)
                }
            }]),
            t
        }(Ge)
          , ze = function(e) {
            function t(e, i) {
                o()(this, t);
                var n = P()(this, (t.__proto__ || E()(t)).call(this, e, i));
                return n.properties.plotName = "矩形",
                n.properties.plotType = Ve.RECTANGLE,
                n.fixPositionCount = 2,
                n.createEntity(),
                n
            }
            return g()(t, e),
            r()(t, [{
                key: "updatePositionAction",
                value: function() {
                    Object(u.i)(this.positions)
                }
            }, {
                key: "createEntity",
                value: function() {
                    this.polygonEntity = this.viewer.entities.add({
                        plotType: "GeoPlot",
                        plotCode: this.properties.plotCode,
                        polygon: {
                            hierarchy: this.getRectanglePositions(),
                            material: Cesium.Color.RED.withAlpha(.6),
                            perPositionHeight: !0
                        }
                    })
                }
            }, {
                key: "getRectanglePositions",
                value: function() {
                    var e = this.positions[0]
                      , t = this.positions[0];
                    this.positions.length > 1 && (t = this.positions[1]);
                    var i = Cesium.Cartographic.fromCartesian(e)
                      , n = Cesium.Cartographic.fromCartesian(t);
                    i.height < 0 && (i.height = 0),
                    n.height < 0 && (n.height = 0);
                    var o = this.getRectanglePointsByTwoPoint(i, n)
                      , s = [o[0][0], o[0][1], i.height, o[1][0], o[1][1], i.height, o[2][0], o[2][1], i.height, o[3][0], o[3][1], i.height, o[0][0], o[0][1], i.height];
                    return new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(s))
                }
            }, {
                key: "getRectanglePointsByTwoPoint",
                value: function(e, t) {
                    var i = [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude)]
                      , n = [Cesium.Math.toDegrees(t.longitude), Cesium.Math.toDegrees(t.latitude)];
                    return [i, [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(t.latitude)], n, [Cesium.Math.toDegrees(t.longitude), Cesium.Math.toDegrees(e.latitude)]]
                }
            }, {
                key: "openEditMode",
                value: function(e) {
                    var t = this;
                    this.polygonEntity.polygon.hierarchy = e ? new Cesium.CallbackProperty(function(e) {
                        return t.getRectanglePositions()
                    }
                    ,!1) : this.getRectanglePositions()
                }
            }, {
                key: "toGeoJson",
                value: function() {
                    return {
                        type: "Feature",
                        properties: this.properties,
                        geometry: {
                            type: "LineString",
                            coordinates: this.coordinates
                        }
                    }
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.entities.remove(this.polygonEntity)
                }
            }]),
            t
        }(Ge)
          , $e = {
            createPlot: function(e, t, i) {
                switch (t) {
                case Ve.POLYGON:
                    return new Ke(e,i);
                case Ve.MARKER:
                    return new Be(e,i);
                case Ve.TEXT:
                    return new Ue(e,i);
                case Ve.POLYLINE:
                    return new Ye(e,i);
                case Ve.CIRCLE:
                    return new je(e,i);
                case Ve.RECTANGLE:
                    return new ze(e,i)
                }
            }
        }
          , Qe = function() {
            function e(t) {
                o()(this, e),
                this.viewer = t,
                this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK),
                this.initEvents()
            }
            return r()(e, [{
                key: "activate",
                value: function(e) {
                    this.deactivate(),
                    this.clear(),
                    this.plotType = e,
                    this.positions = [],
                    this.plotDrawTip = new p(this.viewer),
                    this.MousePoint = new d(this.viewer),
                    this.registerEvents(),
                    this.viewer.enableCursorStyle = !1,
                    this.viewer._element.style.cursor = "default",
                    this.initTip()
                }
            }, {
                key: "initTip",
                value: function() {
                    switch (this.plotType) {
                    case Ve.MARKER:
                        this.plotDrawTip.setContent(["当前绘制类型：点，需要1个点", "按下鼠标左键确定位置", "按下鼠标右键取消绘制"]);
                        break;
                    case Ve.TEXT:
                        this.plotDrawTip.setContent(["当前绘制类型：文本，需要1个点", "按下鼠标左键确定位置", "按下鼠标右键取消绘制"]);
                        break;
                    case Ve.POLYLINE:
                        this.plotDrawTip.setContent(["当前绘制类型：线，最少需要2个点", "按下鼠标左键确定第1个点", "按下鼠标右键取消绘制"]);
                        break;
                    case Ve.POLYGON:
                        this.plotDrawTip.setContent(["当前绘制类型：面，最少需要3个点", "按下鼠标左键确定第1个点", "按下鼠标右键取消绘制"]);
                        break;
                    case Ve.CIRCLE:
                        this.plotDrawTip.setContent(["当前绘制类型：圆，需要2个点", "按下鼠标左键确定第1个点", "按下鼠标右键取消绘制"]);
                        break;
                    case Ve.RECTANGLE:
                        this.plotDrawTip.setContent(["当前绘制类型：矩形，需要2个点", "按下鼠标左键确定第1个点", "按下鼠标右键取消绘制"]);
                        break;
                    case Ve.DYNAMICFENCE:
                        this.plotDrawTip.setContent(["当前绘制类型：动态围栏，最少需要2个点", "按下鼠标左键确定第1个点", "按下鼠标右键取消绘制"]);
                        break;
                    case Ve.NORMALFENCE:
                        this.plotDrawTip.setContent(["当前绘制类型：静态围栏，最少需要2个点", "按下鼠标左键确定第1个点", "按下鼠标右键取消绘制"]);
                        break;
                    case Ve.POLYLINEVOLUME:
                        this.plotDrawTip.setContent(["当前绘制类型：普通墙体，最少需要2个点", "按下鼠标左键确定第1个点", "按下鼠标右键取消绘制"])
                    }
                }
            }, {
                key: "deactivate",
                value: function() {
                    this.unRegisterEvents(),
                    this.plotType = void 0,
                    this.viewer._element.style.cursor = "pointer",
                    this.viewer.enableCursorStyle = !0,
                    this.plotDrawTip && (this.plotDrawTip.remove(),
                    this.MousePoint.remove(),
                    this.plotDrawTip = void 0,
                    this.MousePoint = void 0)
                }
            }, {
                key: "clear",
                value: function() {
                    this.plot && (this.plot.remove(),
                    this.plot = void 0)
                }
            }, {
                key: "generatePlot",
                value: function(e) {
                    var t = Object(u.f)()
                      , i = this.generateGeoFeature(t, e);
                    this.plot = $e.createPlot(this.viewer, this.plotType, i),
                    this.plot.openEditMode(!0)
                }
            }, {
                key: "generateGeoFeature",
                value: function(e, t) {
                    var i = void 0
                      , n = void 0;
                    switch (this.plotType) {
                    case Ve.MARKER:
                    case Ve.TEXT:
                        i = "Point",
                        n = this.getPointCoordinates(t);
                        break;
                    case Ve.POLYLINE:
                    case Ve.CIRCLE:
                    case Ve.RECTANGLE:
                    case Ve.DYNAMICFENCE:
                    case Ve.NORMALFENCE:
                    case Ve.POLYLINEVOLUME:
                        i = "LineString",
                        n = this.getLineStringCoordinates(t);
                        break;
                    case Ve.POLYGON:
                        i = "Polygon",
                        n = this.getPolygonCoordinates(t)
                    }
                    return {
                        type: "Feature",
                        properties: {
                            plotCode: e,
                            style: void 0
                        },
                        geometry: {
                            type: i,
                            coordinates: n
                        }
                    }
                }
            }, {
                key: "getPointCoordinates",
                value: function(e) {
                    var t = Cesium.Cartographic.fromCartesian(e[0]);
                    return [Cesium.Math.toDegrees(t.longitude), Cesium.Math.toDegrees(t.latitude), t.height]
                }
            }, {
                key: "getLineStringCoordinates",
                value: function(e) {
                    var t = [];
                    return e.forEach(function(e) {
                        var i = Cesium.Cartographic.fromCartesian(e)
                          , n = [Cesium.Math.toDegrees(i.longitude), Cesium.Math.toDegrees(i.latitude), i.height];
                        t.push(n)
                    }),
                    t
                }
            }, {
                key: "getPolygonCoordinates",
                value: function(e) {
                    var t = [[]];
                    return e.forEach(function(e) {
                        var i = Cesium.Cartographic.fromCartesian(e)
                          , n = [Cesium.Math.toDegrees(i.longitude), Cesium.Math.toDegrees(i.latitude), i.height];
                        t[0].push(n)
                    }),
                    t
                }
            }, {
                key: "initEvents",
                value: function() {
                    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas),
                    this.PlotDrawStartEvent = new Cesium.Event,
                    this.PlotDrawEndEvent = new Cesium.Event
                }
            }, {
                key: "registerEvents",
                value: function() {
                    this.leftClickEvent(),
                    this.rightClickEvent(),
                    this.mouseMoveEvent()
                }
            }, {
                key: "leftClickEvent",
                value: function() {
                    var e = this;
                    this.handler.setInputAction(function(t) {
                        e.viewer._element.style.cursor = "default";
                        var i = e.viewer.scene.pickPosition(t.position);
                        i && (e.positions.push(i),
                        1 == e.positions.length ? e.generatePlot(e.positions) : e.plot.setPositions(e.positions),
                        e.setTipContent(),
                        e.plot.fixPositionCount == e.positions.length && (e.drawEnd(),
                        e.deactivate()))
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                }
            }, {
                key: "setTipContent",
                value: function() {
                    switch (this.plotType) {
                    case Ve.POLYLINE:
                        this.plotDrawTip.setContent(["当前绘制类型：线，最少需要2个点。", "已有" + this.positions.length + "个点，按下鼠标左键确定第" + (this.positions.length + 1) + "个点", this.positions.length < 2 ? "按下鼠标右键取消绘制" : "按下鼠标右键结束绘制"]);
                        break;
                    case Ve.POLYGON:
                        this.plotDrawTip.setContent(["当前绘制类型：面，最少需要3个点。", "已有" + this.positions.length + "个点，按下鼠标左键确定第" + (this.positions.length + 1) + "个点", this.positions.length < 3 ? "按下鼠标右键取消绘制" : "按下鼠标右键结束绘制"]);
                        break;
                    case Ve.CIRCLE:
                        this.plotDrawTip.setContent(["当前绘制类型：圆，需要2个点。", "已有" + this.positions.length + "个点，按下鼠标左键确定第" + (this.positions.length + 1) + "个点", "按下鼠标右键取消绘制"]);
                        break;
                    case Ve.RECTANGLE:
                        this.plotDrawTip.setContent(["当前绘制类型：矩形，需要2个点。", "已有" + this.positions.length + "个点，按下鼠标左键确定第" + (this.positions.length + 1) + "个点", "按下鼠标右键取消绘制"]);
                        break;
                    case Ve.DYNAMICFENCE:
                        this.plotDrawTip.setContent(["当前绘制类型：动态围栏，最少需要2个点。", "已有" + this.positions.length + "个点，按下鼠标左键确定第" + (this.positions.length + 1) + "个点", this.positions.length < 2 ? "按下鼠标右键取消绘制" : "按下鼠标右键结束绘制"]);
                        break;
                    case Ve.FENCENORMAL:
                        this.plotDrawTip.setContent(["当前绘制类型：普通围栏，最少需要2个点。", "已有" + this.positions.length + "个点，按下鼠标左键确定第" + (this.positions.length + 1) + "个点", this.positions.length < 2 ? "按下鼠标右键取消绘制" : "按下鼠标右键结束绘制"]);
                        break;
                    case Ve.POLYLINEVOLUME:
                        this.plotDrawTip.setContent(["当前绘制类型：普通墙体，最少需要2个点。", "已有" + this.positions.length + "个点，按下鼠标左键确定第" + (this.positions.length + 1) + "个点", this.positions.length < 2 ? "按下鼠标右键取消绘制" : "按下鼠标右键结束绘制"])
                    }
                }
            }, {
                key: "mouseMoveEvent",
                value: function() {
                    var e = this;
                    this.handler.setInputAction(function(t) {
                        e.viewer._element.style.cursor = "default";
                        var i = e.viewer.scene.pickPosition(t.endPosition);
                        if (i && (e.plotDrawTip.updatePosition(i),
                        e.MousePoint.updatePosition(i),
                        e.plot)) {
                            var n = e.positions.concat([i]);
                            e.plot.setPositions(n)
                        }
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "rightClickEvent",
                value: function() {
                    var e = this;
                    this.handler.setInputAction(function(t) {
                        0 != e.positions.length ? e.plot.fixPositionCount ? e.positions.length == e.plot.fixPositionCount ? (e.plot.setPositions(e.positions),
                        e.drawEnd(),
                        e.deactivate()) : (e.deactivate(),
                        e.clear()) : e.positions.length >= e.plot.minPositionCount ? (e.plot.setPositions(e.positions),
                        e.drawEnd(),
                        e.deactivate()) : (e.deactivate(),
                        e.clear()) : e.deactivate()
                    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
                }
            }, {
                key: "unRegisterEvents",
                value: function() {
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE),
                    this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
                }
            }, {
                key: "drawEnd",
                value: function() {
                    this.plot.openEditMode(!1),
                    this.PlotDrawEndEvent.raiseEvent(this.plot, this.plotType)
                }
            }]),
            e
        }()
          , Je = function() {
            function e(t, i) {
                o()(this, e),
                this.viewer = t,
                this.geoPlotLayer = i,
                this.initEventHandler()
            }
            return r()(e, [{
                key: "initEventHandler",
                value: function() {
                    this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
                }
            }, {
                key: "activate",
                value: function() {
                    this.deactivate(),
                    this.initLeftClickEventHandler()
                }
            }, {
                key: "deactivate",
                value: function() {
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
                    this.unRegisterEvents(),
                    this.clear()
                }
            }, {
                key: "clear",
                value: function() {
                    this.editGeoPlot && this.editGeoPlot.openEditMode(!0),
                    this.clearEditVertex(),
                    this.clearMidVertex()
                }
            }, {
                key: "initLeftClickEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pick(t.position);
                        i ? i.id && "GeoPlot" == i.id.plotType ? e.editGeoPlot && e.editGeoPlot.plotCode == i.id.plotCode || (e.handleEditGeoPlot(),
                        e.handlePickGeoPlot(i.id)) : e.clear() : e.handleEditGeoPlot()
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                }
            }, {
                key: "handleEditGeoPlot",
                value: function() {
                    this.clear();
                    this.editGeoPlot;
                    this.editGeoPlot = void 0,
                    this.isEdited && (this.isEdited = !1,
                    this.isEditing = !1)
                }
            }, {
                key: "handlePickGeoPlot",
                value: function(e) {
                    this.editGeoPlot = this.geoPlotLayer.getByPlotCode(e.plotCode),
                    this.editGeoPlot && (this.isEditing = !1,
                    this.isEdited = !1,
                    this.editGeoPlot.openEditMode(!0),
                    this.editPositions = this.editGeoPlot.getPositions(),
                    this.EditMoveCenterPositoin = this.getGeoPlotCenterPosition(),
                    this.clear(),
                    this.createEditVertex(),
                    this.createMidVertex(),
                    this.registerEvents())
                }
            }, {
                key: "registerEvents",
                value: function() {
                    this.initLeftDownEventHandler(),
                    this.initMouseMoveEventHandler(),
                    this.initLeftUpEventHandler()
                }
            }, {
                key: "unRegisterEvents",
                value: function() {
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP),
                    this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "initLeftDownEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pick(t.position);
                        i && i.id && i.id.type && ("GeoPlotEditVertex" == i.id.type || "GeoPlotEditMove" == i.id.type ? (e.isEditing = !0,
                        e.viewer.scene.screenSpaceCameraController.enableRotate = !1,
                        e.viewer.enableCursorStyle = !1,
                        e.viewer._element.style.cursor = "",
                        document.body.style.cursor = "move",
                        e.editVertext = i.id,
                        e.editVertext.show = !1,
                        e.clearMidVertex()) : "GeoPlotEditMidVertex" == i.id.type && (e.editPositions.splice(i.id.vertexIndex, 0, i.id.position._value),
                        e.editGeoPlot.setPositions(e.editPositions),
                        e.clear(),
                        e.createEditVertex(),
                        e.createMidVertex(),
                        e.isEdited = !0))
                    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
                }
            }, {
                key: "initLeftUpEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        e.isEditing && (e.viewer.enableCursorStyle = !0,
                        document.body.style.cursor = "default",
                        e.viewer.scene.screenSpaceCameraController.enableRotate = !0,
                        e.editVertext.show = !0,
                        e.isEditing = !1,
                        e.clearMidVertex(),
                        e.createMidVertex(),
                        "FencePlot" == e.editGeoPlot.PlotType && e.editGeoPlot.initHeights())
                    }, Cesium.ScreenSpaceEventType.LEFT_UP)
                }
            }, {
                key: "initMouseMoveEventHandler",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pickPosition(t.endPosition);
                        if (i && e.isEditing) {
                            if ("GeoPlotEditMove" == e.editVertext.type) {
                                var n = e.EditMoveCenterPositoin;
                                if (!n)
                                    return;
                                e.moveEntityByOffset(n, i)
                            } else
                                e.editPositions[e.editVertext.vertexIndex] = i,
                                e.editGeoPlot.setPositions(e.editPositions);
                            e.isEdited = !0,
                            e.EditMoveCenterPositoin = e.getGeoPlotCenterPosition()
                        }
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "getGeoPlotCenterPosition",
                value: function() {
                    var e = []
                      , t = 0;
                    switch (this.editGeoPlot.properties.plotType) {
                    case Ve.CIRCLE:
                    case Ve.MARKER:
                    case Ve.TEXT:
                        return this.editPositions[0]
                    }
                    this.editPositions.forEach(function(i) {
                        var n = Object(u.c)(i);
                        e.push([n.x, n.y]),
                        t < n.z && (t = n.z)
                    });
                    var i = turf.lineString(e)
                      , n = turf.bbox(i)
                      , o = turf.bboxPolygon(n)
                      , s = turf.center(o).geometry.coordinates;
                    return Cesium.Cartesian3.fromDegrees(s[0], s[1], t)
                }
            }, {
                key: "moveEntityByOffset",
                value: function(e, t) {
                    for (var i = Object(u.c)(e), n = Object(u.c)(t), o = n.x - i.x, s = n.y - i.y, r = n.z - i.z, a = this.editGeoPlot.properties.plotType, l = void 0, h = 0; h < this.editPositions.length; h++)
                        (l = Object(u.c)(this.editPositions[h])).x += o,
                        l.y += s,
                        a != Ve.CIRCLE && a != Ve.RECTANGLE || (l.z += r),
                        this.editPositions[h] = Cesium.Cartesian3.fromDegrees(l.x, l.y, l.z);
                    this.editGeoPlot.setPositions(this.editPositions)
                }
            }, {
                key: "createEditVertex",
                value: function() {
                    var e = this;
                    this.vertexEntities = [];
                    var t = this.editGeoPlot.getPositions();
                    if (this.editGeoPlot.properties.plotType == Ve.CIRCLE)
                        return this.createCircleEditVertex(),
                        void this.createEditMoveCenterEntity();
                    t.forEach(function(t, i) {
                        var n = e.viewer.entities.add({
                            position: new Cesium.CallbackProperty(function(t) {
                                return e.editPositions[i]
                            }
                            ,!1),
                            type: "GeoPlotEditVertex",
                            vertexIndex: i,
                            point: {
                                color: Cesium.Color.DARKBLUE.withAlpha(.4),
                                pixelSize: 10,
                                outlineColor: Cesium.Color.YELLOW.withAlpha(.4),
                                outlineWidth: 3,
                                disableDepthTestDistance: 2e3
                            }
                        });
                        e.vertexEntities.push(n)
                    }),
                    1 != this.editPositions.length && this.createEditMoveCenterEntity()
                }
            }, {
                key: "createCircleEditVertex",
                value: function() {
                    var e = this
                      , t = this.viewer.entities.add({
                        position: new Cesium.CallbackProperty(function(t) {
                            return e.editPositions[1]
                        }
                        ,!1),
                        type: "GeoPlotEditVertex",
                        vertexIndex: 1,
                        point: {
                            color: Cesium.Color.DARKBLUE.withAlpha(.4),
                            pixelSize: 10,
                            outlineColor: Cesium.Color.YELLOW.withAlpha(.4),
                            outlineWidth: 3,
                            disableDepthTestDistance: 2e3
                        }
                    });
                    this.vertexEntities.push(t)
                }
            }, {
                key: "createEditMoveCenterEntity",
                value: function() {
                    var e = this;
                    this.EditMoveCenterEntity = this.viewer.entities.add({
                        position: new Cesium.CallbackProperty(function(t) {
                            return e.EditMoveCenterPositoin
                        }
                        ,!1),
                        type: "GeoPlotEditMove",
                        point: {
                            color: Cesium.Color.RED.withAlpha(.4),
                            pixelSize: 10,
                            outlineColor: Cesium.Color.WHITE.withAlpha(.3),
                            outlineWidth: 3,
                            disableDepthTestDistance: 2e3
                        }
                    })
                }
            }, {
                key: "clearEditVertex",
                value: function() {
                    var e = this;
                    this.vertexEntities && this.vertexEntities.forEach(function(t) {
                        e.viewer.entities.remove(t)
                    }),
                    this.vertexEntities = [],
                    this.viewer.entities.remove(this.EditMoveCenterEntity)
                }
            }, {
                key: "createMidVertex",
                value: function() {
                    var e = this.editGeoPlot.properties.plotType;
                    if (e != Ve.RECTANGLE && e != Ve.CIRCLE) {
                        this.midVertexEntities = [];
                        for (var t = 0; t < this.editPositions.length; t++) {
                            var i = this.editPositions[t]
                              , n = this.editPositions[t + 1]
                              , o = Object(u.h)(i, n)
                              , s = this.viewer.entities.add({
                                position: o,
                                type: "GeoPlotEditMidVertex",
                                vertexIndex: t + 1,
                                point: {
                                    color: Cesium.Color.LIMEGREEN.withAlpha(.4),
                                    pixelSize: 10,
                                    outlineColor: Cesium.Color.YELLOW.withAlpha(.4),
                                    outlineWidth: 3,
                                    disableDepthTestDistance: 2e3
                                }
                            });
                            this.midVertexEntities.push(s)
                        }
                    }
                }
            }, {
                key: "clearMidVertex",
                value: function() {
                    var e = this;
                    this.midVertexEntities && this.midVertexEntities.forEach(function(t) {
                        e.viewer.entities.remove(t)
                    }),
                    this.midVertexEntities = []
                }
            }]),
            e
        }()
          , qe = function(e) {
            function t(e) {
                o()(this, t);
                var i = P()(this, (t.__proto__ || E()(t)).call(this, e));
                return i.initEvent(),
                i.selectedPlotChanged = new Cesium.Event,
                i
            }
            return g()(t, e),
            r()(t, [{
                key: "addPlot",
                value: function(e) {
                    var t = $e.createPlot(this.viewer, e.properties.plotType, e);
                    return this.plots.push(t),
                    t
                }
            }, {
                key: "flyToByPlotCode",
                value: function(e) {
                    var t = this.getByPlotCode(e);
                    if (t) {
                        switch (t.properties.plotType) {
                        case Ve.MARKER:
                            this.viewer.flyTo(t.markerEntity);
                            break;
                        case Ve.NORMALFENCE:
                        case Ve.DYNAMICFENCE:
                            this.viewer.flyTo(t.fenceEntity)
                        }
                        this.setSelectedPlotByCode(e)
                    }
                }
            }, {
                key: "initEvent",
                value: function() {
                    var e = this;
                    new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas).setInputAction(function(t) {
                        if (e.plotSelecteable) {
                            var i = e.viewer.scene.pick(t.position);
                            if (i && i.id) {
                                if (i.id && i.id.type && "GeoPlot" == i.id.type || e.selectedPlot && (e.selectedPlot.setSelected(!1),
                                e.selectedPlot = void 0,
                                e.selectedPlotChanged.raiseEvent(void 0)),
                                !e.selectedPlot || e.selectedPlot.properties.plotCode != i.id.plotCode) {
                                    var n = e.getByPlotCode(i.id.plotCode);
                                    n ? (e.clearSelectedPlot(),
                                    e.selectedPlot = n,
                                    e.selectedPlot.setSelected(!0),
                                    e.selectedPlotChanged.raiseEvent(n)) : (e.selectedPlot && (e.selectedPlot.setSelected(!1),
                                    e.selectedPlot = void 0),
                                    e.selectedPlotChanged.raiseEvent(void 0))
                                }
                            } else
                                e.selectedPlot && (e.selectedPlot.setSelected(!1),
                                e.selectedPlot = void 0,
                                e.selectedPlotChanged.raiseEvent(void 0))
                        }
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                }
            }, {
                key: "setSelectedPlotByCode",
                value: function(e) {
                    this.clearSelectedPlot();
                    var t = this.getByPlotCode(e);
                    t && (this.selectedPlot = t,
                    this.selectedPlot.setSelected(!0),
                    this.selectedPlotChanged.raiseEvent(t))
                }
            }, {
                key: "clearSelectedPlot",
                value: function() {
                    this.selectedPlot && (this.selectedPlot.setSelected(!1),
                    this.selectedPlot = void 0)
                }
            }]),
            t
        }(w.a);
        xt3d.LabelPlotting = {
            EntityDraw: a,
            EntityEdit: l,
            LedText: c,
            ShulieText: h,
            HtmlPlot: {
                PlotEdit: pe,
                PlotLayer: fe
            },
            GltfPlot: {
                PlotDraw: v,
                PlotEdit: y,
                PlotLayer: T
            },
            HedronPlot: {
                PlotDraw: Se,
                PlotEdit: xe,
                PlotLayer: be
            },
            MilitaryPlot: {
                PlotDraw: he,
                PlotEdit: ce,
                PlotLayer: ue
            },
            TextMapPlot: {
                PlotDraw: Fe,
                PlotEdit: We,
                PlotLayer: Ne
            },
            GeoPlot: {
                PlotDraw: Qe,
                PlotEdit: Je,
                PlotLayer: qe
            },
            getPlotCode: u.f,
            cartesian3ToCoordinates: u.a
        };
        var Xe = {
            init: function(e) {
                this.initViewer(e),
                this.addRegion2(),
                this.addRegion3(),
                this.addPoint3(),
                this.setView()
            },
            initViewer: function(e) {
                this.viewer = new Cesium.Viewer(e,{
                    infoBox: !1,
                    selectionIndicator: !1,
                    navigation: !1,
                    animation: !1,
                    timeline: !1,
                    baseLayerPicker: !1,
                    geocoder: !1,
                    homeButton: !1,
                    sceneModePicker: !1,
                    navigationHelpButton: !1,
                    shouldAnimate: !0,
                    skyAtmosphere: !1,
                    imageryProvider: new Cesium.SingleTileImageryProvider({
                        url: "static/images/earth/earth_3.jpg"
                    })
                }),
                this.viewer.imageryLayers.removeAll(!0),
                this.viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString("#0E0A3D")
            },
            addRegion2: function() {
                var e = this;
                fetch("static/data/beijing/beijing_2.json").then(function(e) {
                    return e.json()
                }).then(function(t) {
                    t.features.map(function(t) {
                        var i = t.geometry.coordinates[0]
                          , n = e.coordinateToPositions(i, 15e3);
                        e.viewer.entities.add({
                            polygon: {
                                hierarchy: n,
                                perPositionHeight: !0,
                                material: Cesium.Color.fromCssColorString("#2B5678").withAlpha(.8)
                            },
                            wall: {
                                positions: n,
                                material: new Cesium.ImageMaterialProperty({
                                    image: "static/images/wall/wallgradients1.png",
                                    repeat: new Cesium.Cartesian2(0,1),
                                    color: Cesium.Color.fromCssColorString("#1987A8").withAlpha(.8)
                                })
                            }
                        })
                    })
                })
            },
            addRegion3: function() {
                var e = this;
                fetch("static/data/beijing/beijing_3.json").then(function(e) {
                    return e.json()
                }).then(function(t) {
                    t.features.map(function(t) {
                        var i = t.geometry.coordinates[0]
                          , n = e.coordinateToPositions(i, 15e3);
                        e.viewer.entities.add({
                            polyline: {
                                positions: n,
                                width: 1,
                                material: Cesium.Color.fromCssColorString("#ccc").withAlpha(.4)
                            }
                        });
                        var o = Cesium.Cartographic.fromCartesian(Cesium.BoundingSphere.fromPoints(n).center)
                          , s = Cesium.Math.toDegrees(o.longitude)
                          , r = Cesium.Math.toDegrees(o.latitude)
                          , a = Cesium.Cartesian3.fromDegrees(s, r, 15010);
                        e.viewer.entities.add({
                            position: a,
                            label: {
                                text: t.properties.name,
                                fillColor: Cesium.Color.WHITE,
                                scale: .5,
                                font: "normal 42px MicroSoft YaHei",
                                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0,7e6),
                                scaleByDistance: new Cesium.NearFarScalar(5e4,1,5e5,.5),
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                pixelOffset: new Cesium.Cartesian2(0,-15),
                                outlineWidth: 20,
                                outlineColor: Cesium.Color.BLACK
                            }
                        })
                    })
                })
            },
            addPoint3: function() {
                var e = this;
                fetch("static/data/beijing/beijing_3point.json").then(function(e) {
                    return e.json()
                }).then(function(t) {
                    t.features.map(function(t) {
                        var i = t.geometry.coordinates
                          , n = Cesium.Cartesian3.fromDegrees(i[0], i[1], 15010);
                        new xt3d.LabelPlotting.LedText(e.viewer,n,3e3 + Math.floor(100 * Math.random()))
                    })
                })
            },
            coordinateToPositions: function(e, t) {
                var i = [];
                return e.map(function(e) {
                    i.push(Cesium.Cartesian3.fromDegrees(e[0], e[1], t || 0))
                }),
                i
            },
            setView: function() {
                this.viewer.scene.camera.flyTo({
                    destination: {
                        x: -2285318.922205349,
                        y: 4561449.436806091,
                        z: 4046846.8682504706
                    },
                    orientation: {
                        heading: 6.174723072454894,
                        pitch: -.71825433447645,
                        roll: 10271026651409443e-22
                    },
                    duration: 2
                })
            },
            destroy: function() {
                this.viewer.entities.removeAll(),
                this.viewer.imageryLayers.removeAll(!0),
                this.viewer.destroy()
            }
        }
          , Ze = {
            mounted: function() {
                Xe.init("cesium-container")
            },
            beforeDestroy: function() {
                Xe.destroy()
            },
            methods: {}
        }
          , et = {
            render: function() {
                this.$createElement;
                this._self._c;
                return this._m(0)
            },
            staticRenderFns: [function() {
                var e = this.$createElement
                  , t = this._self._c || e;
                return t("div", {
                    staticClass: "app-wrapp"
                }, [t("div", {
                    staticClass: "cesium-container",
                    attrs: {
                        id: "cesium-container"
                    }
                })])
            }
            ]
        }
          , tt = i("VU/8")(Ze, et, !1, null, null, null);
        t.default = tt.exports
    },
    "R/UJ": function(e, t) {},
    mgaH: function(e, t) {}
});
