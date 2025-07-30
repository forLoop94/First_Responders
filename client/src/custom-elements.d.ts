import React from "react";

declare module "react" {
  interface SVGAttributes<T> {
    slot?: string;
  }
}
