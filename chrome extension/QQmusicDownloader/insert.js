/* eslint-disable */
/**
 * Tips = t("js/common/music/tips.js") 想改的 show hide 方法在人家作用域里面包着，所以外面不能改掉，所以直接拿过来整个文件替换修改
 */
define("js/common/dialog.js", function(t, i, o) {
  var n = t("js/common/music.js"),
    s = n.$;
  t("js/common/music/lib/base.js"), (s = n.$);
  (doc = document), (Tips = t("js/common/music/tips.js"));
  var e = Tips.extend({
      attrs: {
        id: Tips.guid("divdialog_"),
        _dialog_tpl: function(t) {
          var i,
            o = "";
          Array.prototype.join;
          return (
            (o += ""),
            "iframe" != t.mode
              ? (o +=
                  '\r\n\t<div class="popup__hd">\r\n\t\t<h2 class="popup__tit">' +
                  (null == (i = t.title) ? "" : i) +
                  '</h2>\r\n\t\t<a href="javascript:;" class="popup__close" title="关闭"><i class="popup__icon_close"></i><i class="icon_txt">关闭</i></a>\r\n\t</div>\r\n')
              : (o +=
                  '\r\n\t<div class="popup__hd">\r\n\t\t<h2 class="popup__tit">' +
                  (null == (i = t.title) ? "" : i) +
                  '</h2>\r\n\t</div>\r\n\t<a href="javascript:;" class="popup__close" title="关闭"><i class="popup__icon_close"></i><i class="icon_txt">关闭</i></a>\r\n'),
            (o +=
              '\r\n\t<div class="popup__bd ' +
              (null == (i = t.popup__bd_class) ? "" : i) +
              '" id="dialogbox">\r\n\t\t' +
              (null == (i = t.content) ? "" : i) +
              "\r\n\t</div>\r\n"),
            "iframe" != t.mode &&
              "bigpage" != t.mode &&
              (o +=
                '\r\n\t<div class="popup__ft">\r\n\t\t' +
                (null == (i = t.outtips) ? "" : i) +
                "\r\n\t</div>\r\n"),
            (o += "")
          );
        },
        _content_tpl: function(t) {
          var i,
            o = "";
          Array.prototype.join;
          return (o +=
            '\t<div class="popup__bd_inner">\r\n\t\t<div class="popup__icon_tips ' +
            (null == (i = t.class_icon) ? "" : i) +
            '"></div>\r\n\t\t<h3 class="popup__subtit ' +
            (null == (i = t.class_single) ? "" : i) +
            '">' +
            (null == (i = t.sub_title) ? "" : i) +
            '</h3>\r\n\t\t<p class="popup__desc">' +
            (null == (i = t.desc) ? "" : i) +
            "</p>\r\n\t</div>");
        },
        tpl_outtips: function(t) {
          var i,
            o = "";
          Array.prototype.join;
          return (o +=
            '\t<button style="display:' +
            (null == (i = t.button_display1) ? "" : i) +
            ';" class="' +
            (null == (i = t.button_class1) ? "" : i) +
            ' upload_btns__item js-button1">' +
            (null == (i = t.button_title1) ? "" : i) +
            '</button>\r\n\t<button style="display:' +
            (null == (i = t.button_display2) ? "" : i) +
            ';" class="' +
            (null == (i = t.button_class2) ? "" : i) +
            ' upload_btns__item js-button2">' +
            (null == (i = t.button_title2) ? "" : i) +
            "</button>");
        },
        _timerScroll: null,
        _timerTips: null,
        objArg: null
      },
      initialize: function(t) {
        e.superclass.initialize.call(this, t),
          Tips.getElementInBody(this.get("id"));
      },
      /**
       * 从这里开始
       */
      show: function(cb) {
        //   debug 康康整个cb是什么
        const t = {
          ...cb,
          sub_title: "Test ",
          desc:
            "<a target='_blank' href=" +
            document.querySelector("#h5audio_media").getAttribute("src") +
            ">直接下载</a>"
        };
        s("body").css({
          overflowY: "hidden"
        });
        var i = this,
          o = "mod_popup" + (t.dialogclass ? " " + t.dialogclass : "");
        Tips.getElementInBody(this.get("id"), {
          class: o,
          "data-aria": "popup"
        });
        var n = {
          mode: "common",
          title: "",
          icon_type: 0,
          sub_title: "",
          desc: "",
          width: 520,
          button_info1: null,
          button_info2: null,
          url: "",
          objArg: null,
          timeout: null
        };
        s(".mod_popup_mask").length <= 0
          ? s("body").append('<div class="mod_popup_mask"></div>')
          : s(".mod_popup_mask").show(),
          s.extend(n, t || {});
        var e = Tips.getElementInBody(i.get("id"));
        e.html(""),
          e.css({
            position: "fixed",
            zIndex: "100000",
            top: "-1000px",
            margin: "10px"
          });
        var l = {},
          c = "";
        if ("iframe" == n.mode)
          (c = n.url
            ? '<iframe id="frame_tips" frameborder="0" width="100%" ' +
              (-1 != n.url.indexOf("aisee.qq.com")
                ? 'height="420px;" scrolling="auto"'
                : 'height="' +
                  (n.height ? n.height : "380px") +
                  ';" scrolling="no"') +
              ' src="about:blank;"></iframe>'
            : ""),
            i.set("objArg", n.objArg);
        else if ("bigpage" == n.mode) c = n.desc;
        else {
          n.icon_type >= 0 &&
            n.icon_type <= 2 &&
            (l.class_icon = i.get("class_icon_list")[n.icon_type]),
            (l.sub_title = n.sub_title || ""),
            (l.desc = n.desc || ""),
            (l.class_single = ""),
            "" == l.desc && (l.class_single = " popup__subtit--single");
          for (var p = 1, u = ""; p < 3; p++)
            n[(u = "button_info" + p)]
              ? ((l["button_class" + p] = n[u].highlight
                  ? "mod_btn_green"
                  : "mod_btn"),
                (l["button_onclick" + p] = n[u].fn || ""),
                (l["button_title" + p] = n[u].title || ""))
              : (l["button_display" + p] = "none");
          (c = n.content || i.get("_content_tpl")(l)),
            (l.close_func = n.close_func || "");
        }
        e.html(
          i.get("_dialog_tpl")({
            title: n.title,
            content: c,
            popup__bd_class: n.popup__bd_class || "",
            dialogclass: n.dialogclass,
            mode: n.mode,
            outtips: i.get("tpl_outtips")(l)
          })
        ),
          e.off(),
          e.on("click", "a.popup__close ", function(t) {
            var o = l.close_func;
            s.isFunction(o) && o.call(this, t), i.hide();
          }),
          e.on("click", ".js-button1", function(t) {
            var i = l.button_onclick1;
            s.isFunction(i) && i.call(this, t);
          }),
          e.on("click", ".js-button2", function(t) {
            var i = l.button_onclick2;
            s.isFunction(i) && i.call(this, t);
          }),
          "iframe" == n.mode
            ? n.url
              ? ((doc.getElementById("frame_tips").src = n.url),
                setTimeout(function() {
                  var t = doc.getElementById("frame_tips");
                  t.contentWindow
                    ? t.contentWindow.focus()
                    : t.contentDocument &&
                      t.contentDocument.documentElement &&
                      t.contentDocument.documentElement.focus();
                }, 0))
              : e.css({
                  width: n.width && n.width > 0 ? n.width : 420,
                  height: n.height && n.height > 0 ? n.height : "auto"
                })
            : ((n.dialogclass && !t.width) ||
                e.css({
                  width: n.width && n.width > 0 ? n.width : 420
                }),
              e.css({
                height: n.height && n.height > 0 ? n.height : "auto"
              }),
              e.show(),
              Tips.fix_elem(e)),
          n.timeout && (_timerTips = setTimeout(s.proxy(i.hide, i), n.timeout));
      },
      hide: function() {
        s("body").css({
          overflowY: "scroll"
        }),
          s(".mod_popup_mask").hide(),
          s("#frame_tips")
            .blur()
            .remove(),
          s("#" + this.get("id"))
            .off()
            .remove();
        var t = this.get("_timerScroll"),
          i = this.get("_timerTips");
        null != t && (clearTimeout(t), this.set("_timerScroll", null)),
          null != i && (clearTimeout(i), this.set("_timerTips", null));
      },
      onReady: function(t, i) {
        var o = s("#" + this.get("id")),
          n = s("#frame_tips");
        o.length < 1 ||
          (t > 0 &&
            (n.length > 0 &&
              n.css({
                width: t + "px",
                height: i + "px"
              }),
            o.css({
              visibility: "visible",
              width: t + 2 + "px"
            }),
            s("#dialogbox").css({
              height: i + "px"
            })),
          Tips.fix_elem(o));
      },
      getID: function() {
        return this.get("id");
      },
      getArg: function() {
        return this.get("objArg");
      }
    }),
    l = new e();
  return (
    (window.dialog = l),
    {
      Dialog: e,
      dialog: l,
      show: s.proxy(l.show, l),
      hide: s.proxy(l.hide, l),
      onReady: s.proxy(l.onReady, l),
      id: s.proxy(l.getID, l)
    }
  );
});
