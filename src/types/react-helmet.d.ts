/** Type shims for untyped dependencies. */
declare module "react-helmet" {
  import { Component } from "react";
  import type { ReactNode } from "react";
  export interface HelmetProps {
    title?: string;
    meta?: Array<{ name?: string; property?: string; content?: string }>;
    link?: Array<{ rel?: string; href?: string; [key: string]: string | undefined }>;
    script?: Array<{ [key: string]: string | undefined }>;
    htmlAttributes?: Record<string, string>;
    children?: ReactNode;
  }
  export class Helmet extends Component<HelmetProps> {}
  export default Helmet;
}
