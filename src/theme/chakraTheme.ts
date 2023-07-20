import { extendTheme } from "@chakra-ui/theme-utils";
import "@fontsource/titillium-web";

const fonts = {
  TitilliumWeb: "Titillium Web",
};

const theme = extendTheme({
  fonts: {
    body: fonts.TitilliumWeb,
  },
  components: {
    Slider: {
      baseStyle: {
        thumb: {
          bg: "#007AFF",
          transition: "none",
          _active: {
            outline: "none",
            border: "none",
          },
          _focused: {
            outline: "none",
            border: "none",
          },
        },
      },
    },
  },

  styles: {
    global: () => ({
      // Reset all styles
      "*": {
        // all: "unset",
        // animation: "none",
        // transition: "none",
        // transform: "none",
        outline: "none",
        boxshadow: "none",
      },

      "html, body": {
        backgroundColor: "#0F0F12",
        color: "#FFFFFF",
      },
    }),
    // Additional overrides for specific components can be added here
    // For example, to reset the button styles
    Button: {
      baseStyle: {
        // Reset button styles
        borderRadius: "none",
        boxShadow: "none",
        fontWeight: "normal",
        _hover: { backgroundColor: "none" },
        _active: {},
      },
    },
    Input: {
      baseStyle: {
        // Reset button styles
        borderRadius: "none",
        boxShadow: "none",
        fontWeight: "normal",
        _hover: { backgroundColor: "none" },
        _active: {},
      },
    },
  },
});

export { theme };
