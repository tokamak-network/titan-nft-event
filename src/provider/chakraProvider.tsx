"use client";

import { theme } from "../theme/chakraTheme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export function ChakraProvidersForNextJs({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider>
      <ChakraProvider resetCSS theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
