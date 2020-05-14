export enum Display {
    Block,
    InlineBlock,
    Flex,
    Inline
}

export const DISPLAY_MAP = new Map([
    [Display.Block, "block"],
    [Display.InlineBlock, "inline-block"],
    [Display.Flex, "flex"],
    [Display.Inline, "inline"]
])