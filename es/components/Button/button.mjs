import { jsx as a } from "react/jsx-runtime";
import { useState as l } from "react";
import { Button as c } from "antd";
const d = ({
  ...t
}) => {
  const [n, i] = l(!1);
  return /* @__PURE__ */ a(
    c,
    {
      loading: n,
      disabled: n,
      ...t,
      onClick: async (...o) => {
        const e = (t == null ? void 0 : t.onClick) && t.onClick(...o);
        if (e instanceof Promise)
          try {
            i(!0), await e;
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
