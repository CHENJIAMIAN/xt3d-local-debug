webpackJsonp([12], {
    Y3zW: function(t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = {
            render: function() {
                var t = this.$createElement
                  , e = this._self._c || t;
                return e("div", {
                    staticClass: "app-wrapp"
                }, [e("div", {
                    staticClass: "tip-item"
                }, [this._v("功能完善中")]), this._v(" "), e("video", {
                    staticStyle: {
                        height: "100%",
                        width: "100%",
                        "object-fit": "cover"
                    },
                    attrs: {
                        muted: "muted",
                        autoplay: "autoplay",
                        loop: "loop"
                    },
                    domProps: {
                        muted: !0
                    }
                }, [e("source", {
                    attrs: {
                        type: "video/mp4",
                        src: "http://211.149.185.229:8081/data/tilesetflat.mp4"
                    }
                })])])
            },
            staticRenderFns: []
        };
        var i = a("VU/8")({}, s, !1, function(t) {
            a("tlJr")
        }, "data-v-5f9f77d4", null);
        e.default = i.exports
    },
    tlJr: function(t, e) {}
});
