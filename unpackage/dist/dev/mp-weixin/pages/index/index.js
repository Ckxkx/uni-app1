"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      news: []
    };
  },
  onLoad: function() {
    common_vendor.index.showLoading({
      title: "加载中。。。。"
    });
    common_vendor.index.request({
      url: "https://unidemo.dcloud.net.cn/api/news",
      method: "GET",
      data: {},
      success: (res) => {
        common_vendor.index.__f__("log", "at pages/index/index.vue:34", res);
        this.news = (res.data || []).map((item) => ({ ...item, cover: "" }));
        this.loadCovers();
        common_vendor.index.hideLoading();
      },
      fail: () => {
      },
      complete: () => {
      }
    });
  },
  methods: {
    openinfo(e) {
      var newsid = e.currentTarget.dataset.newsid;
      common_vendor.index.navigateTo({
        url: "/pages/info/info?newsid=" + newsid
      });
    },
    // 拉取详情并提取首图作为封面
    loadCovers() {
      this.news.forEach((item, idx) => {
        common_vendor.index.request({
          url: "https://unidemo.dcloud.net.cn/api/news/36kr/" + item.post_id,
          method: "GET",
          data: {},
          success: (res) => {
            const html = res.data && res.data.content ? res.data.content : "";
            const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
            if (match && match[1]) {
              this.news[idx].cover = match[1];
            }
          },
          fail: () => {
          }
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.news, (item, index, i0) => {
      return {
        a: item.cover || item.author_avatar || "/static/logo.png",
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.created_at),
        d: index,
        e: common_vendor.o((...args) => $options.openinfo && $options.openinfo(...args), index),
        f: item.post_id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
