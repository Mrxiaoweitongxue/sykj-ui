import { jsx as a } from "react/jsx-runtime";
import { useState as l } from "react";
import { Button as c } from "antd";
import f from "./index.module.scss.js";
const d = ({
  ...t
}) => {
  const [n, i] = l(!1);
  return /* @__PURE__ */ a(
    c,
    {
      className: f.button,
      loading: n,
      disabled: n,
      ...t,
      onClick: async (...e) => {
        const o = (t == null ? void 0 : t.onClick) && t.onClick(...e);
        if (o instanceof Promise)
          try {
            i(!0), await o;
          } finally {
            i(!1);
          }
      },
      children: t.children
    }
  );
};
export {
  d as Button
};
