import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      100: "#ffe4cf",
      200: "#ffc897",
      300: "#ffab60",
      400: "#ff8a3d",
      500: "#e8782d",
    },
    accent: {
      200: "#6cefe2",
      300: "#3be6d6",
      400: "#23d7c6",
    },
    bg: {
      900: "#0b1118",
      850: "#0f1822",
      800: "#13202d",
    },
    surface: {
      950: "#0f1721",
      900: "#13202d",
      850: "#182736",
      800: "#1c2e40",
      700: "#24374a",
      650: "#2a3f54",
      600: "#30475f",
      550: "#38516a",
    },
    fg: {
      DEFAULT: "#e8eff9",
      soft: "#f7fbff",
      muted: "#9aa8bd",
      dim: "#76839a",
    },
    danger: {
      300: "#ff6d8d",
      200: "#ffd6e0",
    },
  },
  shadows: {
    card: "0 28px 60px rgba(4, 11, 18, 0.52), 0 4px 14px rgba(4, 11, 18, 0.36)",
    soft: "0 16px 34px rgba(4, 11, 18, 0.4), 0 2px 8px rgba(4, 11, 18, 0.3)",
    float: "0 24px 48px rgba(4, 11, 18, 0.45)",
  },
  components: {
    Button: {
      baseStyle: {
        borderWidth: 0,
        boxShadow: "none",
        transition:
          "transform 160ms cubic-bezier(0.22,1,0.36,1), filter 160ms cubic-bezier(0.22,1,0.36,1), background-color 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease",
        willChange: "transform",
        _hover: {
          boxShadow: "none",
          transform: "translateY(-1px)",
          filter: "brightness(1.03)",
        },
        _active: {
          boxShadow: "none",
          transform: "translateY(0) scale(0.98)",
          filter: "brightness(0.98)",
        },
        _disabled: {
          transform: "none",
          filter: "none",
          transition: "none",
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderWidth: "1px",
            borderColor: "rgba(255,255,255,0.14)",
            bg: "rgba(19,32,45,0.65)",
            borderRadius: "12px",
            boxShadow: "none",
            _hover: { borderColor: "rgba(255,138,61,0.62)", bg: "rgba(22,37,52,0.88)" },
            _focusVisible: {
              borderColor: "rgba(35,215,198,0.82)",
              boxShadow: "0 0 0 1px rgba(35,215,198,0.42)",
              bg: "rgba(22,37,52,0.92)",
            },
          },
        },
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            borderWidth: "1px",
            borderColor: "rgba(255,255,255,0.14)",
            bg: "rgba(19,32,45,0.65)",
            borderRadius: "12px",
            boxShadow: "none",
            _hover: { borderColor: "rgba(255,138,61,0.62)", bg: "rgba(22,37,52,0.88)" },
            _focusVisible: {
              borderColor: "rgba(35,215,198,0.82)",
              boxShadow: "0 0 0 1px rgba(35,215,198,0.42)",
              bg: "rgba(22,37,52,0.92)",
            },
          },
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
          borderWidth: "1px",
          borderColor: "rgba(255,255,255,0.14)",
          bg: "rgba(19,32,45,0.65)",
          borderRadius: "12px",
          boxShadow: "none",
          _hover: { borderColor: "rgba(255,138,61,0.62)", bg: "rgba(22,37,52,0.88)" },
          _focusVisible: {
            borderColor: "rgba(35,215,198,0.82)",
            boxShadow: "0 0 0 1px rgba(35,215,198,0.42)",
            bg: "rgba(22,37,52,0.92)",
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          borderWidth: 0,
          boxShadow: "0 30px 70px rgba(6, 9, 24, 0.52), 0 6px 18px rgba(6, 9, 24, 0.38)",
        },
      },
    },
    Drawer: {
      baseStyle: {
        dialog: {
          borderWidth: "1px",
          borderColor: "rgba(255,255,255,0.06)",
          bg: "#13202d",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        },
      },
    },
  },
  styles: {
    global: {
      "html, body, #root": {
        margin: 0,
        minHeight: "100%",
        backgroundColor: "bg.900",
      },
      body: {
        fontFamily: "'Manrope', 'Segoe UI', system-ui, -apple-system, sans-serif",
        lineHeight: 1.5,
        color: "fg.DEFAULT",
        backgroundColor: "bg.900",
        backgroundImage:
          "radial-gradient(1200px 560px at 8% -10%, rgba(255,138,61,0.16), transparent 60%), radial-gradient(900px 520px at 94% -6%, rgba(35,215,198,0.12), transparent 62%)",
      },
      "*, *::before, *::after": {
        boxSizing: "border-box",
      },
      "*::-webkit-scrollbar": {
        width: "8px",
        height: "8px",
      },
      "*::-webkit-scrollbar-track": {
        background: "#0f1822",
      },
      "*::-webkit-scrollbar-thumb": {
        borderRadius: "999px",
        background: "rgba(255,138,61,0.78)",
      },
      "*::-webkit-scrollbar-thumb:hover": {
        background: "rgba(35,215,198,0.86)",
      },
    },
  },
});

export default theme;

