webpackJsonp([31], {
    qq83: function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = {
            data: function() {
                return {
                    codeShow: !1,
                    firstShowCode: !0
                }
            },
            methods: {
                codeShowChange: function(t) {
                    var e = this;
                    this.codeShow = t,
                    this.firstShowCode && (this.firstShowCode = !1,
                    this.$nextTick(function(t) {
                        e.$refs.mEditor.initEditor(e.code)
                    }))
                },
                initEditor: function(t) {
                    this.$refs.mEditor.initEditor(t),
                    this.runCode(t)
                },
                runCode: function(t) {
                    this.iframe && this.iframe.remove(),
                    this.iframe = mEdit.createIframe(),
                    this.$refs.viewContainer.appendChild(this.iframe);
                    var e = this.iframe.contentWindow.document;
                    e.open(),
                    t = mEdit.decryptPath(t),
                    e.write(t),
                    e.close()
                }
            }
        }
          , n = {
            render: function() {
                var t = this.$createElement
                  , e = this._self._c || t;
                return e("div", {
                    staticClass: "app-edit-wrapp"
                }, [e("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: this.codeShow,
                        expression: "codeShow"
                    }],
                    staticClass: "edit-container"
                }, [e("MonacoEditor", {
                    ref: "mEditor",
                    on: {
                        run: this.runCode
                    }
                })], 1), this._v(" "), e("div", {
                    ref: "viewContainer",
                    staticClass: "view-container",
                    class: {
                        "view-container-full": !this.codeShow
                    }
                }, [e("SourceEditOnOff", {
                    attrs: {
                        codeShow: this.codeShow
                    },
                    on: {
                        codeShowChange: this.codeShowChange
                    }
                })], 1)])
            },
            staticRenderFns: []
        }
          , r = i("VU/8")(o, n, !1, null, null, null).exports;
        e.default = {
            mixins: [r],
            data: function() {
                return {
                    code: ""
                }
            },
            created: function() {
                for (var t = this, e = this.$route.query.path; -1 != e.indexOf("-"); )
                    e = e.replace("-", "/");
                var i = "/static/examples/" + e + ".html"
                  , o = this.$route.query.title || "cesium";
                document.title = o + "|基础实例|xt3d",
                fetch(i).then(function(t) {
                    return t.text()
                }).then(function(e) {
                    var i = mEdit.encryptionPath(e);
                    t.initEditor(i),
                    t.code = i
                })
            }
        }
    }
});
