import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{r as v}from"./index-D4lIrffr.js";import{B as f}from"./button-B4CP0iXM.js";import{w as B,u as k,e as u}from"./index-CIfn4WAl.js";import{a as h}from"./index-B-lxVbXh.js";import"./index-ChdQiFc1.js";import"./index-DsJinFGm.js";import"./v4-CtRu48qb.js";const x="_button_t9yfv_1",C={button:x},r=({...n})=>{const[t,e]=v.useState(!1);return o.jsx(f,{className:C.button,loading:t,disabled:t,...n,onClick:async(...i)=>{const c=(n==null?void 0:n.onClick)&&n.onClick(...i);if(c instanceof Promise)try{e(!0),await c}finally{e(!1)}},children:n.children})};r.__docgenInfo={description:"为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。\r\n\r\n```javascript\r\nimport { Button } from 'sykj-ui'\r\n```",methods:[],displayName:"Button",props:{onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(args?: unknown) => Promise<unknown>",signature:{arguments:[{type:{name:"unknown"},name:"args"}],return:{name:"Promise",elements:[{name:"unknown"}],raw:"Promise<unknown>"}}},description:""}},composes:["ButtonProps"]};const L={title:"Button",component:r},s={args:{size:"large",children:"AutoLoadingButton",onClick:n=>new Promise(t=>{setTimeout(()=>{t(2),h("clicked",{clearOnStoryChange:!0})(n)},2e3)})},play:async n=>{const{canvasElement:t}=n,e=B(t);await k.click(e.getByRole("button")),await u(e.getByRole("button")).toHaveClass("ant-btn-loading"),await new Promise(i=>{setTimeout(async()=>{i(!0)},2200)}),await u(e.getByRole("button")).not.toHaveClass("ant-btn-loading")}},a=()=>o.jsxs(o.Fragment,{children:[o.jsx(r,{children:"默认按钮"}),o.jsx(r,{type:"primary",children:"primary按钮"})]});a.__docgenInfo={description:'<a href="https://ant.design/components/button-cn" target="_blank">ant-button</a>',methods:[],displayName:"antd按钮"};var l,m,d;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    size: 'large',
    children: 'AutoLoadingButton',
    onClick: eve => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(2);
          action('clicked', {
            clearOnStoryChange: true
          })(eve);
        }, 2000);
      });
    }
  },
  play: async props => {
    const {
      canvasElement
    } = props;
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(canvas.getByRole('button')).toHaveClass('ant-btn-loading');
    await new Promise(resolve => {
      setTimeout(async () => {
        resolve(true);
      }, 2200);
    });
    await expect(canvas.getByRole('button')).not.toHaveClass('ant-btn-loading');
  }
}`,...(d=(m=s.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var p,g,y,w,b;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`() => <>\r
  <Button>默认按钮</Button>\r
  <Button type='primary'>primary按钮</Button>\r
</>`,...(y=(g=a.parameters)==null?void 0:g.docs)==null?void 0:y.source},description:{story:'<a href="https://ant.design/components/button-cn" target="_blank">ant-button</a>',...(b=(w=a.parameters)==null?void 0:w.docs)==null?void 0:b.description}}};const N=["包装按钮","antd按钮"];export{N as __namedExportsOrder,a as antd按钮,L as default,s as 包装按钮};
