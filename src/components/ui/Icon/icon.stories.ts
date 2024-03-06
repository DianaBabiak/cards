import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "./icon";

const meta = {
  argTypes: {},
  component: Icon,
  tags: ["autodocs"],
  title: "Components/Icon",
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    height: "24px",
    iconId: "buttonIcon",
    width: "24px",
  },
};
