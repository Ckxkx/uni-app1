"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "",
      strings: ""
    };
  },
  // 修复：生命周期函数名错误（onload → onLoad，首字母大写）
  onLoad: function(e) {
    common_vendor.index.__f__("log", "at pages/info/info.vue:21", "接收的参数：", e);
    common_vendor.index.request({
      url: "https://unidemo.dcloud.net.cn/api/news/36kr/" + e.newsid,
      method: "GET",
      data: {},
      success: (res) => {
        common_vendor.index.__f__("log", "at pages/info/info.vue:27", "接口返回数据：", res);
        this.title = res.data.title;
        this.strings = res.data.content;
      },
      fail: (err) => {
        common_vendor.index.__f__("error", "at pages/info/info.vue:34", "请求失败：", err);
        common_vendor.index.showToast({ title: "加载失败", icon: "none" });
      },
      complete: () => {
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.title),
    b: $data.strings
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/info/info.js.map
