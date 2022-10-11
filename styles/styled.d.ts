import "styled-components";
import { TLATheme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends TLATheme {}
}
