import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import babelParser from "@babel/eslint-parser";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        ignores: ["node_modules/**", "public/**"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                ecmaFeatures: {
                    experimentalObjectRestSpread: true,
                    impliedStrict: true,
                    classes: true,
                    jsx: true
                },
                babelOptions: {
                    parserOpts: {
                        plugins: ["jsx"]
                    }
                }
            },
            globals: {
                ...globals.browser,
                cy: "readonly"
            }
        },
        settings: {
            react: {
                version: "detect"
            },
            "import/resolver": {
                node: {
                    paths: ["src"]
                }
            }
        },
        plugins: {
            react: pluginReact,
            "react-hooks": pluginReactHooks,
            "jsx-a11y": pluginJsxA11y
        },
        rules: {
            // Adopting Airbnb "error" level for more stringent code quality
            "no-console": "error",
            "no-debugger": "error",
            "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: true }],
            "no-undef": "error",
            "no-empty": "error",
            eqeqeq: ["error", "always"],
            "no-eval": "error",
            "no-implied-eval": "error",
            "no-prototype-builtins": "error",
            "no-redeclare": "error",
            "no-return-assign": ["error", "except-parens"],
            "no-self-assign": "error",
            "no-self-compare": "error",
            "no-unused-expressions": "error",
            "no-useless-call": "error",
            "no-useless-catch": "error",
            "no-useless-concat": "error",
            "no-useless-return": "error",
            "no-shadow": ["error", { allow: ["classes"] }],
            camelcase: "error",

            // React specific rules from Airbnb
            "react/jsx-uses-react": "error",
            "react/jsx-uses-vars": "error",
            "react/no-children-prop": "error",
            "react/no-danger": "error",
            "react/no-deprecated": "error",
            "react/no-did-mount-set-state": "error",
            "react/no-did-update-set-state": "error",
            "react/no-direct-mutation-state": "error",
            "react/no-find-dom-node": "error",
            "react/no-is-mounted": "error",
            "react/no-multi-comp": ["error", { ignoreStateless: true }],
            "react/no-redundant-should-component-update": "error",
            "react/no-render-return-value": "error",
            "react/no-set-state": "off",
            "react/no-string-refs": "error",
            "react/no-this-in-sfc": "error",
            "react/no-unknown-property": ["error", { ignore: ["css"] }],
            "react/no-unsafe": "error",
            "react/no-unused-state": "error",
            "react/no-will-update-set-state": "error",
            "react/prefer-es6-class": "error",
            "react/prefer-stateless-function": "error",
            "react/prop-types": "error",
            "react/react-in-jsx-scope": "off",
            "react/require-render-return": "error",
            "react/self-closing-comp": "error",
            "react/sort-comp": "error",
            "react/state-in-constructor": "error",
            "react/static-property-placement": "error",
            "react/style-prop-object": "error",
            "react/void-dom-elements-no-children": "error",
            "react/jsx-curly-brace-presence": ["error", { "props": "never", "children": "ignore" }],

            // JSX a11y rules from Airbnb
            "jsx-a11y/accessible-emoji": "off",
            "jsx-a11y/alt-text": "error",
            "jsx-a11y/anchor-has-content": "error",
            "jsx-a11y/anchor-is-valid": ["error", { aspects: ["invalidHref"] }],
            "jsx-a11y/aria-activedescendant-has-tabindex": "error",
            "jsx-a11y/aria-props": "error",
            "jsx-a11y/aria-proptypes": "error",
            "jsx-a11y/aria-role": "error",
            "jsx-a11y/aria-unsupported-elements": "error",
            "jsx-a11y/click-events-have-key-events": "error",
            "jsx-a11y/heading-has-content": "error",
            "jsx-a11y/html-has-lang": "error",
            "jsx-a11y/iframe-has-title": "error",
            "jsx-a11y/img-redundant-alt": "error",
            "jsx-a11y/interactive-supports-focus": "error",
            "jsx-a11y/label-has-associated-control": ["error", {
                required: {
                    some: ["nesting", "id"]
                }
            }],
            "jsx-a11y/lang": "error",
            "jsx-a11y/media-has-caption": "error",
            "jsx-a11y/mouse-events-have-key-events": "error",
            "jsx-a11y/no-access-key": "error",
            "jsx-a11y/no-autofocus": "error",
            "jsx-a11y/no-distracting-elements": "error",
            "jsx-a11y/no-interactive-element-to-noninteractive-role": "error",
            "jsx-a11y/no-noninteractive-element-interactions": "error",
            "jsx-a11y/no-noninteractive-element-to-interactive-role": "error",
            "jsx-a11y/no-noninteractive-tabindex": "error",
            "jsx-a11y/no-onchange": "error",
            "jsx-a11y/no-redundant-roles": "error",
            "jsx-a11y/no-static-element-interactions": "off",
            "jsx-a11y/role-has-required-aria-props": "error",
            "jsx-a11y/role-supports-aria-props": "error",
            "jsx-a11y/scope": "error",
            "jsx-a11y/tabindex-no-positive": "error",

            // Additional rules
            "arrow-body-style": ["error", "as-needed"],
            "func-names": "off",
            "linebreak-style": "off",
            "no-underscore-dangle": "off",
            "no-use-before-define": "error",
            "react/destructuring-assignment": "off",
            "react/display-name": "error",
            "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
            "react/jsx-props-no-spreading": "off",
            "react/no-array-index-key": "error"
        }
    },
    pluginJs.configs.recommended,
    eslintConfigPrettier
];
